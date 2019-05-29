import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  render() {
    let create = (
      <nav className="navbar navbar-expand-lg navbar-light  new-nav">
        <Link
          className="navbar-brand brand"
          to="/"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Toggle to Create Hostel"
        >
          Create
        </Link>
      </nav>
    );

    let hostels = (
      <nav className="navbar navbar-expand-lg navbar-light ">
        <Link
          className="navbar-brand brand"
          to="/hostels"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Toggle to view hostels"
        >
          Hostels
        </Link>
      </nav>
    );

    return <div>{this.props.location.pathname === "/" ? hostels : create}</div>;
  }
}

export default withRouter(Navbar);
