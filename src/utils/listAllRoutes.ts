import fs from 'fs'
import pathDir from 'path'

export function listAllRoutes (path: string, filePaths: string[] = []) {
  const mainPath = fs.readdirSync(path)

  mainPath.forEach(childPath => {
    if (!childPath.includes('.')) {
      listAllRoutes(pathDir.join(path, childPath), filePaths)
      return
    }
    filePaths.push(pathDir.join(path, childPath))
  })

  return filePaths
}
