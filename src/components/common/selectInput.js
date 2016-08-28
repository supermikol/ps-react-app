"use strict";

var React = require('react');

var SelectInput = React.createClass({
  // propTypes: {
  //   name: React.PropTypes.string.isRequired,
  //   label: React.PropTypes.string.isRequired,
  //   onChange: React.PropTypes.func.isRequired,
  //   placeholder: React.PropTypes.string,
  //   value: React.PropTypes.string,
  //   error: React.PropTypes.string
  // },
  render: function(){
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }
    var createAuthorFormRow = function(author){
      return (
        <option key={author.id} value={author.id} >
          {author.firstName} {author.lastName}
        </option>
      );
    };
    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <select
            name={this.props.name}
            className="form-control"
            ref={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange} >
            <option value=''>Select...</option>
            {this.props.authors.map(createAuthorFormRow)}
          </select>
          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = SelectInput;