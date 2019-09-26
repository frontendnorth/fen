/**
 *	Popover navigation menus
 *
 */

function popoverMenus() {

	var popoverTriggers = document.getElementsByClassName('js-popover-trigger'),
		popoverPotentialTargets = document.getElementsByClassName('js-popover-target'),
		closeTriggers = document.getElementsByClassName('js-popover-close-trigger'),
		activeClass = 'is-open',
		bodyActiveClass = 'has-popover',
		allowScrollClass = 'js-popover-body-scroll';

	function popoverAction(e) {
		// stop link working
		e.preventDefault();

		// Does this element allow body scrolling one active?
		// Most likely it is not a full popover!
		if (this.classList.contains(allowScrollClass)) {
			var allowScroll = true;
		}

		// get trigger data, then elements
		var popoverTarget = this.dataset.trigger;

		var popoverTargetElems = document.querySelectorAll('[data-target="' + popoverTarget + '"]');

		// hide any candidates that are already open
		for (var i = 0; i < popoverPotentialTargets.length; i++) {
			if (popoverPotentialTargets[i].classList.contains(activeClass)) {
				popoverPotentialTargets[i].classList.remove(activeClass);
			}
		}

		// is this menu or not?
		if (!this.classList.contains(activeClass)) {
			var thisOpen = true;
		}

		// get relevant targets and apply active class
		for (var i = 0; i < popoverTargetElems.length; i++) {
			// toggle active class of targets
			if (thisOpen != true) {
				popoverTargetElems[i].classList.remove(activeClass);
				document.body.classList.remove(bodyActiveClass);
			} else {
				popoverTargetElems[i].classList.add(activeClass);
				// toggle class on body, to stop everything moving about
				// unless allowScroll is true
				if (!allowScroll) {
					document.body.classList.add(bodyActiveClass);
				}
			}

			// if scroll disabled, then enable if new trigger activated
			if (allowScroll) {
				document.body.classList.remove(bodyActiveClass);
			}
		}

		// toggle trigger class
		for (var i = 0; i < popoverTriggers.length; i++) {
			if (popoverTriggers[i].classList.contains(activeClass)) {
				popoverTriggers[i].classList.remove(activeClass);
			}
		}

		if (thisOpen == true) {
			this.classList.add(activeClass);
		} else {
			this.classList.remove(activeClass);
		}

	}

	// apply mechanic to all suitable triggers
	for (var i = 0; i < popoverTriggers.length; i++) {
		popoverTriggers[i].addEventListener('click', popoverAction, false);
	}

	// for close button(s)
	for (var i = 0; i < closeTriggers.length; i++) {
		closeTriggers[i].addEventListener('click', function() {
			// close everything
			for (var i = 0; i < popoverPotentialTargets.length; i++) {
				if (popoverPotentialTargets[i].classList.contains(activeClass)) {
					popoverPotentialTargets[i].classList.remove(activeClass);
				}
			}
			for (var i = 0; i < popoverTriggers.length; i++) {
				if (popoverTriggers[i].classList.contains(activeClass)) {
					popoverTriggers[i].classList.remove(activeClass);
				}
			}
			document.body.classList.remove(bodyActiveClass);
		}, false);
	}

}

popoverMenus();
