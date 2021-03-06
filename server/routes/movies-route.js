(function(){
  'use strict';

  var express = require('express');
  var moviesRouter = express.Router();
  var moviesDB = require('../../models/database');
  var bunyan = require('bunyan');
  var logger = bunyan.createLogger({name:'movie-route'});
  var database = require('../../models/database');

  moviesRouter.get('/query', function(req, res) {

    logger.info('call to fetch the filtered movies');

    database.moviesFilter(req.query)
        .then(function(rows){
          res.status(200).json({movies: rows});
        })
        .catch(function(err){
          res.status(500).json({error: err});
        });
  });

  moviesRouter.get('/count', function(req, res){

    moviesDB.movieCount()
        .then(function(count){
          res.status(200).json({count:count})

        })
        .catch(function(err){
          logger.error({error: err});
          res.status(500).json({error: "Unable to fetch movie count"})
        })
  });

  moviesRouter.get('/topRated100', function(req, res){

    moviesDB.topRatedN(100, req.query)
        .then(function(rows){
          res.status(200).json({movies: rows});
        })
        .catch(function(err){
          logger.error({error: err});
          res.status(500).json({error: 'Unable to fetch top rated 100 movies'});
        })
  });

  module.exports = moviesRouter;
})();