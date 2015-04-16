<?php include_once($_SERVER['DOCUMENT_ROOT'] . implode('/', array_slice(explode('/',dirname($_SERVER['PHP_SELF'])), 0, 4)) . '/Utils.php') ?>
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Demo: Object Store Demonstration</title>
		<link rel="stylesheet" href="../../../resources/style/demo.css" media="screen">
		
	</head>
	<body>
		<h1>Object Store Demonstration</h1>
		<?php Utils::printDojoScript("async: true") ?>
		</script>
		<script>
			require(["dojo/store/Memory"], function(Memory){
				var employees = [
					{name:"Jim", department:"accounting"},
					{name:"Bill", department:"engineering"},
					{name:"Mike", department:"sales"},
					{name:"John", department:"sales"}
				];

				employeeStore = new Memory({data:employees, idProperty: "name"});

				employeeStore.query({department:"sales"}).forEach(function(employee){
					// this is called for each employee in the sales department
					alert(employee.name);
				});
			});
		</script>
	</body>
</html>
