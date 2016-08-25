"use strict";

var React = require('react');
var Input = require('../common/textInput');

var AuthorForm = React.createClass({
  propTypes: {
    author: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },
  render: function(){
    return (
      <form>
        <h1>Manage Author Form</h1>
        <Input
           name="firstName"
           label="First Name"
           value={this.props.author.firstName}
           onChange={this.props.onChange}
           error={this.props.errors.firstName}/>
        <Input
           name="middleName"
           label="Middle Name"
           value={this.props.author.middleName}
           onChange={this.props.onChange}
           error={this.props.errors.middleName}/>
        <Input
           name="lastName"
           label="Last Name"
           value={this.props.author.lastName}
           onChange={this.props.onChange}
           error={this.props.errors.lastName}/>
        <label htmlFor="lastName">Last Name</label>
        <br />

        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
        <h3>{this.props.author.firstName} {this.props.author.middleName} {this.props.author.lastName}</h3>
      </form>
    );
  }
});

module.exports = AuthorForm;