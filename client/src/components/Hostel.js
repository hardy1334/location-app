import React, { Component } from "react";

import Map from "./Map";

class Hostel extends Component {
  render() {
    return (
      <div className="create-hostel pt-5">
        <div className="w-50 container">
          <Map
            google={this.props.google}
            center={{
              lat: 31.326015,
              lng: 75.57618
            }}
            height="300px"
            zoom={15}
          />
        </div>
      </div>
    );
  }
}

export default Hostel;
