require(['dojo/ready',
		'dojo/on',
		'dojo/dom-class',
		'dojo/query',
		'dojo/dom-style',
		'dojo/dom-attr'
	], function (ready, on, domClass, query, domStyle, domAttr) {
		 ready(function(){

		 	//Get each card row
			var rows = query('.row', query('.cardGrid')[0]);

			rows.forEach(function(row, index, nodelist){
				var cards = query('.card .content', row);
				if(cards[1]) {
					var newHeight;
					var card0Height = domStyle.get(cards[0], 'height');
					var card1Height = domStyle.get(cards[1], 'height');

					// Determine the tallest card and match the other to it.
					if(card0Height > card1Height) {
						cards[1].style.height =  card0Height + 'px';
					} else {
						cards[0].style.height =  card1Height + 'px';
					}
				}
			});

			var filterToggles = query('[data-toggle]');
			filterToggles.on('click', function(evt){
				var node = evt.target;
				var filterOn = domAttr.get(node, 'data-toggle');
				var cardList = query('.card');
				cardList.forEach(function(card){
					if(filterOn == 'all') {
						domClass.remove(card, 'hide');
					}
					else if(!domClass.contains(card, filterOn)) {
						domClass.add(card, 'hide');
					} else {
						domClass.remove(card, 'hide');
					}
				});


			});

			var categories = [
				'getting-started',
				'modules',
				'dom-basics',
				'fundamentals',
				'widgets',
				'working-with-data',
				'mobile'
			];

		});
});
