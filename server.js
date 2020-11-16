import express from 'express'
import cors from 'cors'
import lowDb from './lib/lowDb'
import './lib/cron'
import path from 'path'

const app = express()

app.use(cors())

const publicPath = path.join(__dirname, 'client/build')

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath,'index.html'));
})

app.get('/api/products', (req, res) => {
    const products = lowDb.get('products').value()
    
    res.json(products)
})

app.get('/api/news', (req, res)=> { 
    const news = lowDb.get('news').value()
    
    res.json(news)
})


const port = 5000

app.listen(port, () => console.log(`Server starts on port: ${port}`))