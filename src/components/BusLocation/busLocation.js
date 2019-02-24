import React, { Component } from 'react';
import './busLocation.css';

//import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
//import GoogleMapReact from "google-map-react";

class BusLocation extends Component {

  constructor(props) {
    super(props);

    //default values
    this.state = {
      data: [],
    //   dataRoute: [],
      buses: [],
      isLoading: true,
    //   stopNumber: 573,
    //   routeNumber: 31
    };

    // bind functions
    this.refreshData = this.refreshData.bind(this);

  }


  componentDidMount() {

    //get data
    console.log('get props',this.props.stopid);
    this.refreshData(this.props.stopid);
  
  }

  refreshData(stop = ''){

    //defaults
    var apiLink = "";

    //variables
    apiLink = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid='+ stop +'&format=json';
    //apiLink = '/api/realtimebusinformation.json';

    //set loading 
    this.setState({ isLoading:true });

    
    //get data
    fetch(apiLink)
      .then(response => response.json())
      .then(data => {
        this.setState({ data,buses:data.results,isLoading:false });
        return data;
      })
      .then(data => console.log('get stop data:', data))
  }


  isDue(realdata){
    return this.state.buses.filter( bus => bus.duetime === 'Due').length > 0 ? 'Bus is Here' : '';
  }



  render() {

    //if loading
    if (this.state.isLoading) {
      return <span>Loading ...</span>;
    }

    //return styles
    return (
      <span className="bus-location">
            <span className="info">{this.isDue(this.state.buses)}</span>
      </span>
    );
  }
}

export default BusLocation;
