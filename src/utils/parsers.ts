export function parseQueryParams(query, acceptOnly: string[]) {
  let newQuery = {};

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