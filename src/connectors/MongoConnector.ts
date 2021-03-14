import { Db, MongoClient } from 'mongodb'

let db: Db = null

export class MongoConnector {
  async connect () {
    if (db) {
      return db
    }
    const client = await MongoClient.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    db = client.db('cacarecos')

    return db
  }
}
