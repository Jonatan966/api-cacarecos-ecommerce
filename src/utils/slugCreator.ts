function slugCreator (str: string) {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuunc------'
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remover caracteres inválidos
    .replace(/\s+/g, '-') // remover espaçoes em branco e trocá-los por -
    .replace(/-+/g, '-') // remover duplos traços

  return str
};

export default slugCreator
