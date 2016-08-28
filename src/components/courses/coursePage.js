"use strict";
//for setting up all the components relevant to the information, connecting to API/database for information, and updating state with that information
var React = require('react');
var CourseList = require('./courseList'); //component for displaying Course List information; Does not contain the actual data
var CourseStore = require('../../stores/courseStore');
var Router = require('react-router');
var Link = require('react-router').Link;

var CoursePage = React.createClass({
  getInitialState: function(){
    return ({
      courses: CourseStore.getAllCourses()
    });
  },
  componentWillMount: function(){
    CourseStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    CourseStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({courses: CourseStore.getAllCourses()});
  },
  render: function(){
    return (
      <div>
        <h2>Courses</h2>
        <Link to="addCourse" className="btn btn-default">Add Course</Link>
        <CourseList courses={this.state.courses} />
      </div>
    );
  }
});

module.exports = CoursePage;