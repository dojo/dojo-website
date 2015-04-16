module.exports = function(grunt){

	var tutorialOrder = [
		{
			category:'Getting Started',
			tutorials: [
				'hello_dojo',
				'start',
				'dojo_config',
				'cdn',
			]
		},
		{
			category:'DOM Basics',
			tutorials: [
				'using_query',
				'nodelist_extensions',
				'dom_functions',
				'effects',
				'events',
				'key_events',
			]
		},
		{
			category:'Fundamentals',
			tutorials: [
				'ajax',
				'jsonp',
				'animation',
				'arrays',
				'augmenting_objects',
				'hitch',
				'build',
				'declaration',
				'declare',
				'deferreds',
				'promises',
				'hash',
				'using_behavior',
			]
		},
		{
			category:'Using Widgets',
			tutorials: [
				'beyond_dojo',
				'dijit_layout',
				'themes_buttons_textboxes',
				'checkboxes',
				'menus',
				'sliders',
				'dialogs_tooltips',
				'editor',
				'selects',
				'selects_using_stores',
				'loading_overlay',
				'form_manager',
				'validation',
				'recipes/loading_overlay',
				'uploader',
				'datagrid',
				'charting',
				'charting_advanced',
				'gfx',
			]
		},
		{
			category:'Creating Widgets',
			tutorials: [
				'understanding_widget',
				'recipes/custom_widget',
				'templated',
				'recipes/app_controller',
			]
		},
		{
			category:'Working with Data',
			tutorials: [
				'intro_dojo_store',
				'creating_stores',
				'data_modeling',
				'dojo_data',
				'dojo_date',
				'i18n',
				'populating_datagrid',
				'realtime_stores',
				'store_driven_grid',
				'store_driven_tree',
				'working_grid',
				'recipes/doh_testsuite',
			]
		},
		{
			category:'Mobile',
			tutorials: [
				'mobile/tweetview/getting_started',
				'mobile/tweetview/intro_tweetview',
				'mobile/tweetview/packaging',
				'mobile/tweetview/settings',
				'mobile/tweetview/starting_tweetview',
			]
		},
	];

	return tutorialOrder;
}