module.exports = function(grunt){

	var tutorialOrder = [
		{
			category:'getting_started',
			tutorials: ['hello_dojo','start','modern_dojo','dojo_config']
		},
		{
			category:'modules',
			tutorials: ['modules','modules_advanced','cdn','node']
		},
		{
			category:'dom_basics',
			tutorials: ['using_query','nodelist_extensions','dom_functions','events','key_events','effects','animation']
		},
		{
			category: 'fundamentals',
			tutorials: ['arrays','ajax','jsonp','deferreds','promises','hitch','declarative','declare','augmenting_objects','hash','build','device_optimized_builds']
		},
		{
			category: 'working_with_data',
			tutorials: ['intro_dojo_store','data_modeling','datagrid','populating_datagrid','store_driven_grid','store_driven_tree','working_grid','realtime_stores','creating_stores','dojo_data','dojo_date','i18n']
		},
		/*{
			category: 'widgets',
			tutorials: [
				{	category: 'Creating Widgets',
					tutorials: ['templated','understanding_widgetbase','recipes/custom_widget']
				},
				{	category: 'Using Widgets',
					tutorials: ['beyond_dojo','themes_buttons_textboxes','dijit_layout','checkboxes','selects','selects_using_stores','sliders','menus','dialogs_tooltips','editor','loading_overlay','uploader','validation','form_manager']
				},
				{	category: 'Vector Graphics & Charting',
					tutorials: ['charting','charting_advanced','gfx']
				},
			]
		},

		{
			category: 'creating_apps',
			tutorials: ['app_controller']
		},

		{
			category: 'mobile',
			tutorials: ['mobile/flickrview/part1','mobile/flickrview/part2','mobile/flickrview/part3','mobile/flickrview/part4','mobile/flickrview/part5']
		},

		{
			category: 'dojox/app',
			tutorials: ['dojox_app/contactsList','dojox_app/contactsPhone','dojox_app/contactsTablet','dojox_app/contactsCordova']
		}
		*/
	];

	return tutorialOrder;
}