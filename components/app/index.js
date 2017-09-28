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
                data: {
                    title: 'Сайты',
                    items: []
                }
            });

            this.menu.setData({
                title: 'Сайты',
                items: [
                    {
                        title: 'Медуза',
                        url: 'https://meduza.io/'
                    },
                    {
                        title: 'Яндекс.Новости',
                        url: 'https://news.yandex.ru/'
                    },
                    {
                        title: 'BBC news',
                        url: 'http://www.bbc.com/news'
                    }
                ]
            });

            this.form = new Form({
                el: el.querySelector('.js-form')
            })
        }
    }

    // export
    window.App = App;

})();
