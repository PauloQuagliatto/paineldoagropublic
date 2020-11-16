import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'


const adapter = new FileSync('db.json')
const lowDb = low(adapter)
    
lowDb.defaults({ products: [], news: [] })
  .write()
  
export default lowDb