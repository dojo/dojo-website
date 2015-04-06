require(['dojo/ready',
		'dojo/on',
		'dojo/dom-class',
		'dojo/query',
		"dojo/dom-style"
	], function (ready, on, domClass, query, domStyle) {
		 ready(function(){
			var rows = query('.row', query('.cardGrid')[0]);

			rows.forEach(function(row, index, nodelist){
				var cards = query('.card .description', row);
				if(cards[1]) {
					var newHeight;
					var card0Height = domStyle.get(cards[0], 'height');
					var card1Height = domStyle.get(cards[1], 'height');


					if(card0Height > card1Height) {
						cards[1].style.height =  card0Height + 'px';
					} else {
						cards[0].style.height =  card1Height + 'px';
					}

				}

			});
		});
});
