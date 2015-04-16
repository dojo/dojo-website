<?php
	// Build the results
	$result = array();

	// For every form field....
	foreach($_POST as $key => $value) {
        
		$result[] = $key.' is: '.(is_array($value) ? implode(', ', $value) : htmlentities($value));
	}

	// Echo out the result
	echo '<strong>The server received:</strong><br /><br />', implode('<br />', $result);
?>
