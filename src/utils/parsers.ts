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

export function parseSearchFilter(query: any, acceptOnly: string[], notUseRegexQuery?: string[]) {
  const {find_by, find_query} = query;
  let finalFilter = {};

  if (find_by && find_query) {
    const item = acceptOnly.find(item => item === find_by);
    if (item) {
      finalFilter[item] = 
        !!notUseRegexQuery.find(queryItem => queryItem === item) 
        ? find_query 
        : {$regex: `.*${find_query}.*`};
    }  
  }

  return finalFilter;
}