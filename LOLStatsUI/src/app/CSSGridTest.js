import React, { Component } from "react";
import "./CSSGridTest.css";

export default class CSSGridTest extends Component {
  render() {
    return (
      <div className="appWrap">
        <div className="header">Header TESTING</div>
        <div className="leftnav">Left Nav</div>
        <div className="body">Body</div>
        <div className="rightnav">Right Nav</div>
        <div className="footer">Footer</div>
      </div>
    );
  }
}
