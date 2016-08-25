"use strict";

var AuthorApi = require('../api/authorApi');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createAuthor: function(author){
    var newAuthor = AuthorApi.saveAuthor(author); //handles API call here

    //then, remind Dispatcher to update stores with change
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: newAuthor
    });
  },
  updateAuthor: function(author){
    var existingAuthor = AuthorApi.saveAuthor(author); //handles API call here

    //then, remind Dispatcher to update stores with change
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: existingAuthor
    });
  },
  deleteAuthor: function(id){
    AuthorApi.deleteAuthor(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }

};

module.exports = AuthorActions;