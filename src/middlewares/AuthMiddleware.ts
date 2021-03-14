import { NextFunction, Response } from 'express'
import { INewRequest } from '../utils/interfaces'
import jwt from 'jsonwebtoken'
import { mongoUsersRepository } from '../repositories'

function checkToken (token: string) {
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET) as any
    return result
  } catch {
    return false
  }
}

export default function authMiddleware (isAdmin = false) {
  return async function (req: INewRequest, res: Response, next: NextFunction) {
    let token = req.headers.authorization

    if (token && token.includes('Bearer ')) {
      token = token.split(' ')[1]
      const tokenResult = checkToken(token)

      if (tokenResult) {
        const user = await mongoUsersRepository.findById(tokenResult.id)
        if (user) {
          req.user = user
          if (isAdmin ? (!!req.user.admin) : true) {
            return next()
          }

          return res.status(401).json({ error: 'Acesso não autorizado' })
        }
      }
    }

    return res.status(401).json({ error: 'TOKEN INVÁLIDO' })
  }
}
