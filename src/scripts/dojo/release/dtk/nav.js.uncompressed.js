require(['dojo/ready',
		'dojo/on',
		'dojo/dom-class',
		'dojo/query'
	], function (ready, on, domClass, query) {
		 ready(function(){

			var nav = document.querySelector('.nav'),
			subnav = document.querySelector('.subnav'),
			fixpoint = document.querySelector('.nav').offsetHeight,
			scrolled = false;

			function handleScroll() {
				var docScroll = document.body.scrollTop || document.documentElement.scrollTop;
				if (scrolled) {
					if (docScroll < fixpoint) {
						scrolled = false;
						domClass.toggle(nav, 'shrink');
						domClass.toggle(document.body, 'scrolled');
					}
				}
				else {
					if (docScroll >= fixpoint) {
						domClass.toggle(nav, 'shrink');
						domClass.toggle(document.body, 'scrolled');
						scrolled = true;
					}
				}
			}

			on(window, 'scroll', handleScroll);

			on(document.querySelector('.mobileMenuToggle'), 'click', function () {
				domClass.toggle(document.body, 'menuOpen');
			});

			handleScroll();


			//On home page, make doc leadin blocks clickable.
			if(document.querySelector('body.home')) {
				query('.iconBlock').forEach(function(node, index, nodeList){
					on(node, 'click', function(){
						window.location.href = node.dataset.href;
					});
				});
			}

		});
});
