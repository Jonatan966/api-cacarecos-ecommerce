export function parseQueryParams(query, acceptOnly: string[]) {
  let newQuery = {};

  Object.keys(query).forEach(item => {
    if (!(acceptOnly.findIndex(obj => obj === item) + 1)) {
      delete query[item];
    }
  });

  if (Object.keys(query).length) {
    acceptOnly.forEach(item => {
      if (Number(query[item]) === 1) {
        return;
      }
      newQuery[item] = 0;  
    });  
  }

  return newQuery;
}