/*global google*/
import React from "react";
import { compose, withProps, withHandlers, withState, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, SearchBox} from "react-google-maps";
import { Route, Link } from 'react-router-dom';
const _ = require("lodash");

import Restaurant from '../Restaurant/Restaurant';
import './map.css';

const MapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: '600px', width: '600px' }} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '600px', width: '600px' }} />,
    }),
    
