/**
 *	Banner dismisser
 *
 *  TODO: Hide for good, using localstorage or whatever.
 *  But… that would need a way to bring it back?
 *
 */

function dismissBanner() {

	var dismissTriggers = document.getElementsByClassName('js-banner-dismiss'),
        dismissPotentialTargets = document.getElementsByClassName('js-banner'),
		killClass = 'is-hidden';

	function dismissAction(e) {
        for (var i = 0; i < dismissPotentialTargets.length; i++) {
            dismissPotentialTargets[i].classList.add(killClass);
		}
    }

	// apply mechanic to all suitable triggers
	for (var i = 0; i < dismissTriggers.length; i++) {
		dismissTriggers[i].addEventListener('click', dismissAction, false);
	}

}

dismissBanner();
