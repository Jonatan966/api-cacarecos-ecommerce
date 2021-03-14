import { Db, MongoClient } from 'mongodb'

let db: Db = null

export class MongoConnector {
  async connect () {
    if (db) {
      return db
    }
    const client = await MongoClient.connect(process.env.MONGODB_CLUSTER_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    db = client.db(process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_DB : process.env.MONGODB_MAIN_DB)

    return db
  }
}
