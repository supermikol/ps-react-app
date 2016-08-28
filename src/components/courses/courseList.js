"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CourseList = React.createClass({
  propTypes: {
    courses: React.PropTypes.array.isRequired
  },
  deleteCourse: function(id, event){
    event.preventDefault();
    CourseActions.deleteCourse(id);
    toastr.success('Deleted Course!');
  },
  render: function(){
    var self = this;
    var createCourseRow = function(course){
      return (
        <tr key={course.id}>
          <td><a href="#" onClick={self.deleteCourse.bind(self, course.id)}>Delete</a></td>
          <td><Link to="manageCourse" params={{id: course.id}}>{course.id}</Link></td>
          <td><a href={course.watchHref}>{course.title}</a></td>
          <td>{course.author.name}</td>
          <td>{course.category}</td>
          <td>{course.length}</td>
          <td>{course.watchHref}</td>
        </tr>
      );
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Length</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {this.props.courses.map(createCourseRow)}
        </tbody>
      </table>
    );
  }
});

module.exports = CourseList;