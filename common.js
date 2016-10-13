(function() {

	class Tabs {

		constructor(config) {

			let doc = document;
			//get dom elements
			this._btns = doc.querySelectorAll(config.button);
			this._sections = doc.querySelectorAll(config.section);

			//active class and names of attributes
			this._modes = ['display', 'class']
			this._mode = config.mode || this._modes[0];
			this._active = config.activeClass || 'is-active';
			this._tabAttr = config.sectionAttr || 'data-tab';
			this._btnAttr = config.buttonAttr || 'data-tab';

			//initial tab on load
			let initialCall = this._showInitial(window.location.hash);

			this._showActive(initialCall);

			window.addEventListener('hashchange', function(e) {
				let state = window.history.state;
				if (state) {
					this._showActive(state.activeTab);
					// this._pushState(state.activeTab);
				} else if (!state) {
					//show first tab, if the hash-value is empty or wrong
					if (window.location.hash) {
						this._showActive(window.location.hash.replace('#', ''));
					} else {
						this._showActive();
					};
				}
			}.bind(this), false);

			Array.prototype.forEach.call(this._btns, function(btn, i) {
				//current tab
				let currentName = btn.getAttribute(this._btnAttr);

				btn.addEventListener('click', function() {
					this._showActive(currentName);
					this._pushState(currentName);
				}.bind(this), false);

			}.bind(this));
		}

		_showActive(tabName) {
			let active;

			if (tabName) {
				active = tabName;
			} else {
				active = this._btns[0].getAttribute(this._btnAttr);
			}

			this._showActiveTab(this._btns, this._btnAttr, active);

			if (this._mode === this._modes[1]) {
				this._showActiveTab(this._sections, this._tabAttr, active);
			} else {
				this._showActiveTabByDisplay(this._sections, active);
			};
		}

		_pushState(tabName) {
			window.history.pushState({
				activeTab: tabName
			}, tabName,`#${tabName}`);
		}

		_showActiveTab(collection, collectionAttr, attr) {
			Array.prototype.forEach.call(collection, function(item) {
				if (item.getAttribute(collectionAttr) == attr) {
					item.classList.add(this._active);
				} else {
					item.classList.remove(this._active);
				}
			}.bind(this));
		}

		_showActiveTabByDisplay(collection, attr) {
			Array.prototype.forEach.call(collection, function(item) {
				if (item.getAttribute(this._tabAttr) == attr) {
					item.style.display = 'block';
				} else {
					item.style.display = 'none';
				}
			}.bind(this));
		}

		_showInitial(attr) {
			let name = null;

			Array.prototype.forEach.call(this._sections, function(tab, i) {
				let currentValue = tab.getAttribute(this._tabAttr);
				//if mode is not 'class' - hide sections by display
				if (this._mode !== this._modes[1]) {
					tab.style.display = 'none';
				}
				//find active initial tab by hash-value
				if (currentValue === attr.replace('#', '')) {
					name = currentValue;
					// this._pushState(currentValue);
				}
			}.bind(this));

			return name
		}

	}

	new Tabs({
		button: '.js-tabs-btn',
		section: '.js-tabs-section',
		activeClass: 'active',
		mode: 'class',
		buttonAttr: 'data-tab',
		setionAttr: 'data-tab'
	});

})();