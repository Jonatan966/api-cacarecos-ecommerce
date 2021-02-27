import { Request } from 'express';
import multiparty from 'multiparty';

export function parseQueryParams(query: any, acceptOnly: string[]) {
  let oldQuery = {...query};
  let newQuery = {} as any;

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
  let finalFilter = {} as any;

  if (find_by && find_query) {
    find_by = find_by.split("|");
    find_query = find_query.split("|");

    if (find_by.length === find_query.length) {
      find_by.forEach((find_item: string, find_index: string | number) => {
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

export function parseMultipartForm(req: Request, files_field_name: string = '') {
  const form = new multiparty.Form();

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      let final = {body: null, files: null, error: null} as any
      if (!error) {
        Object.keys(fields).forEach(item => 
          fields[item] = fields[item].join()
        );

        final.body = fields;
        final.files = files[files_field_name];
        resolve(final);
        return;
      }

      final.error = error;
      reject(final);
    });
  });
}


export function parseRoutes(routes: string[]) {
  routes = routes.map(item => {
    item = item.replace('.ts', '').replace('.js', '');

    if (item.includes('index')) {
      item = item.replace('/index', '');
    }
    else if (item.includes('[')) {
      item = item.replace('[', ':').replace(']', '');
    }

    return item;
  });

  return routes;
}

export function parseRoute(route: string) {
  let newRoute = route.split('dist')[1];
  newRoute = parseRoutes([newRoute])[0];
  return newRoute;
}