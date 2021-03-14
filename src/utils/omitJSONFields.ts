export function omitJSONFields<T = any> (json: T, ...fields: string[]) {
  const newJSON: any = {}
  const jsonFields = Object.keys(json).filter(item => !fields.includes(item))

  jsonFields.forEach(item => {
    console.log(item)
    newJSON[item] = json[item]
  })

  return newJSON as T
}
