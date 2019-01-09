import React from 'react';
import TravelHistory from './TravelHistory.js'
import NavBar from '../NavBar/NavBar';
import Navigation from '../Navigation/Navigation';
import './tripsboard.css'
import SearchBar from '../SearchBar/SearchBar';
import cookie from 'react-cookies';
import {Redirect} from  'react-router';

var len2 = 0;

class TripsBoard extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      latesttrips: [],
      NoPlacestoShow : true
    };
  }
  componentDidMount() {
     var url = 'http://localhost:4004/tripsboard/' + localStorage.getItem("usernamey")
    fetch(url, {
      method: 'get',
      credentials : 'include'
    })
    .then(response => response.json())
    .then(places => {
      console.log(places)
      len2 = places.length
      console.log("Length is " + len2)
    if(len2)
    {
         this.setState({latesttrips : places});
         this.setState({NoPlacestoShow : false})
    }
    else
    {
      this.setState({NoPlacestoShow : true})
      this.setState({redirecty: false})
    } 
  })
  }
  render() {
    let NoPlaces = null;
    let Redirect_to_Home = null;
    if(cookie.load('cookie'))
    {
     if(this.state.NoPlacestoShow === true)
      {
          NoPlaces = (<p class="blueerror errorcenter"><h3>You currently do not have any bookings! Try out our service</h3></p> )
      }
    }
    else
    {
        Redirect_to_Home = (<Redirect to="/login" />)
    }
    return (
        <div>
        {Redirect_to_Home}
        <br />
         <hr />
         <div class="headingtrips">
            <h1> Trip Boards </h1>
            <h4> Trip Boards help you keep track of the places you love.</h4> 
        </div>
        {NoPlaces}
         <TravelHistory trips={this.state.latesttrips} />
         </div>
        );

  }
}

export default TripsBoard;