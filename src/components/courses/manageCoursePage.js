"use strict";
//handles all events and mixins
//passes events to components
var React = require('react');
var Router = require('react-router'); //for the mixin for redirecting
var CourseForm = require('./courseForm');
// var CourseApi = require('../../api/courseApi'); //for passing saveCourse function
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation //for transitionTo function (redirecting)
  ],
  statics: {
    willTransitionFrom: function(transition, component){
      if (component.state.dirty && !confirm('Abandon existing work?')) {
        transition.abort();
      }
    }
  },
  getInitialState: function(){
    return {
        course: {
          title: "",
          watchHref: "",
          author: {
            id: "",
            name: ""
          },
          length: "",
          category: ""
        },
        errors: {},
        dirty: false,
        authors: {}
    };
  },
  componentWillMount: function(){
    var courseId = this.props.params.id;
    if (courseId){
      this.setState({course: CourseStore.getCourseById(courseId)});
    }
    this.setState({authors: AuthorStore.getAllAuthors()});
  },
  setCourseState: function(event){
    var field = event.target.name;
    var value = event.target.value;
    this.setState({dirty: true});
    var setValue;
    if (field === 'author'){
      var retrievedAuthor = AuthorStore.getAuthorById(value);
      var authorName = '';
      if (value !== '') {
        authorName = retrievedAuthor.firstName + ' ' + retrievedAuthor.lastName;
      }
      setValue = {
        id: value,
        name: authorName
      };
    } else {
      setValue = value;
    }
    this.state.course[field] = setValue;
    this.setState({
      course: this.state.course
    });
  },
  courseFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {};

    if (this.state.course.title.length < 3) {
      formIsValid = false;
      this.state.errors.title = 'Title must be longer than 2 letters';
    }
    if (this.state.course.watchHref.length < 3) {
      formIsValid = false;
      this.state.errors.watchHref = 'URL must be longer than 2 letters';
    }
    if (this.state.course.category.length < 3) {
      formIsValid = false;
      this.state.errors.category = 'Category must be longer than 2 letters';
    }

    this.setState({
      errors: this.state.errors
    });

    return formIsValid;
  },
  onSave: function(event){
    event.preventDefault();

    if (!this.courseFormIsValid()){
      return;
    }

    if (this.state.course.id){
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false});
    this.transitionTo('courses'); //from mixin
    toastr.success('Save Successful!');
  },
  render: function(){
    return (
      <CourseForm
        course={this.state.course}
        authors={this.state.authors}
        onChange={this.setCourseState}
        onSave={this.onSave}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageCoursePage;