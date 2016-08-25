"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass({
  propTypes: {
    authors: React.PropTypes.array.isRequired
  },
  deleteAuthor: function(id, event){
    event.preventDefault();
    AuthorActions.deleteAuthor(id);
    toastr.success('Deleted Author!');
  },
  render: function(){
    var self = this;
    var createAuthorRow = function(author){
      return (
        <tr key={author.id}>
          <td><a href="#" onClick={self.deleteAuthor.bind(self, author.id)}>Delete</a></td>
          <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
          <td>{author.firstName} {author.lastName}</td>
        </tr>
      );
    };

    return (
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.props.authors.map(createAuthorRow)}
        </tbody>
      </table>
    );
  }
});

module.exports = AuthorList;