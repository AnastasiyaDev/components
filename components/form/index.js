(function () {
    'use strict';

    require('./index.less');

    class Form {
        constructor ({el}) {
            this.$container = el;

            this.renderForm();
        }

        renderForm() {
            this.$container.innerHTML = `
              <form class="form">
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
    }

    // export
    window.Form = Form;

})();
