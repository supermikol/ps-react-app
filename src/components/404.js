"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NotFoundPage = React.createClass({
  render: function(){
    return (
        <div>
          <h2>Page not found</h2>
          <p>Whoops, page is not found!</p>
          <p><Link to="app">Return to Home</Link></p>
        </div>
      );
  }
});

module.exports = NotFoundPage;