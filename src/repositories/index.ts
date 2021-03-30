import { MongoConnector } from '../connectors/MongoConnector'
import { MongoCategoryRepository } from './MongoCategoryRepository'
import { MongoProductRepository } from './MongoProductRepository'
import { MongoUsersRepository } from './MongoUsersRepository'

const mongoConnection = (new MongoConnector()).connect()

const mongoUsersRepository = new MongoUsersRepository(
  mongoConnection
)

const mongoCategoryRepository = new MongoCategoryRepository(
  mongoConnection
)

const mongoProductRepository = new MongoProductRepository(
  mongoConnection
)

export { mongoUsersRepository, mongoCategoryRepository, mongoProductRepository }
