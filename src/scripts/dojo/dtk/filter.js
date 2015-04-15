require(['dojo/ready',
		'dojo/on',
		'dojo/dom-class',
		'dojo/query',
		'dojo/dom-style',
		'dojo/dom-attr'
	], function (ready, on, domClass, query, domStyle, domAttr) {
		 ready(function(){

			function sizeCards() {

				if (window.matchMedia("(min-width: 40.063em)").matches) {

			 		//Get each card row
					var rows = query('.row', query('.cardGrid')[0]);

					rows.forEach(function(row, index, nodelist){
						var cards = query('.card .content', row);

						if(cards[1]) {
							cards[0].style.height = 'auto';
							cards[1].style.height = 'auto';

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
				}
			}

			sizeCards();

			on(window, "resize", function(){
				sizeCards();
			});

		});
});
