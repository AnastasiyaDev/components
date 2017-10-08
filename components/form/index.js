require('./index.less');
let formTempl = require('./template/form.hbs');

/**
 * Class representing form for web application
 */
export class Form {
    /**
     * Create a form
     * @param {Object} formSetting
     * @param {HTMLElement} formSetting.el
     */
    constructor ({el}) {
        this.$container = el;
        this.$app = el.closest('.js-app');

        this.renderForm();
        this.initEvents();
    }

    /**
     * Create HTML
     */
    renderForm() {
        this.$container.innerHTML = formTempl();
    }

    /**
     * Initialization event handlers
     */
    initEvents() {
        this.$container.addEventListener('submit', this.submitForm.bind(this));
    }

    /**
     * Submit form
     * @param {Event} ev
     */
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

