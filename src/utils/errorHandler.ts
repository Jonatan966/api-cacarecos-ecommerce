import { Request, Response } from 'express'

function createErrorObject (message: string, code: number) {
  return {
    error: { message, code }
  }
}

export const errorList = {
  CAMPOS_FALTANDO: createErrorObject('HÁ CAMPOS FALTANDO', 1),
  PERMISSAO_NEGADA: createErrorObject('VOCÊ NÃO TEM PERMISSÃO DE ACESSAR ESTA ROTA', 2),
  ITEM_NAO_ENCONTRADO: createErrorObject('ITEM NÃO ENCONTRADO', 3),
  OPERACAO_NAO_EXECUTADA: createErrorObject('NÃO FOI POSSÍVEL EXECUTAR ESSA OPERAÇÃO', 4),
  LOGIN_INCORRETO: createErrorObject('USUÁRIO E/OU SENHA INCORRETOS', 5),
  EMAIL_CADASTRADO: createErrorObject('EMAIL JÁ CADASTRADO', 6),
  REGISTRO_NAO_ENCONTRADO: createErrorObject('REGISTRO NÃO ENCONTRADO', 7),
  ID_INVALIDO: createErrorObject('ID INVÁLIDO', 8),
  PRODUTOS_INEXISTENTES: createErrorObject('UM OU MAIS PRODUTOS INEXISTENTES', 9),
  ESTOQUE_INSUFICIENTE: createErrorObject('ESTOQUE INSUFICIENTE', 10),
  ITEM_JA_CADASTRADO: createErrorObject('JÁ EXISTE UM CADASTRO COM ESTES DADOS', 11)
}

export class AppError {
  constructor (
    public readonly message: {error: {message: string, code: number}},
    public readonly statusCode: number = 400
  ) {}

  static async errorCatcher (handleFunction: (request: Request, response: Response) => any, request: Request, response: Response) {
    try {
      await handleFunction(request, response)
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message)
      }

      return response.status(500).json({
        error: {
          code: -1,
          message: `Internal Server Error. ${error.message}`
        }
      })
    }
  }
}
