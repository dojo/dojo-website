<?php
	// This allows for us to "store" data temporarily to make it appear to be a persistent data store
	session_start();

	// Checks to see if our sessions variables are available and if not, sets them to their starting values
	if(!isset($_SESSION['books']) || !isset($_SESSION['maxId'])){
		$books = array(
			array('id' => 1, 'title' => 'A Brave New World', 'author' => 'Aldous Huxley', 'price' => 1.53),
			array('id' => 2, 'title' => 'Fahrenheit 451', 'author' => 'Ray Bradbury', 'price' => 2.17),
			array('id' => 3, 'title' => 'Neuromancer', 'author' => 'William Gibson', 'price' => 4.92),
			array('id' => 4, 'title' => 'A Scanner Darkley', 'author' => 'Philip K. Dick', 'price' => 3.33)
		);
		$maxId = 4;
		$_SESSION['books'] = $books;
		$_SESSION['maxId'] = $maxId;
	} else {
		// Otherwise it will set the local variables to the value of the session variables
		$books = $_SESSION['books'];
		$maxId = $_SESSION['maxId'];
	}

	// Gather some informatin about the request.
	$requestMethod = $_SERVER['REQUEST_METHOD'];
	$uri = explode('?',$_SERVER['REQUEST_URI']);
	// Generates an array for the requested path, to make it easier to branch based on the requested URI
	$requestPath = explode('/',preg_replace('/\/$/','',preg_replace('/^.*\/books\/?/','',$uri[0])));

	if ($requestMethod == 'GET') {  // If this is a GET request
		if ($requestPath[0]) { // likely requesting a specific book
			$found = false;
			foreach ($books as $book) { // search for the book based on the ID in the URI path
				if ($book['id'] == $requestPath[0]) {
					$found = $book;
				}
			}
			if ($found) { // If found, return the book as JSON
				header('HTTP/1.1 200 OK');
				header('Content-type: application/json');
				print json_encode($found);
			} else { // Ooops, we don't have that book
				header('HTTP/1.1 404 Not Found');
				header('Content-type: application/json');
				print json_encode(array("status" => 404));
			}
		} else { // The didn't want a specific book, they want all of them
			header('HTTP/1.1 200 OK');
			header('Content-type: application/json');
			print json_encode($books);
		}
	} elseif ($requestMethod == 'PUT' && $requestPath[0]) { // Trying to update a specific book
		$data = json_decode(file_get_contents('php://input'),true); // Take the posted data and convert into an
																	// associated array
		$data['id'] = $requestPath[0]; // get the book ID
		$found = -1;
		foreach ($books as $idx=>$book) {
			if ($book['id'] == $requestPath[0]) {
				$found = $idx;
			}
		}
		if ($found >= 0) { // If we found the book, update the record and return it to the client
			$books[$found] = $data;
			header('HTTP/1.1 200 OK');
			header('Content-type: application/json');
			print json_encode($books[$found]);
		} else { // Oooops, trying to update a book we don't have
			header('HTTP/1.1 404 Not Found');
			header('Content-type: application/json');
			print json_encode(array("status" => 404));
		}
	} elseif ($requestMethod == 'POST') { // Trying to add a book
		$data = json_decode(file_get_contents('php://input'),true); // Get the data about the book
		$data['id'] = ++$maxId; // Provide a unique ID for the book
		array_push($books, $data); // Add it to our collection
		header('HTTP/1.1 200 OK');
		header('Location: /books/' + $data['id']); // Provide a location of the book
		header('Content-type: application/json');
		print json_encode($data);  // Return the book, with the ID
	}

	// Store our session information
	$_SESSION['books'] = $books;
	$_SESSION['maxId'] = $maxId;
?>