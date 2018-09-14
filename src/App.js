import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    //default values
    this.state = {
      data: [],
      buses: [],
      isLoading: true,
      stopNumber: 573
    };

    // bind functions
    this.refreshData = this.refreshData.bind(this);
    this.changeStop = this.changeStop.bind(this);
    this.enterStop = this.enterStop.bind(this);

  }


  componentDidMount() {

    //get data
    this.refreshData();
  }

  refreshData(stop = ''){

    //set loading 
    this.setState({ isLoading:true });

    //defaults
    stop = this.state.stopNumber;
    
    //get data
    fetch('https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid='+ stop +'&format=json')
      .then(response => response.json())
      .then(data => this.setState({ data,buses:data.results,isLoading:false }));
  }

  changeStop(event){

     //set loading 
     this.setState({ stopNumber:event.target.value, });

  }

  enterStop(event){

    //get data
    if (event.key === 'Enter') {
      this.refreshData();
    }
  }


  render() {

    //if loading
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }

    //return styles
    return (
      <div className="App">
        <div>
        <div>Stop Number: <input type="text" value={this.state.stopNumber} onChange={this.changeStop} onKeyPress={this.enterStop} /></div>
        <div onClick={this.refreshData}>Refresh</div>
          <div>Get Data:</div>
          <div>Results:{this.state.data.numberofresults}</div>
          <div>Stop Number:{this.state.data.stopid}</div>
          <div>Buses:</div>
          {this.state.buses.map(bus =>
            <div>
              <div>Route:{bus.route} - time:{bus.duetime}</div>
            <hr />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
