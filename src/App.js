import React, { Component } from 'react';
import './App.css';
import './components/app/app.css';

class App extends Component {

  constructor(props) {
    super(props);

    //default values
    this.state = {
      data: [],
      dataRoute: [],
      buses: [],
      isLoading: true,
      stopNumber: 573,
      routeNumber: 31
    };

    // bind functions
    this.refreshData = this.refreshData.bind(this);
    this.changeStop = this.changeStop.bind(this);
    this.enterStop = this.enterStop.bind(this);
 
    this.refreshRouteData = this.refreshRouteData.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
    this.enterRoute = this.enterRoute.bind(this);

  }


  componentDidMount() {

    //get data
    this.refreshData();
    this.refreshRouteData();
  }

  refreshData(stop = ''){

    //defaults
    var apiLink = "";
    stop = this.state.stopNumber;

    //variables
    apiLink = 'https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid='+ stop +'&format=json';
    //apiLink = '/api/realtimebusinformation.json';

    //set loading 
    this.setState({ isLoading:true });

    
    //get data
    fetch(apiLink)
      .then(response => response.json())
      .then(data => this.setState({ data,buses:data.results,isLoading:false }));

  }

  refreshRouteData(route = ''){

    //defaults
    var apiLink = "";
    route = this.state.routeNumber;

    //variables
    apiLink = 'https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid='+ route +'&format=json';
    apiLink = '/api/routeinformation.json';

    //set loading 
    this.setState({ isLoading:true });

    
    //get data
    fetch(apiLink)
      .then(response => response.json())
      .then(dataRoute => this.setState({ dataRoute,isLoading:false }));

  }


  changeStop(event){

     //set loading 
     this.setState({ stopNumber:event.target.value, });

  }

  changeRoute(event){

     //set loading 
     this.setState({ routeNumber:event.target.value, });

  }

  enterStop(event){

    //get data
    if (event.key === 'Enter') {
      this.refreshData();
    }
  }

  enterRoute(event){

    //get data
    if (event.key === 'Enter') {
      this.refreshRouteData();
    }
  }

  initMap(){

  }


  render() {

    //if loading
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }

    //return styles
    return (
      <div className="App">

        <div className="panel">
        <h1>Stop details:</h1>
        <div>Stop Number: <input type="text" value={this.state.stopNumber} onChange={this.changeStop} onKeyPress={this.enterStop} /></div>
        <div onClick={this.refreshData}>Refresh</div>
          <div>Get Data:</div>
          <div>Results:{this.state.data.numberofresults}</div>
          <div>Stop Number:{this.state.data.stopid}</div>
          <div>Buses:</div>
          {this.state.buses.map(bus =>
            <div key={bus.route + bus.duetime}>
              <div>Route:{bus.route} - {bus.destination} - time:{bus.duetime}</div>
            <hr />
            </div>
          )}
        </div>



        <div className="panel">
        <h1>Route details:</h1>
        <div>Route Number: <input type="text" value={this.state.routeNumber} onChange={this.changeRoute} onKeyPress={this.enterRoute} /></div>
        Stops:
        {this.state.dataRoute.results.map(bus =>
            <div key={bus.destination}>
              <div>Route:{bus.route} - {bus.destination} - time:{bus.duetime}</div>
            <hr />
            </div>
          )}

      <div id="map"></div>

          
        </div>


      </div>
    );
  }
}

export default App;
