"use strict";

var React = require('react');
var Input = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },
  render: function(){
    return (
      <form>
        <h1>Manage Course Form</h1>
        <Input
           name="title"
           label="Title"
           value={this.props.course.title}
           onChange={this.props.onChange}
           error={this.props.errors.title}/>
        <Input
           name="watchHref"
           label="Tutorial URL"
           value={this.props.course.watchHref}
           onChange={this.props.onChange}
           error={this.props.errors.watchHref}/>
        <SelectInput
           name="author"
           label="Author Name"
           value={this.props.course.author.id}
           authors={this.props.authors}
           onChange={this.props.onChange} />
        <Input
           name="category"
           label="Category"
           value={this.props.course.category}
           onChange={this.props.onChange}
           error={this.props.errors.category}/>
        <br />

        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
        <h3>{this.props.course.firstName} {this.props.course.middleName} {this.props.course.lastName}</h3>
      </form>
    );
  }
});

module.exports = CourseForm;