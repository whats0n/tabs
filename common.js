(function() {

	class Tabs {

		constructor(config) {

			let doc = document;

			this._btns = doc.querySelectorAll(config.button);
			this._section = doc.querySelectorAll(config.section);

			this._active = config.activeClass;
			this._tabAttr = 'data-tab';
			this._btnAttr = 'data-tab';

			let initialCall = this._showInitial(window.location.hash);

			this._activeNum = initialCall.num;
			this._setActive(this._activeNum, initialCall.name);

			window.addEventListener('popstate', function(e) {
				if (window.history.state) {
					this._setActive(window.history.state.activeTab);
				} else if (!window.history.state && !window.location.hash) {
					this._setActive(0);
				}

			}.bind(this), false);

			Array.prototype.forEach.call(this._btns, function(btn, i) {
				btn.addEventListener('click', function() {
					let attr = btn.getAttribute(this._btnAttr);
					this._setActive(i, attr);
				}.bind(this), false);
			}.bind(this));
		}

		_setActive(newIndex, tabName) {

			this._btns[this._activeNum].classList.remove(this._active);
			this._btns[newIndex].classList.add(this._active);
			this._section[this._activeNum].classList.remove(this._active);
			this._section[newIndex].classList.add(this._active);

			if (tabName) {
				window.history.pushState({
					activeTab: newIndex
				}, tabName,`#${tabName}`);
			};

			this._activeNum = newIndex;

			console.log(window.history);
		}

		_showInitial(attr) {
			let num = 0;
			let name = '';

			Array.prototype.forEach.call(this._section, function(tab, i) {
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
		activeClass: 'active'
	});

})();