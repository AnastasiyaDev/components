(function() {
    'use strict';

    require('./index.less');

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
            let liEl = document.createElement('li'),
                link = document.createElement('a'),
                removeIcon = document.createElement('i');

            link.textContent = item.title;
            link.classList.add('menu__link');
            link.href = item.url;
            removeIcon.classList.add('close');

            liEl.classList.add('menu__item');
            liEl.append(link, removeIcon);

            this.$menuList.append(liEl);
        }
    }

    window.Menu = Menu;

})();
