function createErrorObject (message: string, code: number) {
  return {
    error: { message, code }
  }
}

const errorList = {
  CAMPOS_FALTANDO: createErrorObject('HÁ CAMPOS FALTANDO', 1),
  PERMISSAO_NEGADA: createErrorObject('VOCÊ NÃO TEM PERMISSÃO DE ACESSAR ESTA ROTA', 2),
  ITEM_NAO_ENCONTRADO: createErrorObject('ITEM NÃO ENCONTRADO', 3),
  OPERACAO_NAO_EXECUTADA: createErrorObject('NÃO FOI POSSÍVEL EXECUTAR ESSA OPERAÇÃO', 4),
  LOGIN_INCORRETO: createErrorObject('USUÁRIO E/OU SENHA INCORRETOS', 5),
  EMAIL_CADASTRADO: createErrorObject('EMAIL JÁ CADASTRADO', 6),
  REGISTRO_NAO_ENCONTRADO: createErrorObject('REGISTRO NÃO ENCONTRADO', 7),
  ID_INVALIDO: createErrorObject('ID INVÁLIDO', 8),
  PRODUTOS_INEXISTENTES: createErrorObject('UM OU MAIS PRODUTOS INEXISTENTES', 9),
  ESTOQUE_INSUFICIENTE: createErrorObject('ESTOQUE INSUFICIENTE', 10)
}

export default errorList
