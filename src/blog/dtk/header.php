<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8)]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link rel="stylesheet" href="/css/blog.css">
	<?php include('inc/favicons.html'); ?>
	<script>
		dojoConfig = { async: true, deps: [ 'dtk/nav' ] }
	</script>
	<script type="text/javascript" src="/scripts/dojo/dojo/dojo.js"></script>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="page" class="dtkBlog hfeed site">
		<?php include('inc/header.html'); ?>
		<div class="subnav">
			<div class="row full search">
				<div class="medium-9 columns">

				</div>
				<div class="medium-3 columns">
					<?php echo get_search_form(); ?>
				</div>
			</div>
		</div>
	<div id="main" class="site-main">
