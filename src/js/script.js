import tabs from './modules/tabs'
import modal, {openModal} from './modules/modal'
import cards from './modules/cards'
import calc from './modules/calc'
import forms from './modules/forms'
import slider from './modules/slider'
import timer from './modules/timer'

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000)

    tabs('.tabheader', '.tabheader__item', '.tabcontent', 'tabheader__item_active')
    modal('[data-modal]', '.modal', modalTimerId)
    cards()
    calc()
    forms('form')
    timer('.timer', '2024-05-01')
    slider({
        sliderSelector: '.offer__slider',
        slidesSelector: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    })
})