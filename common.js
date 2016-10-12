(function() {

	class Tabs {

		constructor(config) {

			let doc = document;
			//get dom elements
			this._btns = doc.querySelectorAll(config.button);
			this._section = doc.querySelectorAll(config.section);

			//active class and names of attributes
			this._active = config.activeClass || 'is-active';
			this._tabAttr = config.sectionAttr || 'data-tab';
			this._btnAttr = config.buttonAttr || 'data-tab';

			//initial tab on load
			let initialCall = this._showInitial(window.location.hash);
			//active tab number
			this._activeNum = initialCall.num;
			this._showActive(this._activeNum, initialCall.name);

			window.addEventListener('popstate', function(e) {
				let state = window.history.state;
				if (state) {
					this._showActive(state.activeTab);
				} else if (!state && !window.location.hash) {
					//show first tab, if the hash-value is empty or wrong
					this._showActive(0);
				}
			}.bind(this), false);

			Array.prototype.forEach.call(this._btns, function(btn, i) {
				//current tab
				let currentName = btn.getAttribute(this._btnAttr);

				btn.addEventListener('click', function() {
					this._showActive(i, currentName);
				}.bind(this), false);

			}.bind(this));
		}

		_showActive(newIndex, tabName) {
			
			this._btns[this._activeNum].classList.remove(this._active);
			this._section[this._activeNum].classList.remove(this._active);
			this._btns[newIndex].classList.add(this._active);
			this._section[newIndex].classList.add(this._active);
			//set active tab number in history and change url
			if (tabName) {
				window.history.pushState({
					activeTab: newIndex
				}, tabName,`#${tabName}`);
			};
			//set new active tab number
			this._activeNum = newIndex;
		}

		_showInitial(attr) {
			let num = 0;
			let name = '';

			Array.prototype.forEach.call(this._section, function(tab, i) {
				//find active initial tab by hash-value
				if (tab.getAttribute(this._tabAttr) === attr.replace('#', '')) {
					num = i;
					name = tab.getAttribute(this._tabAttr);
				}
			}.bind(this));

			return {
				num: num,
				name: name
			};
		}

	}

	new Tabs({
		button: '.js-tabs-btn',
		section: '.js-tabs-section',
		activeClass: 'active',
		buttonAttr: 'data-tab',
		setionAttr: 'data-tab'
	});

})();