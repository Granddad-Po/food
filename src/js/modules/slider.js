import getZero from '../utils/zero'

function slider({sliderSelector, slidesSelector, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    let slideIndex = 1
    let offset = 0

    const slides = document.querySelectorAll(slidesSelector),
        slider = document.querySelector(sliderSelector),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width

    total.textContent = getZero(slides.length)
    current.textContent = getZero(slideIndex)

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => slide.style.width = width)

    slider.style.position = 'relative'

    const indicators = document.createElement('ul')
    indicators.classList.add('carousel-indicators')
    const dots = []

    slider.append(indicators)

    function getActiveDot() {
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'
    }

    function deleteNotDigits(word) {
        return +word.replace(/\D/g, '')
    }

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot')

        if (i === 0) {
            dot.style.opacity = '1'
        }

        indicators.append(dot)
        dots.push(dot)
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex === slides.length) {
            slideIndex = 1
        } else {
            slideIndex++
        }

        current.textContent = getZero(slideIndex)

        getActiveDot()
    })

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`

        if (slideIndex === 1) {
            slideIndex = slides.length
        } else {
            slideIndex--
        }

        current.textContent = getZero(slideIndex)

        getActiveDot()
    })

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const slideTo = +e.target.getAttribute('data-slide-to')

            slideIndex = slideTo
            offset = deleteNotDigits(width) * (slideTo - 1)

            slidesField.style.transform = `translateX(-${offset}px)`;

            current.textContent = getZero(slideIndex)

            getActiveDot()
        })
    })
}

export default slider