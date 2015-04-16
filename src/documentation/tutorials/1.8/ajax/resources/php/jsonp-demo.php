<?php
header('HTTP/1.1 200 OK');
header('Content-Type: application/javascript; charset=utf-8');
if (!isset($_GET['callback'])){
	echo 'alert("Error");';
}else{
	$clientDate=preg_replace('/[^\ \-\,\:\w\.]/','',rawurldecode($_GET['clienttime']));
	$aResult=array('clientdate'=>$clientDate,'serverdate'=>date('r'),'file'=>basename(__FILE__),'version'=>1.0,'message'=>'Hello, World!');
	$callback = preg_replace('/[^\w\.]/','',$_GET['callback']);
	echo $callback.'('.json_encode($aResult).')';
}
