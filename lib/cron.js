import cron from 'node-cron'
import { runCron } from './scraper'

cron.schedule('1 00 * * *', ()=> {
    runCron()
})