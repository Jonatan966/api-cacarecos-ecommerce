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

export function parsePaginator(page: any, limit: any, max_results: number = 15) {
  let finalResult = {skip: 0, limit: 15};

  if (!isNaN(page) && page > 0) {
    finalResult.skip = max_results * Number(page);
  }

  if (!isNaN(limit) && limit > 0 && limit <= max_results) {
    finalResult.limit = Number(limit);
  }

  return finalResult;
}

export function parseSearchFilter(query: any, acceptOnly: string[], notUseRegexQuery: string[] = []) {
  let {find_by, find_query} = query;
  let finalFilter = {};

  if (find_by && find_query) {
    find_by = find_by.split("|");
    find_query = find_query.split("|");

    if (find_by.length === find_query.length) {
      find_by.forEach((find_item, find_index) => {
        if (!acceptOnly.find(item => item === find_item)) {
          delete find_by[find_index];
          delete find_query[find_index];
          return;
        }

        finalFilter[find_item] = 
        !!notUseRegexQuery.find(queryItem => queryItem === find_item) 
        ? find_query[find_index] 
        : {$regex: `.*${find_query[find_index]}.*`};
      });
    }
  }

  return finalFilter;
}