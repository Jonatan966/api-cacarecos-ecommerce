import { Collection, Db } from 'mongodb'

import { omitJSONFields } from '../utils/omitJSONFields'
import { User } from '@entities/User'

const antiIdProjection = { projection: { _id: 0 } }

export class MongoUsersRepository {
  private usersCollection: Collection<User>;

  constructor (
    mongoConnector: Promise<Db>
  ) {
    mongoConnector.then(value => {
      this.usersCollection = value.collection<User>('users')
    })
  }

  async save (user: User) {
    const alreadyExists = await this.usersCollection.findOne({ email: user.email })

    if (!alreadyExists) {
      const resultInfo = await this.usersCollection.insertOne(user)

      if (resultInfo.insertedCount) {
        return omitJSONFields<User>(resultInfo.ops[0], 'password', '_id')
      }

      throw new Error("Couldn't save this")
    }

    throw new Error('User already exists')
  }

  async findByEmail (userEmail: string) {
    const user = this.usersCollection.findOne({ email: userEmail }, antiIdProjection)

    return user
  }

  async findById (userId: string) {
    const user = this.usersCollection.findOne({ id: userId }, antiIdProjection)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
