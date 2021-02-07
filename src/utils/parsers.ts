export function parseQueryParams(query, acceptOnly: string[]) {
  let oldQuery = {...query};
  let newQuery = {};

  Object.keys(oldQuery).forEach(item => {
    if (!(acceptOnly.findIndex(obj => obj === item) + 1)) {
      delete oldQuery[item];
    }
  });

  if (Object.keys(oldQuery).length) {
    acceptOnly.forEach(item => {
      if (Number(oldQuery[item]) === 1) {
        return;
      }
      newQuery[item] = 0;  
    });  
  }

  return newQuery;
}