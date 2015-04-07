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
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="page" class="hfeed site">
		<div class="nav">
			<div class="row">
				<div class="small-3 columns">
					<a href="/" class="navLogo"><span>Dojo</span></a>
				</div>
				<div class="small-9 columns text-right">
					<div class="mobileMenuToggle" data-menu-toggle></div>
					<div class="menu">
						<div class="mobileHeader">Menu</div>
						<ul class="inline-list menuItems right">
							<li><a href="/download/">Get Dojo</a></li>
							<li><a href="/documentation/">Docs</a></li>
							<li><a href="/support/">Support</a></li>
							<li><a href="/community/roadmap/">Roadmap</a></li>
							<li><a href="/blog/">Blog</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
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
