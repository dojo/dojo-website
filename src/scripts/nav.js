require([
		'dojo/ready',
		'dojo/on',
		'dojo/dom-class'
	], function (ready, on, domClass) {
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
						}
					}
					else {
						if (docScroll >= fixpoint) {
							domClass.toggle(nav, 'shrink');
							scrolled = true;
						}
					}
				}

				on(window, 'scroll', handleScroll);
				handleScroll();
			});
});