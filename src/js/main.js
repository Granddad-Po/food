window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');

    function hideContent() {
        tabContent.forEach((item, i) => {
            item.classList.remove('show', 'fade')
            item.classList.add('hide')

            tabs[i].classList.remove('tabheader__item_active')
        })
    }

    function showContent(i = 0) {
        tabContent[i].classList.remove('hide')
        tabContent[i].classList.add('show', 'fade')

        tabs[i].classList.add('tabheader__item_active')
    }

    hideContent()
    showContent()

    tabsParent.addEventListener('click', e => {
        const target = e.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (target === tab) {
                    hideContent()
                    showContent(i)
                }
            })
        }
    })

    // Timer

    const deadline = new Date('2024-02-01')

    function getTimeRemaining(deadline) {
        const delta = Date.parse(deadline) - new Date()
        let days, hours, minutes, seconds

        if (delta <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(delta / (1000 * 60 * 60 * 24))
            hours = Math.floor(delta / (1000 * 60 * 60) % 24)
            minutes = Math.floor(delta / (1000 * 60) % 60)
            seconds = Math.floor((delta / 1000) % 60)
        }

        return {
            delta,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector)
        let days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000)


        function updateClock() {
            const time = getTimeRemaining(deadline)

            days.innerHTML = getZero(time.days)
            hours.innerHTML = getZero(time.hours)
            minutes.innerHTML = getZero(time.minutes)
            seconds.innerHTML = getZero(time.seconds)

            if (time < 0) {
                clearInterval(timeInterval)
            }
        }

        updateClock()
    }

    setClock('.timer', deadline)

    // Modal

    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]')

    // openModalID = setTimeout(openModal, 10000)

    function openModal() {
        modal.classList.toggle('hide')
        document.body.style.overflow = 'hidden'
        // clearTimeout(openModalID)
    }

    function closeModal() {
        modal.classList.toggle('hide')
        document.body.style.overflow = 'visible'
    }

    function openModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', openModalByScroll)
        }
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    })

    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal()
        }
    })

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && !modal.classList.contains('hide')) {
            closeModal()
        }
    })

    window.addEventListener('scroll', openModalByScroll)

    // Menu Card

    // document.querySelector('.menu .container').innerHTML = ''

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.description = description
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 38
            this.changeToUAH()
        }

        changeToUAH() {
            this.price = Math.round(this.price / this.transfer)
        }

        render() {
            const card = document.createElement('div')
            if (this.classes.length === 0) {
                this.classes = 'menu__item'
                card.classList.add(this.classes)
            } else {
            this.classes.forEach(className => card.classList.add(className))
            }

            card.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 className="menu__item-subtitle">${this.title}</h3>
                <div className="menu__item-descr">${this.description}
                </div>
                <div className="menu__item-divider"></div>
                <div className="menu__item-price">
                    <div className="menu__item-cost">Цена:</div>
                    <div className="menu__item-total"><span>${this.price}</span> $/день</div>
                </div>
           `
            this.parent.append(card)
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container',
        'menu__item',
    ).render()

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container',
    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container',
        'menu__item'
    ).render()

    // Forms


})
