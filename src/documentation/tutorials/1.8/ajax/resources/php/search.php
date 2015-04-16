<?php
$aTopics=array('php'=>array('url'=>'http://php.net','name'=>'PHP: Hypertext Preprocessor','platform'=>'server'),
	'javascript'=>array('url'=>'https://developer.mozilla.org/en/JavaScript','name'=>'JavaScript','platform'=>'client and server'),
	'asp'=>array('url'=>'http://www.asp.net/','name'=>'ASP - Active Server Pages','platform'=>'server'),
	'java'=>array('url'=>'http://www.java.com/en/','name'=>'java','platform'=>'many'),
	'dojo'=>array('url'=>'http://dojotoolkit.org','name'=>'dojo toolkit','platform'=>'client and server'),
	'html5'=>array('url'=>'http://en.wikipedia.org/wiki/HTML5','name'=>'Hypertext Markup Language version 5','platform'=>'client'),
	'css'=>array('url'=>'http://www.w3.org/Style/CSS/Overview.en.html','name'=>'Cascading Style Sheets','platform'=>'client'));
header('Content-Type: application/json; charset=utf-8');
$search=preg_replace('/\W/','',strtolower(substr(trim(rawurldecode($_GET['q'])),0,25)));
if (empty($search) || (!isset($aTopics[$search])))
	header('HTTP/1.1 404 Not Found');
else
{
	header('Content-Type: application/json');
	echo json_encode($aTopics[$search]);
}
