<?php
$aResult=array();
$sUsername=(isset($_POST['username']))?preg_replace('/[^\w]/','',substr(trim($_POST['username']),0,30)):'-u-';
$sPassword=(isset($_POST['password']))?preg_replace('/[^\w]/','',substr(trim($_POST['password']),0,30)):'-p-';
if ($sUsername===strrev($sPassword))
{
	$sMessage='Success';
	header('Auth-Token: abc123');
} else {
	header('Auth-Token: INVALID');
	if (empty($sUsername)) {
		$sMessage='Empty or missing username';
	} else {
		if (empty($sPassword)) {
			$sMessage='Empty or missing password';
		} else {
			$sMessage='Invalid username and password';
		}
	}
}
header('HTTP/1.1 200 OK');
header('Content-Type: text/plain');
echo $sMessage;
