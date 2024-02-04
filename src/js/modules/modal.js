function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)

    modal.classList.remove('hide')
    modal.classList.add('show')
    document.body.style.overflow = 'hidden'

    if (modalTimerId) {
        clearTimeout(modalTimerId)
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector)

    modal.classList.remove('show')
    modal.classList.add('hide')
    document.body.style.overflow = 'visible'
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector)

    function openModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId)
            window.removeEventListener('scroll', openModalByScroll)
        }
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId))
    })

    modal.addEventListener('click', e => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector)
        }
    })

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && !modal.classList.contains('hide')) {
            closeModal(modalSelector)
        }
    })

    window.addEventListener('scroll', openModalByScroll)
}

export default modal

export {openModal}
export {closeModal}