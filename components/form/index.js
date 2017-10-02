(function () {
    'use strict';

    require('./index.less');
    let formTempl = require('./template/form.hbs');

    class Form {
        constructor ({el}) {
            this.$container = el;

            this.renderForm();
            this.initEvents();
        }

        renderForm() {
            this.$container.innerHTML = formTempl();
        }

        initEvents() {
            this.$container.addEventListener('submit', this.submitForm.bind(this));
        }

        submitForm(ev) {
            ev.preventDefault();

            let $form       = ev.target,
                $inputUrl   = $form.elements.url,
                $inputTitle = $form.elements.title,
                customEv;

            customEv = new CustomEvent('addItem', {
                detail: {
                    title: $inputTitle.value,
                    url: $inputUrl.value
                }
            });

            document.dispatchEvent(customEv);

            $form.reset();
        }
    }

    // export
    window.Form = Form;

})();