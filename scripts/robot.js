
const puppeteer = require('puppeteer')

module.exports = async(link) => {

    let allPeoples = []

    await start()
    return sort(countComents(allPeoples))

    async function start() {

        async function loadMore(page, selector) {
            const button = await page.$(selector)

            if(button) {

                await button.click()
                await page.waitFor(selector, {
                    timeout:3000
                }).catch((err) => {
                    
                })
                await loadMore(page, selector)
            }

            return
        }

        const browser = await puppeteer.launch({
            headless:false
        })
        const page = await browser.newPage()
        await page.goto(link)

        await loadMore(page, '.dCJp8')

        allPeoples = await page.evaluate(async() => {

            const nodes = document.querySelectorAll("a.sqdOP")
            const peoples = [...nodes]
            const array = peoples.map(item => item.innerText)
            return array

        })

        await page.close()

    }

    function countComents(fake) {
        const count = {}
        fake.forEach((people) => { count[people] = ( count[people] || 0 ) + 1 })
        return count
    }

    function sort(count) {
        const entries = Object.entries(count)

        const sortedEntries = entries.sort((a, b) => b[1] - a[1])
        return sortedEntries
    }

}