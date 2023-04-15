# Lord Of The Rings API SDK

## Overview
This is a node.js SDK for the Lord Of The Rings API (LOTR) https://the-one-api.dev/. The LOTR API is a RESTful API based on the books and movies of The Lord of the Rings and The Hobbit. The API is free to use but requires an API key to access the data. You can get an API key by registering at https://the-one-api.dev/.
The SDK was developed as a take home assignment for a job interview. The SDK is not intended for production use.

## Compatibility
This SDK was tested with node v19.5.0 and npm v9.3.1

## Installation
`npm i guy_pavlov-sdk`

## Authentication
The SDK requires an API key to access the LOTR API. You can get an API key by registering at https://the-one-api.dev/. The API key should be set as an environment variable named API_ACCESS_TOKEN. 

## Environment Variables
The SDK requires the following environment variables to be set:
* API_ACCESS_TOKEN - The API key for the LOTR API
* ENABLE_LOGGING (optional, default false) - Set to true to enable logging

To use .env files, install the dotenv package and add the following to your code:
`require('dotenv').config()`
To start with a template .env file, rename the .env.example file to .env and set the environment variables there.

## Usage
The SDK exposes the following methods:
* getMovies (paginated, sorted) - returns a list of movies
* getMovieById - returns a movie by id
* getQuotesByMovieId (paginated, sorted) - returns a list of quotes for a movie given the movie id

### Examples
#### getMovies
```javascript
const sdk = require('guy_pavlov-sdk');
const movies = await sdk.getMovies();
```
#### getMovies results
```javascript
{
  docs: [
    {
      _id: '5cd95395de30eff6ebccde56',
      name: 'The Lord of the Rings Series',
      runtimeInMinutes: 558,
      budgetInMillions: 281,
      boxOfficeRevenueInMillions: 2917,
      academyAwardNominations: 30,
      academyAwardWins: 17,
      rottenTomatoesScore: 94
    },
    
    {
      _id: '5cd95395de30eff6ebccde5b',
      name: 'The Two Towers',
      runtimeInMinutes: 179,
      budgetInMillions: 94,
      boxOfficeRevenueInMillions: 926,
      academyAwardNominations: 6,
      academyAwardWins: 2,
      rottenTomatoesScore: 96
    },
    {
      _id: '5cd95395de30eff6ebccde5c',
      name: 'The Fellowship of the Ring',
      runtimeInMinutes: 178,
      budgetInMillions: 93,
      boxOfficeRevenueInMillions: 871.5,
      academyAwardNominations: 13,
      academyAwardWins: 4,
      rottenTomatoesScore: 91
    },
    {
      _id: '5cd95395de30eff6ebccde5d',
      name: 'The Return of the King',
      runtimeInMinutes: 201,
      budgetInMillions: 94,
      boxOfficeRevenueInMillions: 1120,
      academyAwardNominations: 11,
      academyAwardWins: 11,
      rottenTomatoesScore: 95
    }
  ],
  total: 8,
  limit: 1000,
  offset: 0,
  page: 1,
  pages: 1
}
```

#### getMovieById
```javascript   
const sdk = require('guy_pavlov-sdk');
const movie = await sdk.getMovieById('5cd99d4bde30eff6ebccde5d');
```
#### getMovieById results
```javascript
{
  docs: [
    {
      _id: '5cd95395de30eff6ebccde5d',
      name: 'The Return of the King',
      runtimeInMinutes: 201,
      budgetInMillions: 94,
      boxOfficeRevenueInMillions: 1120,
      academyAwardNominations: 11,
      academyAwardWins: 11,
      rottenTomatoesScore: 95
    }
  ],
  total: 1,
  limit: 1000,
  offset: 0,
  page: 1,
  pages: 1
}
```


#### getQuotesByMovieId
```javascript
const sdk = require('guy_pavlov-sdk');
const quotes = await sdk.getQuotesByMovieId('5cd99d4bde30eff6ebccde5d');
``` 
#### getQuotesByMovieId results
```javascript
{
  docs: [
    {
      _id: '5cd96e05de30eff6ebcce7e9',
      dialog: 'Deagol!',
      movie: '5cd95395de30eff6ebccde5d',
      character: '5cd99d4bde30eff6ebccfe9e',
      id: '5cd96e05de30eff6ebcce7e9'
    },
        {
      _id: '5cd96e05de30eff6ebcce84b',
      dialog: "Well, I'm back.",
      movie: '5cd95395de30eff6ebccde5d',
      character: '5cd99d4bde30eff6ebccfd0d',
      id: '5cd96e05de30eff6ebcce84b'
    },
    {
      _id: '5cd96e05de30eff6ebcce84c',
      dialog: "I didn't think it would end this way.",
      movie: '5cd95395de30eff6ebccde5d',
      character: '5cd99d4bde30eff6ebccfe2e',
      id: '5cd96e05de30eff6ebcce84c'
    },
    ... 772 more items
  ],
  total: 872,
  limit: 1000,
  offset: 0,
  page: 1,
  pages: 1
}
```
### Using pagination and sorting
The SDK supports pagination and sorting through an optional options parameter. The options parameter is an object with the following properties:
```
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
```

#### Retrieving the second page of 3 movies
```javascript   
const sdk = require('guy_pavlov-sdk');
const options = {
    // Three quotes per page, page 2, quote 1
    pagination: {
      limit: 3,
      page: 2,
      offset: 1
    }
  }
const movies = await sdk.getMovies(options);
```

#### Sorting movies by name in descending order
```javascript
const sdk = require('guy_pavlov-sdk');
const options = {
    sorting: {
      field: 'name',
      direction: 'desc'
    }
  }
const movies = await sdk.getMovies(options);
```

## Test
`npm run test`

## Build
`npm run build`

## Publish
`npm publish`

## Unsupported Features
The filtering feature is not supported by the SDK.