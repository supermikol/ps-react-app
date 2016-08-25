"use strict";
//for setting up all the components relevant to the information, connecting to API/database for information, and updating state with that information
var React = require('react');
// var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList'); //component for displaying Author List information; Does not contain the actual data
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var Link = require('react-router').Link;

var AuthorPage = React.createClass({
  getInitialState: function(){
    return ({
      authors: AuthorStore.getAllAuthors()
    });
  },
  //Good spot for interacting with third party APIs and libaries. Also a good spot for setting timers and making Ajax calls
  // componentDidMount: function(){
  //   if (this.isMounted()){
  //     this.setState({
  //       authors: AuthorApi.getAllAuthors()
  //     });
  //   }
  // },
  componentWillMount: function(){
    AuthorStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    AuthorStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({authors: AuthorStore.getAllAuthors()});
  },
  render: function(){
    return (
      <div>
        <h2>Authors</h2>
        <Link to="addAuthor" className="btn btn-default">Add Author</Link>
        <AuthorList authors={this.state.authors} />
      </div>
    );
  }
});

module.exports = AuthorPage;