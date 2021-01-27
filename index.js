
const robot = require('./scripts/robot')

const start = async() => {
    const result = await robot('https://www.instagram.com/p/CJyqKh5H001/?hl=pt-br')
    console.log(result)
}

start()