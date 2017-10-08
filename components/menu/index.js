require('./index.less');
let menuTempl = require('./template/menu.hbs'),
    emptyMenuTempl = require('./template/emptyMenu.hbs');

export class Menu {
    constructor({el, data}) {
        this.$el  = el;
        this.data = data;

        this.$title    = el.querySelector('.js-title');
        this.$menuList = el.querySelector('.js-menu-list');
        this.$app      = el.closest('.js-app');

        this.initEvents();
    }

    setData(data) {
        if (!data) {
            console.error('Ошибка в данных на сервере');
            return;
        }

        this.data = data;
        this.render();
    }

    render() {
        this.$title.innerText = this.data.title;

        if (this.data.items) {
            // удалила элементы на сервере, на клиент пришли айтемы с null
            // при удалении с начала массива, позиции переписываются, поэтому:
            for (let i=this.data.items.length-1; i > 0; i--) {
                if (this.data.items[i] == null) {
                    this.data.items.splice(i, 1);
                }
            }
            this.renderItems(this.data.items);
        } else {
            this.data.items = [];
            this.$menuList.innerHTML = emptyMenuTempl();
        }

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
            currentItemTitle,
            currentList;

        if (currentRemoveIcon.classList.contains('js-close')) {
            // для поддержки в IE11-
            currentItem = currentRemoveIcon.closest('li');
            currentList = currentItem.closest('ul');
            currentList.removeChild(currentItem);

            // TODO: нужно сравнение не по title, а по ID (переделать меню-темплейт)
            currentItemTitle = currentItem.querySelector('.menu__link').textContent;

            this.data.items.forEach((item, index) => {
                if (item.title === currentItemTitle) {
                    this.data.items.splice(index, 1);
                }
            });

            this._addEventOnChangeData();
        }
    }

    addCustomerItem(ev) {
        this._addItem(ev.detail);
        this.data.items.push(ev.detail);
        this._addEventOnChangeData();
    }

    _addItem(item) {
        let $emptyItem = this.$menuList.querySelector('.js-empty-item');

        if ($emptyItem) {
            $emptyItem.remove();
        }

        this.$menuList.insertAdjacentHTML('beforeEnd', menuTempl(item));
    }

    _addEventOnChangeData() {
        let changeDataEv;

        changeDataEv = new CustomEvent('changeData');
        this.$app.dispatchEvent(changeDataEv);
    }
}
