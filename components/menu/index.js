require('./index.less');

let menuTempl = require('./template/menu.hbs'),
    emptyMenuTempl = require('./template/emptyMenu.hbs');

/**
 * Class representing menu for web application
 */
export class Menu {
    /**
     * Create a menu
     * @param {Object} menuSetting
     * @param {HTMLElement} menuSetting.el
     * @param {Object} menuSetting.data
     */
    constructor({el, data}) {
        this.$el  = el;
        this.data = data;

        this.$title    = el.querySelector('.js-title');
        this.$menuList = el.querySelector('.js-menu-list');
        this.$app      = el.closest('.js-app');

        this.initEvents();
    }

    /**
     * Update data
     * @param {Object} data
     */
    setData(data) {
        if (!data) {
            console.error('Ошибка в данных на сервере');
            return;
        }

        this.data = data;
        this.render();
    }

    /**
     * Render data
     */
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

    /**
     * Render menu items
     * @param {Array} items
     */
    renderItems(items) {
        items.forEach(item => {
            this._addItem(item);
        });
    }

    /**
     * Initialization event handlers
     */
    initEvents() {
        this.$menuList.addEventListener('click', this.removeItem.bind(this));
        this.$app.addEventListener('addItem', this.addCustomerItem.bind(this));
    }

    /**
     * Remove item from menu
     * @param {Event} ev
     */
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

    /**
     * Handler for add custom item to menu
     * @param {Event} ev
     */
    addCustomerItem(ev) {
        this._addItem(ev.detail);
        this.data.items.push(ev.detail);
        this._addEventOnChangeData();
    }

    /**
     * Add item to menu
     * @param {Object} item
     * @private
     */
    _addItem(item) {
        let $emptyItem = this.$menuList.querySelector('.js-empty-item');

        if ($emptyItem) {
            $emptyItem.remove();
        }

        this.$menuList.insertAdjacentHTML('beforeEnd', menuTempl(item));
    }

    /**
     * Generate event on change data
     * @private
     */
    _addEventOnChangeData() {
        let changeDataEv;

        changeDataEv = new CustomEvent('changeData');
        this.$app.dispatchEvent(changeDataEv);
    }
}
