"use strict";
//handles all events and mixins
//passes events to components
var React = require('react');
var Router = require('react-router'); //for the mixin for redirecting
var AuthorForm = require('./authorForm');
// var AuthorApi = require('../../api/authorApi'); //for passing saveAuthor function
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
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
        author: {
          firstName: "",
          middleName: "",
          lastName: ""
        },
        errors: {},
        dirty: false
    };
  },
  componentWillMount: function(){
    var authorId = this.props.params.id;
    if (authorId){
      this.setState({author: AuthorStore.getAuthorById(authorId)});
    }
  },
  setAuthorState: function(event){
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    this.setState({
      author: this.state.author
    });
  },
  authorFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {};

    if (this.state.author.firstName.length < 3) {
      formIsValid = false;
      this.state.errors.firstName = 'First name must be longer than 2 letters';
    }
    if (this.state.author.middleName.length < 3) {
      formIsValid = false;
      this.state.errors.middleName = 'Middle name must be longer than 2 letters';
    }
    if (this.state.author.lastName.length < 3) {
      formIsValid = false;
      this.state.errors.lastName = 'Last name must be longer than 2 letters';
    }

    this.setState({
      errors: this.state.errors
    });

    return formIsValid;
  },
  onSave: function(event){
    event.preventDefault();

    if (!this.authorFormIsValid()){
      return;
    }

    if (this.state.author.id){
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }

    this.setState({dirty: false});
    this.transitionTo('authors'); //from mixin
    toastr.success('Save Successful!');
  },
  render: function(){
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        onSave={this.onSave}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageAuthorPage;