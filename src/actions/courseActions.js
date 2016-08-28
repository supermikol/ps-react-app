"use strict";

var CourseApi = require('../api/courseApi');
var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
  createCourse: function(course){
    var newCourse = CourseApi.saveCourse(course); //handles API call here

    //then, remind Dispatcher to update stores with change
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_COURSE,
      course: newCourse
    });
  },
  updateCourse: function(course){
    var existingCourse = CourseApi.saveCourse(course); //handles API call here

    //then, remind Dispatcher to update stores with change
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_COURSE,
      course: existingCourse
    });
  },
  deleteCourse: function(id){
    CourseApi.deleteCourse(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_COURSE,
      id: id
    });
  }

};

module.exports = CourseActions;