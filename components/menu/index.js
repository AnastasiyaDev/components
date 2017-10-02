(function() {
    'use strict';

    require('./index.less');
    let menuTempl = require('./template/menu.hbs');

    class Menu {
        constructor({el, data}) {
            this.$el  = el;
            this.data = data;

            this.$title       = el.querySelector('.js-title');
            this.$menuList    = el.querySelector('.js-menu-list');

            this.initEvents();
        }

        setData(data) {
            this.data = data;
            this.render();
        }

        render() {
            this.$title.innerText = this.data.title;
            this.renderItems(this.data.items);
        }

        renderItems(items) {
            items.forEach(item => {
                this._addItem(item);
            });
        }

        initEvents() {
            this.$menuList.addEventListener('click', this.removeItem.bind(this));
            document.addEventListener('addItem', this.addCustomerItem.bind(this));
        }

        removeItem(ev) {
            let currentRemoveIcon = ev.target,
                currentItem,
                currentList;

            if (currentRemoveIcon.tagName == 'I') {
                // для поддержки в IE11-
                currentItem = currentRemoveIcon.closest('li');
                currentList = currentItem.closest('ul');
                currentList.removeChild(currentItem);
            }
        }

        addCustomerItem(ev) {
            this._addItem(ev.detail);
        }

        _addItem(item) {
            this.$menuList.insertAdjacentHTML('beforeEnd', menuTempl(item));
        }
    }

    window.Menu = Menu;

})();
