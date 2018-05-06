// import React, { Component } from "react"
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import './FindPlace';
//
// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: '500px', width: '500px', margin: 'auto' }} />,
//     containerElement: <div style={{ height: '400px', width: '500px', margin: 'auto' }} />,
//     mapElement: <div style={{ height: '500px', width: '500px', margin: 'auto' }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={14}
//     defaultCenter={{ lat: 40.758896, lng: -73.985130 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: 40.758896, lng: -73.985130}} onClick={props.onMarkerClick} />}
//   </GoogleMap>
// );
//
// class MyFancyComponent extends Component {
//   state = {
//     isMarkerShown: false,
//   }
//
//   componentDidMount() {
//     this.delayedShowMarker()
//   }
//
//   delayedShowMarker = () => {
//     setTimeout(() => {
//       this.setState({ isMarkerShown: true })
//     }, 3000)
//   }
//
//   handleMarkerClick = () => {
//     this.setState({ isMarkerShown: false })
//     this.delayedShowMarker()
//   }
//
//   render() {
//     return (
//       <MyMapComponent
//         isMarkerShown={this.state.isMarkerShown}
//         onMarkerClick={this.handleMarkerClick}
//       />
//     )
//   }
// }
//
// export default MyFancyComponent;
