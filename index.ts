import axios from 'axios';

const API_URL: string = 'https://the-one-api.dev/v2';

type Pagination = {
    limit?: number;
    page?: number;
    offset?: number;
}

type Sorting = {
    field?: string;
    direction?: 'asc' | 'desc';
}

type Filtering = {
    name?: string;
}

type Options = {
    pagination?: Pagination;
    sorting?: Sorting
    filtering?: Filtering
}


function buildQueryParams(options?: Options): string {

    const pagination = options && options.pagination && Object.keys(options.pagination).map(key => `${key}=${options.pagination?.[key as keyof Pagination]}`).join('&');
    const sorting = options && options.sorting && `sort=${options.sorting.field}:${options.sorting.direction}&`;
    const filtering = options && options.filtering && Object.keys(options.filtering).map(key => `${key}=${options.filtering?.[key as keyof Filtering]}`).join('&');
    const query = '?' + [pagination, sorting, filtering].filter(Boolean).join('&');

    return query;
}

export function getMovies(options?: Options): Promise<object> {
    const query = buildQueryParams(options);
    process.env.ENABLE_LOGGING && console.log('query', query);
    
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/movie/${query}`, {headers: {'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`}})
        .then((resp) => {
          resolve(resp.data);
        })
        .catch(reject);
    });
  }
  
  export function getMovieById(id: string): Promise<object> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/movie/${id}`, {headers: {'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`}})
        .then((resp) => {
          resolve(resp.data);
        })
        .catch(reject);
    });
  }

  export function getQuotesByMovieId(id: string, options?: Options): Promise<object> {
    const query = buildQueryParams(options);
    process.env.ENABLE_LOGGING && console.log('query', query);
    
    return new Promise((resolve, reject) => {
      axios
        .get(`${API_URL}/movie/${id}/quote/${query}`, {headers: {'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`}})
        .then((resp) => {
          resolve(resp.data);
        })
        .catch(reject);
    });
  }

  export default { getMovies, getMovieById, getQuotesByMovieId };