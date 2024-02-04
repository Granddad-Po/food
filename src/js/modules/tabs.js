function tabs(tabsParentSelector, tabsSelector, tabsContentSelector, tabsActiveClass) {
    const tabsParent = document.querySelector(tabsParentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector);

    function hideContent() {
        tabContent.forEach((item, i) => {
            item.classList.remove('show', 'fade')
            item.classList.add('hide')

            tabs[i].classList.remove(tabsActiveClass)
        })
    }

    function showContent(i = 0) {
        tabContent[i].classList.remove('hide')
        tabContent[i].classList.add('show', 'fade')

        tabs[i].classList.add(tabsActiveClass)
    }

    hideContent()
    showContent()

    tabsParent.addEventListener('click', e => {
        const target = e.target

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (target === tab) {
                    hideContent()
                    showContent(i)
                }
            })
        }
    })
}

module.exports = tabs