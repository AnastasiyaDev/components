(function () {
    'use strict';

    require('./index.less');

    class Form {
        constructor ({el}) {
            this.$container = el;

            this.renderForm();
            this.initEvents();
        }

        renderForm() {
            this.$container.innerHTML = `
              <form class="form js-add-item-form">
				<div class="form__row">
                    <input class="form__input form__input_small"
                           type="url" 
                           name="url"
                           required
                           placeholder="url">
                    <input class="form__input form__input_small"
                           type="text" 
                           name="title"
                           required
                           placeholder="title">
                    <button class="form__btn" type="submit">Добавить</button>
				</div>
			</form>`;
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
