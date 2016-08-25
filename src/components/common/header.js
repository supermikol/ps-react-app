"use strict";
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
  render: function(){
    return (
      <nav className="navbar navbar-default">
      <div className="container">
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="app">Home</Link></li>
            <li><Link to="about">About</Link></li>
            <li><Link to="authors">Authors</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
      );
  }
});

module.exports = Header;