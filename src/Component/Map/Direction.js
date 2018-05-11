import React from 'react';
import Geocode from 'react-geocode';
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");


const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBPPGOq8mrh_7i1PoC0JutKxr52fGMlPPw&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '400px', width: '100%' }} />,
containerElement: <div style={{ height: '400px' }} />,
mapElement: <div style={{ height: '400px', width: '100%'}} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount(props) {
        const DirectionsService = new window.google.maps.DirectionsService();
        let lat = parseFloat(this.props.originLat);
        let lng = parseFloat(this.props.originLng);
        let originlatlng = { lat , lng }
        console.log(lat, lng);

        Geocode.fromAddress(this.props.address).then(
             response => {
               const { lat, lng } = response.results[0].geometry.location;
               console.log(lat, lng);
               DirectionsService.route({
                 origin: new window.google.maps.LatLng( originlatlng ),
                 destination: new window.google.maps.LatLng({lat,lng}),
                 travelMode: window.google.maps.TravelMode.DRIVING,
               }, (result, status) => {
                 if (status === window.google.maps.DirectionsStatus.OK) {
                   this.setState({
                     directions: result,
                   });
                 } else {
                   console.error(`error fetching directions ${result}`);
                 }
               });
             },
             error => {
               console.error(error);
             }
        );
    }
  })
)(props =>
    <div>
      <GoogleMap
        defaultZoom={13}
        defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
  </div>
);

<MapWithADirectionsRenderer />
export default MapWithADirectionsRenderer;
