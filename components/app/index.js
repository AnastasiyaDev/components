require('./index.less');

// import
import {Service} from '../../service/index';
import {Menu} from '../menu/index';
import {Form} from '../form/index';

/**
 * Class representing web application
 */
class App {
    /**
     * Create a application
     * @param {Object} appSetting
     * @param {HTMLElement} appSetting.el
     */
    constructor ({el}) {
        this.$app = el;

        this.menu = new Menu({
            el: el.querySelector('.js-menu'),
            data: {}
        });

        this.form = new Form({
            el: el.querySelector('.js-form')
        });

        this.loadData();
        this.initEvents();
    }

    /**
     * Load data from server
     */
    loadData() {
        Service.getItems()
        .then(this._updateMenu.bind(this))
        .catch(error => {
            this._showErrorMsg(error);
        });
    }

    /**
     * Initialization event handlers
     */
    initEvents() {
        this.$app.addEventListener('changeData', this.uploadData.bind(this));
    }

    /**
     * Upload data to the server
     */
    uploadData() {
        Service.putItems(this.menu.data)
            .then(console.info('Данные на сервере обновились'))
            .catch(error => {
                this._showErrorMsg(error);
            });
    }

    /**
     * @param {*} newItems
     * @return {Promise<undefined>}
     */
    _updateMenu(newItems) {
        return new Promise((resolve, reject) => {
            this.menu.setData(newItems);
            resolve();
        });
    }

    /**
     * Show error message in console
     * @throws error
     */
    static _showErrorMsg(error) {
        console.log(error);
    }
}

// export
window.App = App;
