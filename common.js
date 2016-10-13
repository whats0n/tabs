(function(func) {

	window.Tabs = func();

} (function() {

	class Tabs {

		constructor(config) {

			let doc = document;
			//get dom elements
			this._btns = doc.querySelectorAll(config.button);
			this._sections = doc.querySelectorAll(config.section);

			//active class and names of attributes
			this._className = config.className;
			this._active = config.activeClass || 'is-active';
			this._tabAttr = config.sectionAttr || 'data-tab';
			this._btnAttr = config.buttonAttr || 'data-tab';

			//initial tab on load
			let initialCall = this._checkHash(window.location.hash);

			this._showActive(initialCall);

			window.addEventListener('hashchange', (e) => {
				let hash = window.location.hash.replace('#', '');

				this._checkHash(hash)
					? this._showActive(hash)
					: null;

			}, false);

			Array.prototype.forEach.call(this._btns, (btn) => {
				//current tab
				let currentName = btn.getAttribute(this._btnAttr);

				btn.addEventListener('click', () => {
					this._showActive(currentName);
					this._pushState(currentName);
				}, false);

			});

			console.log('a');
		}

		_showActive(tabName) {

			tabName = (!tabName)
				? tabName = this._btns[0].getAttribute(this._btnAttr)
				: tabName;

			this._showCurrent(this._btns, this._btnAttr, tabName);

			this._className
				? this._showCurrent(this._sections, this._tabAttr, tabName)
				: this._showActiveTabByDisplay(this._sections, tabName);

		}

		_pushState(tabName) {
			window.history.pushState({
				activeTab: tabName
			}, tabName,`#${tabName}`);
		}

		_showCurrent(collection, collectionAttr, attr) {

			Array.prototype.forEach.call(collection, (item) => {
				item.getAttribute(collectionAttr) == attr
					? item.classList.add(this._active)
					: item.classList.remove(this._active);
			});

		}

		_showActiveTabByDisplay(collection, attr) {

			Array.prototype.forEach.call(collection, (item) => {

				item.getAttribute(this._tabAttr) == attr
					? item.style.display = 'block'
					: item.style.display = 'none';

			});

		}

		_checkHash(attr) {
			let name = null;

			Array.prototype.forEach.call(this._sections, (tab) => {

				let currentValue = tab.getAttribute(this._tabAttr);
				//if className: false - hide sections by display
				(!this._className)
					? tab.style.display = 'none'
					: null;

				(currentValue === attr.replace('#', ''))
					? name = currentValue
					: null;

			});

			return name;
		}

	}

	return Tabs;

}));


let nt = new Tabs({
	button: '.js-tabs-btn',
	section: '.js-tabs-section',
	activeClass: 'active',
	className: true,
	buttonAttr: 'data-tab',
	setionAttr: 'data-tab'
});