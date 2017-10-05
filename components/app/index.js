(function() {
    'use strict';

    require('./index.less');

    // import
    const Menu = window.Menu;
    const Form = window.Form;

    class App {
        constructor ({el}) {
            this.$app = el;
            this.serverUrl = 'https://components1808.firebaseio.com/menu/-Kvhzifyb_lsuVgKsNIc.json';

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
            const xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange', (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.error('Сетевая ошибка', xhr);
                    } else {
                        this.menu.setData(JSON.parse(xhr.responseText));
                    }
                }
            });

            xhr.open('GET', this.serverUrl, true);
            xhr.send();
        }

        initEvents() {
            this.$app.addEventListener('changeData', this.uploadData.bind(this));
        }

        /**
         * Upload data to the server
         */
        uploadData() {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', this.serverUrl, true);
            xhr.send(JSON.stringify(this.menu.data));
        }
    }

    // export
    window.App = App;

})();
