require('./index.less');
let formTempl = require('./template/form.hbs');

export class Form {
    constructor ({el}) {
        this.$container = el;
        this.$app = el.closest('.js-app');

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
            addItemEv;

        addItemEv = new CustomEvent('addItem', {
            detail: {
                title: $inputTitle.value,
                url: $inputUrl.value
            }
        });

        this.$app.dispatchEvent(addItemEv);

        $form.reset();
    }
}

