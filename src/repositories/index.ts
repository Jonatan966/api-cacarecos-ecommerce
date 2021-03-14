import { MongoConnector } from '../connectors/MongoConnector'
import { MongoCategoryRepository } from './MongoCategoryRepository'
import { MongoUsersRepository } from './MongoUsersRepository'

const mongoConnection = (new MongoConnector()).connect()

const mongoUsersRepository = new MongoUsersRepository(
  mongoConnection
)

const mongoCategoryRepository = new MongoCategoryRepository(
  mongoConnection
)

export { mongoUsersRepository, mongoCategoryRepository }
