<?php
sleep(1);
if ($_GET['success']==='true') {
	header('HTTP/1.1 200 OK');
} else {
	header('HTTP/1.1 500 Error');
}
header('Content-Type: application/json; charset=utf-8');
$aResult=array('file'=>basename(__FILE__),'version'=>1.0,'message'=>'Hello, World!');
echo json_encode($aResult);
