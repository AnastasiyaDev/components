require('./index.less');

let formTempl = require('./template/form.hbs');
let titleErrorMsg = require('./template/titleErrorMsg.hbs');

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
        this.$container  = el;
        this.$app        = el.closest('.js-app');

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
        this.$container.addEventListener('change', this.changeTitleField.bind(this));
        this.$app.addEventListener('checkUniqTitle', this.itemTitleValidation.bind(this));
    }

    /**
     * Change title field
     * @param {Event} ev
     */
    changeTitleField(ev) {
        let $inputTitle = ev.target,
            titleValidEv;

        if ($inputTitle.classList.contains('js-input-title')) {
            titleValidEv = new CustomEvent('titleValidation', {
                detail: {
                    value: $inputTitle.value
                }
            });

            this.$app.dispatchEvent(titleValidEv);
        }
    }

    /**
     * Item title validation
     * @param {Event} ev
     */
    itemTitleValidation(ev) {
        let $submitBtn = this.$container.querySelector('.js-submit-item'),
            $formErrorMsg = this.$container.querySelector('.js-form-error-msg');

        if (ev.detail.isUniqTitle) {
            $submitBtn.disabled = true;
            this.$container.insertAdjacentHTML('beforeEnd', titleErrorMsg());
        } else if ($submitBtn.disabled) {
            $submitBtn.disabled = false;
            $formErrorMsg.remove();
        }
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

