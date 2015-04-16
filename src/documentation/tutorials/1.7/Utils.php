<?php

class Utils {

	public static $cdn = "//ajax.googleapis.com/ajax/libs/dojo/1.7.8/";

	/* Use:

		Utils::printDojoScript() - No data-dojo-config attribute
		Utils::printDojoScript('') - Default data-dojo-config attribute
		Utils::printDojoScript('isDebug: true, async: true') - Use parameter for data-dojo-config attribute value

		An optional second parameter may be included to indicate the tab count for indenting.  Default value is 2.
	*/
	public static function printDojoScript($config=false,$tab_count=2) {
		$tabs = str_repeat("\t",$tab_count);
		$comment = '<!-- load dojo and provide config via data attribute -->';
		$script = '<script src="'.self::$cdn.'dojo/dojo.js"';
		if($config!==false) {
			if ($config==='') {
				$config = 'isDebug: 1, async: 1, parseOnLoad: 1';
			}
			$script .=' data-dojo-config="'.$config.'"';
		}
		$script .= '></script>';
		echo $comment.PHP_EOL.$tabs.$script.PHP_EOL;
	}

	public static function printDojoCss(){
	    echo '<link rel="stylesheet" href="'.self::$cdn.'dojo/dojo.css" media="screen">'."\n";
	}

	public static function printClaroGridCss(){
	    echo '<link rel="stylesheet" href="'.self::$cdn.'dojox/grid/resources/claroGrid.css" media="screen">'."\n";
	}

	public static function printClaroCss(){
	    echo '<link rel="stylesheet" href="'.self::$cdn.'dijit/themes/claro/claro.css" media="screen">'."\n";
	}

	/* Use:

		Pass an array of CDN based CSS filenames, and an optional tab count.

		Example:
			Utils::printLinkStyleTags(array('dojo/resources/dojo.css',
                        	'dijit/themes/claro/claro.css',
	                        'dojox/grid/resources/Grid.css',
        	                'dojox/grid/resources/claroGrid.css'))
	*/
	public static function printLinkStyleTags($css_array=array(),$tab_count=2)
	{
		$tabs = str_repeat("\t",$tab_count);
		foreach ($css_array as $css_file) {
			echo $tabs.'<link rel="stylesheet" href="'.self::$cdn.$css_file.'" />'.PHP_EOL;
		}
	}
}

?>
