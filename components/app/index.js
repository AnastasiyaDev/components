(function() {
    'use strict';

    require('./index.less');

    // import
    const Menu = window.Menu;
    const Form = window.Form;

    class App {
        constructor ({el}) {
            this.menu = new Menu({
                el: el.querySelector('.js-menu'),
                data: {}
            });

            this.form = new Form({
                el: el.querySelector('.js-form')
            });

            this.loadData();
        }

        /**
         * Load data from server
         */
        loadData() {
            const url = '/data/mock.json',
                  xhr = new XMLHttpRequest();


            xhr.addEventListener('readystatechange', (event) => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        console.error('Сетевая ошибка', xhr);
                    } else {
                        this.menu.setData(JSON.parse(xhr.responseText));
                    }
                }
            });

            xhr.open('GET', url, true);
            xhr.send();
        }
    }

    // export
    window.App = App;

})();
