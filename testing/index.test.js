require('dotenv').config();
const { log } = require('console');
const { fail } = require('assert');
const lotrapi = require('../dist/index.js');


test('Retrieves all movies', () => {
  return lotrapi.getMovies().then((movies) => {
      expect(movies).toHaveProperty('docs');
      // log('movies: ', movies);
  }).catch((err) => {
      log('err: ', err);
      fail();
  });
});


test('Retrieves a movie by id', () => {
  const movieId = '5cd95395de30eff6ebccde5d';
  return lotrapi.getMovieById(movieId).then((movie) => {
      expect(movie).toHaveProperty('docs');
      expect(movie.docs[0]).toHaveProperty('name', 'The Return of the King');
      // log(movie);
  }).catch((err) => {
      log('err: ', err);
      fail();
  });
});

test('Retrieves quotes by movie id', () => {
  const movieId = '5cd95395de30eff6ebccde5d';
  return lotrapi.getQuotesByMovieId(movieId).then((quotes) => {
      expect(quotes).toHaveProperty('docs');
      expect(quotes.docs[0]).toHaveProperty('movie', movieId);
      // log(quotes);
  }).catch((err) => {
      log('err: ', err);
      fail();
  });
});

test('Tests pagination options using getQuotesByMovieId', () => {
  const movieId = '5cd95395de30eff6ebccde5d';
  const options = {
    // Three quotes per page, page 2, quote 1
    pagination: {
      limit: 3,
      page: 2,
      offset: 1
    }
  }

  return lotrapi.getQuotesByMovieId(movieId, options).then((quotes) => {
      expect(quotes).toHaveProperty('docs');
      expect(quotes.docs[0]).toHaveProperty('movie', movieId);

      expect(quotes.limit).toBe(options.pagination.limit);
      expect(quotes.offset).toBe(options.pagination.offset);
  }).catch((err) => {
      log('err: ', err);
      fail();
  });
});


test('Tests ASC sorting options using getQuotesByMovieId', () => {
  const movieId = '5cd95395de30eff6ebccde5d';
  const options = {
    // Three quotes per page, page 2, quote 1
    sorting: {
      field: 'dialog',
      direction: 'desc'
    }
  }

  return lotrapi.getQuotesByMovieId(movieId, options).then((quotes) => {
      expect(quotes).toHaveProperty('docs');
      expect(quotes.docs[0]).toHaveProperty('movie', movieId);

      const sortedQuotes = structuredClone(quotes.docs).sort((a, b) => { return a.dialog > b.dialog ? -1 : 1; });

      //Make sure the content is sorted as we requested
      expect(quotes.docs).toEqual(sortedQuotes);
  }).catch((err) => {
      log('err: ', err);
      fail();
  });
});

test('Tests DESC sorting options using getQuotesByMovieId', () => {
  const movieId = '5cd95395de30eff6ebccde5d';
  const options = {
    // Three quotes per page, page 2, quote 1
    sorting: {
      field: 'dialog',
      direction: 'asc'
    }
  }

  return lotrapi.getQuotesByMovieId(movieId, options).then((quotes) => {
      expect(quotes).toHaveProperty('docs');
      expect(quotes.docs[0]).toHaveProperty('movie', movieId);

      const sortedQuotes = structuredClone(quotes.docs).sort((a, b) => { return a.dialog < b.dialog ? -1 : 1; });

      //Make sure the content is sorted as we requested
      expect(quotes.docs).toEqual(sortedQuotes);
  }).catch((err) => {
      log('err: ', err);
      fail();
  });
});