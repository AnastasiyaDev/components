(function() {
    'use strict';

    require('./index.less');
    let menuTempl = require('./template/menu.hbs');

    class Menu {
        constructor({el, data}) {
            this.$el  = el;
            this.data = data;

            this.$title    = el.querySelector('.js-title');
            this.$menuList = el.querySelector('.js-menu-list');
            this.$app      = el.closest('.js-app');

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
            this.$app.addEventListener('addItem', this.addCustomerItem.bind(this));
        }

        removeItem(ev) {
            let currentRemoveIcon = ev.target,
                currentItem,
                currentList,
                customChangeDataEv;

            if (currentRemoveIcon.classList.contains('js-close')) {
                // для поддержки в IE11-
                currentItem = currentRemoveIcon.closest('li');
                currentList = currentItem.closest('ul');
                currentList.removeChild(currentItem);

                customChangeDataEv = new CustomEvent('changeData');
                this.$app.dispatchEvent(customChangeDataEv);
            }
        }

        addCustomerItem(ev) {
            this._addItem(ev.detail);

            this.data.items.push(ev.detail);
        }

        _addItem(item) {
            this.$menuList.insertAdjacentHTML('beforeEnd', menuTempl(item));
        }
    }

    window.Menu = Menu;

})();
