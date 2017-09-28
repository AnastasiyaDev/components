(function() {
    'use strict';

    require('./index.less');

    class Menu {
        constructor({el, data}) {
            this.$el  = el;
            this.data = data;

            this.$el          = el;
            this.$title       = el.querySelector('.js-title');
            this.$menuList    = el.querySelector('.js-menu-list');

            this.initEvents();
        }

        setData (data) {
            this.data = data;
            this.render();
        }

        render () {
            this.$title.innerText = this.data.title;
            this.renderItems(this.data.items, this.$menuList);
        }

        renderItems(items, container) {
            items.forEach(item => {
                this._addItem(item, container); // пусть _addItem работает только с одним элментом
            });
        }

        initEvents() {
            this.$menuList.addEventListener('click', this.removeItem.bind(this));
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

        _addItem(item, container) {
            let ulEl = document.createElement('ul'),
                liEl = document.createElement('li'),
                link = document.createElement('a'),
                removeIcon = document.createElement('i');

            link.textContent = item.title;
            link.classList.add('menu__link');
            link.href = item.url;
            removeIcon.classList.add('close');

            liEl.classList.add('menu__item');
            liEl.append(link, removeIcon);

            if (item.items) { // а здесь нужно рекурсивно вызвать renderItems,
                liEl.append(ulEl);
                this.renderItems(item.items, ulEl); // указываем, что рендерим и куда
            }

            container.append(liEl);
        }
    }

    window.Menu = Menu;

})();
