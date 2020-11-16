import axios from 'axios'
import cheerio from 'cheerio'
import lowDb from './lowDb'
import { v1 as uuid } from 'uuid'

const fetchData = async (url) => {
    const result = await axios.get(url)
    return result.data
}

//Scrape Prodcuts
/*----------
Agricultura
------------*/
const getRice = async () => {
    const rice = {
        id: uuid(),
        name: "Arroz",
        isVeggie: true,
        information: []
    }
    const content = await fetchData('https://www.canalrural.com.br/cotacao/arroz/')
    const $ = cheerio.load(content)
    const information = []
    $('.table-cotacao > tbody > tr').each((i, e) => {
        const items = []
        $(e).find('td').each((index, elem) => {
            const item = $(elem).text().trim()
            items.push(item)
        })

        information.push({
            infoId: uuid(),
            praca: items[0],
            price: items[1]
        })
    })

    rice.information = information

    return rice
}

/*----------
Pecuaria
------------*/
const getOx = async () => {
    const ox = {
        id: uuid(),
        name: "Boi Gordo",
        isVeggie: false,
        information: []
    }
    const content = await fetchData('https://www.canalrural.com.br/cotacao/boi-gordo/')
    const $ = cheerio.load(content)
    const information = []
    $('.table-cotacao > tbody > tr').each((i, e) => {
        const items = []
        $(e).find('td').each((index, elem) => {
            const item = $(elem).text().trim()
            items.push(item)
        })

        information.push({
            infoId: uuid(),
            praca: items[0],
            price: items[1],
            thirtyDays: items[2],
            base: items[3]
        })
    })

    ox.information = information

    return ox
}

//Scrape News
const getNewsCanalrural = async () => {
    const canalruralNews = []
    const content = await fetchData('https://www.canalrural.com.br/noticias/')
    const $ = cheerio.load(content)

    $('.fl-post-grid > .fl-post-column').each((i, e) => {
        if (i < 5) {
            const id = uuid()
            const title = $(e).find('.fl-post-title > a').text().trim()
            const subTitle = $(e).find('.fl-post-excerpt > p').text().trim()
            const link = $(e).find('.fl-post-title > a').attr('href')
            const data = { id, title, subTitle, link }
            canalruralNews.push(data)
        } else {
            return
        }
    })

    return canalruralNews
}

const getNewsAlavoura = async () => {
    const alavouraNews = []
    const content = await fetchData('https://alavoura.com.br/cenario-agro/')
    const $ = cheerio.load(content)

    $('.articles-list > article').each((i, e) => {
        if (i < 5) {
            const id = uuid()
            const title = $(e).find('.entry-title > a').text().trim()
            const subTitle = $(e).find('.entry-excerpt > p').text().trim()
            const link = $(e).find('.entry-title > a').attr('href')
            const data = { id, title, subTitle, link }
            alavouraNews.push(data)
        } else {
            return
        }
    })

    return alavouraNews
}

//Put All Products and News to their  Single Arrays
const getProducts = async () => {
    const products = []
    const rice = await getRice()
    const ox = await getOx()

    products.push(rice)
    products.push(ox)

    return products
}

const getNews = async () => {
    const news = []
    const alavouraNews = await getNewsAlavoura()
    const canalruralNews = await getNewsCanalrural()

    alavouraNews.map((alavouraNew) => news.push(alavouraNew))
    canalruralNews.map((canalruralNew) => news.push(canalruralNew))
    
    return news
}

//Write data in DB and update constantly
const runCron = async () => {
    const [products, news] = await Promise.all([
        getProducts(),
        getNews()
    ])

    eraseDBData()

    products.map((product) => (
        lowDb.get('products')
            .push(product)
            .write()
    ))


    news.map((notice) => (
        lowDb.get('news')
            .push(notice)
            .write()
    ))
}
//Erase db existing data
const eraseDBData = () => {
    lowDb.get('products')
        .remove()
        .write()

    lowDb.get('news')
        .remove()
        .write()
}

export { runCron }