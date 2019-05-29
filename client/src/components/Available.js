import React, { Component } from "react";

import axios from "axios";

class Available extends Component {
  constructor() {
    super();
    this.state = {
      details: [{}]
    };
  }

  componentDidMount() {
    axios
      .get("/api/admin")
      .then(data => data)
      .then(data => {
        this.setState({
          details: data.data
        });
      });
  }

  render() {
    return (
      <div>
        <h1 className="available pt-4">Available Hostels</h1>
        <b>
          {this.state.details.map(data => {
            return (
              <div>
                <center className="pt-5">
                  <div className="card w-50 xs-w-75">
                    <div className="card-body card-details">
                      <div className="row">
                        <h3 className="card-title hostel-title">
                          {data.hostel}
                        </h3>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-xl-6 col-lg-6">
                          <span className="row">
                            <h5>City:</h5>
                            <p className="descr">{data.city}</p>
                          </span>
                        </div>
                        <div className="col-md-6 col-xl-6 col-lg-6">
                          <span className="row">
                            <h5>Locality:</h5>
                            <p className="descr">{data.area}</p>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-xl-6 col-lg-6">
                          <span className="row">
                            <h5>Landmark 1:</h5>
                            <p className="descr">{data.land1}</p>
                          </span>
                        </div>
                        <div className="col-md-6 col-xl-6 col-lg-6">
                          <span className="row">
                            <h5>Landmark 2:</h5>
                            <p className="descr">{data.land2}</p>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <h5 className="address">Address</h5>
                        <p className="descr">{data.address}</p>
                      </div>
                      <div className="row">
                        <h5 className="address">Description</h5>

                        <p className="descr">{data.info}</p>
                      </div>
                    </div>
                  </div>
                </center>
              </div>
            );
          })}
        </b>
      </div>
    );
  }
}

export default Available;
