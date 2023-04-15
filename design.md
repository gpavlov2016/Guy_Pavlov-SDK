# SDK Design

## Authentication
The API requires authentication using an access token that can be obtained by registering at https://the-one-api.dev/. The access token should be set as an environment variable named API_ACCESS_TOKEN. The SDK references the process.env object to get the access token.
The access token is passed as a header to the API using the axios library as follows:
```javascript
{headers: {'Authorization': `Bearer ${process.env.API_ACCESS_TOKEN}`}}
```

## Pagination and Sorting
The API supports pagination and sorting. The SDK uses an optional options object to pass pagination and sorting options to the API. The options object is converted to a string of query parameters and appended to the API URL as follows:
```javascript
//Options object
const options = {
    // Three quotes per page, page 2, quote 1
    pagination: {
      limit: 3,
      page: 2,
      offset: 1
    }
  }
//Resulting query string
?limit=3&page=2&offset=1
```

## Error Handling
All methods return a promise. If the API returns an error, the promise is rejected with an error message. If the API returns a successful response, the promise is resolved with the response data.

## Logging
The SDK supports logging query strings but is disabled by default. To enable logging, set the environment variable ENABLE_LOGGING to true. The SDK references the process.env object to get the logging value.
```javascript
ENABLE_LOGGING="true"
```
