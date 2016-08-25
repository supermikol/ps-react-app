"use strict";
var React = require('react');

var About = React.createClass({
  statics: {
    willTransitionTo: function(transition, params, query, callback){
      if (!confirm('Are you sure you want to visit this page?')){
        transition.abort();
      } else {
        callback();
      }
    },
    willTransitionFrom: function(transition, component){
      if (!confirm('Are you sure you want to leave this page?')){
        transition.abort();
      }
    }
  },
  render: function(){
    return (
      <div className="jumbotron">
        <ul>
          <li>ABC</li>
          <li>DEF</li>
          <li>GHI</li>
          <li>JKL</li>
        </ul>
      </div>
      );
  }
});

module.exports = About;