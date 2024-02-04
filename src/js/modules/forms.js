import {closeModal} from "./modal";
import axios from "axios";

function forms(selector) {
    const forms = document.querySelectorAll(selector)

    const messages = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item)
    })

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let spinner = document.createElement('img')
            spinner.src = messages.loading
            spinner.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', spinner)

            const formData = new FormData(form)

            const body = Object.fromEntries(formData.entries())

            axios.post('http://localhost:3000/requests/', body)
                .then(res => {
                    showThanksModal(messages.success, res.status)
                    spinner.remove()
                })
                .catch(() => {
                    showThanksModal(messages.failure)
                })
                .finally(() => {
                    form.reset()
                })
        })
    }

    function showThanksModal(message, status) {
        const thanksModal = document.createElement('div')
        thanksModal.classList.add('thanks', 'fade')
        thanksModal.innerHTML = `
            <div class="thanks__content">
                <img src="icons/${status === 201 ? 'done' : 'warning'}.png" alt="status icon">
                <div class="thanks__title">
                    ${message}
                </div>
            </div>
        `

        closeModal('.modal')
        document.body.append(thanksModal)
        setTimeout(() => {
            thanksModal.classList.toggle('hide')
        }, 5000)
    }
}

export default forms