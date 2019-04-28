import React, {Component} from 'react';
import axios from 'axios';

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
import {Link} from 'react-router-dom';

Geocode.setApiKey ('AIzaSyDrEuHN113vHw6DMOymUYyWlVU6EXx_MBE');
Geocode.enableDebug ();

class Map extends Component {
  constructor (props) {
    super (props);
    this.state = {
      address: '',
      city: '',
      area: '',
      hostel: '',
      land1: '',
      land2: '',
      info: '',
      redirect: false,
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }

  // Get the current address from the default map position and set those values in the state

  componentDidMount () {
    Geocode.fromLatLng (
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then (
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity (addressArray),
          area = this.getArea (addressArray),
          state = this.getState (addressArray);

        this.setState ({
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
        });
      },
      error => {
        console.error (error);
      }
    );
  }

  // Component should only update ( meaning re-render ), when the user selects the address, or drags the marker

  shouldComponentUpdate (nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }

  // Get the city and set the city input value to the one selected

  getCity = addressArray => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        'administrative_area_level_2' === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  // Get the area and set the area input value to the one selected

  getArea = addressArray => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            'sublocality_level_1' === addressArray[i].types[j] ||
            'locality' === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  // Get the address and set the address input value to the one selected

  getState = addressArray => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          'administrative_area_level_1' === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  // And function for city,state and address input

  onChange = event => {
    this.setState ({[event.target.name]: event.target.value});
  };

  // This Event triggers when the marker window is closed

  onInfoWindowClose = event => {};

  // When the user types an address in the search box

  onPlaceSelected = place => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity (addressArray),
      area = this.getArea (addressArray),
      state = this.getState (addressArray),
      latValue = place.geometry.location.lat (),
      lngValue = place.geometry.location.lng ();
    // Set these values in the state.
    this.setState ({
      address: address ? address : '',
      area: area ? area : '',
      city: city ? city : '',
      state: state ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  // When the marker is dragged you get the lat and long using the functions available from event object.
  // Use geocode to get the address, city, area and state from the lat and lng positions.
  // And then set those values in the state.

  onMarkerDragEnd = event => {
    console.log ('event', event);
    let newLat = event.latLng.lat (),
      newLng = event.latLng.lng (),
      addressArray = [];
    Geocode.fromLatLng (newLat, newLng).then (
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity (addressArray),
          area = this.getArea (addressArray),
          state = this.getState (addressArray);
        this.setState ({
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
        });
      },
      error => {
        console.error (error);
      }
    );
  };

  onSubmit = e => {
    e.preventDefault ();
    const pgAndHostel = {
      hostel: this.state.hostel,
      address: this.state.address,
      city: this.state.city,
      area: this.state.area,
      info: this.state.info,
      land1: this.state.land1,
      land2: this.state.land2,
    };

    axios
      .post ('/api/admin/register', pgAndHostel)
      .then (res => {
        alert ('New Hostel added Successfully');
        this.setState ({
          redirect: true,
        });
        this.props.history.push ('/hostels');
      })
      .catch (err => {
        console.log (err);
      });
  };
  render () {
    const AsyncMap = withScriptjs (
      withGoogleMap (props => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              width: '100%',
              height: '40px',
              paddingLeft: '16px',
              marginTop: '2px',
              marginBottom: '100px',
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={['(regions)']}
            placeholder="Search the Hostel Location"
          />

          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={'Dolores park'}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
          {/* InfoWindow on top of marker */}
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{padding: 0, margin: 0}}>{this.state.address}</span>
            </div>
          </InfoWindow>
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <center><h1>Create a Hostel</h1></center>
          <div>
            <form onSubmit={this.onSubmit} redirect="/hostels">
              <div className="form-group">
                <label htmlFor="">Hostel Name</label>
                <input
                  type="text"
                  name="hostel"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>

              <AsyncMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrEuHN113vHw6DMOymUYyWlVU6EXx_MBE&libraries=places"
                loadingElement={<div style={{height: `100%`}} />}
                containerElement={<div style={{height: this.props.height}} />}
                mapElement={<div style={{height: `100%`}} />}
              />
              <br /><br />
              <div className="form-group">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.city}
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Locality</label>
                <input
                  type="text"
                  name="area"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.area}
                  required={true}
                />
              </div>

              <div className="form-group">
                <label htmlFor="">Location</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  onChange={this.onChange}
                  value={this.state.address}
                  required={true}
                />
              </div>
              <div className="row">
                <div className="col-md-6 col-xl-6 col-lg-6">
                  <div className="form-group">
                    <label>Landmark 1</label>
                    <input
                      type="text"
                      className="form-control"
                      name="land1"
                      placeholder="Enter a Landmark"
                      value={this.state.landmark1}
                      required={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-xl-6 col-lg-6">
                  <div className="form-group">
                    <label>Landmark 2</label>
                    <input
                      type="text"
                      className="form-control"
                      name="land2"
                      placeholder="Enter new Landmark"
                      value={this.state.landmark2}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group pl-3">
                  <label>
                    Enter some description about Hostel
                  </label>
                  <textarea
                    className="form-control"
                    name="info"
                    rows="3"
                    cols="70"
                    placeholder="Enter some information about the Hostel"
                    value={this.state.description}
                    onChange={this.onChange}
                    required={true}
                  />
                </div>
              </div>

              <input
                type="submit"
                className="btn btn-success col-md-6 "
                value="Publish"
              />

              <br />

              <Link
                to="/hostels"
                className="btn btn-info col-md-6 col-xl-6 col-lg-6 mt-3"
              >
                Hostels
              </Link>

            </form>
          </div>

        </div>
      );
    } else {
      map = <div style={{height: this.props.height}} />;
    }
    return map;
  }
}

export default Map;
