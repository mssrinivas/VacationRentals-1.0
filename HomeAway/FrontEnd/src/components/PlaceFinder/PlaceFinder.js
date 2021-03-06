import React from 'react';
import DatePicker from 'react-datepicker';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
//import DatePicker from 'material-ui/DatePicker'
import ActionHome from 'material-ui/svg-icons/action/home';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
//import NavBar from '../NavBar/NavBar';
import TravelHistory from '../TripsBoard/TravelHistory';
import {Redirect} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import './PlaceFinder.css'
import { DateTimePicker } from 'react-widgets'
import Navigation from '../Navigation/Navigation';
import BackgroundImage from 'react-background-image-loader';
import Image from './BackgroundPic.jpg'; // Import using relative path
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import cookie from 'react-cookies'


class PlaceFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : props.value,
      placename: '',
      startdate: moment(),
      enddate: moment(),
      adultlist: 0,
      childlist: 0,
      validInput : false,
      trips : [],
      changepage : false,
      errors : false
    }
  }

  onPlaceChange = (event) => {
    this.setState({placename: event.target.value})
  }

  onStartDateChange = (event) => {
    this.setState({startdate: event.target.value})
  }


  onEndDateChange = (event) => {
    this.setState({enddate: event.target.value})
  }

  onAdultListChange = (event) => {
    this.setState({adultlist: event.target.value})
  }

   onChildListChange = (event) => {
    this.setState({childlist: event.target.value})
  }

  componentWillMount(){
      console.log("this is" + this.state.name)
      console.log(this.props.value)
  }

  componentDidMount()
  {
  
  }

  onSubmit = () => {
    fetch('http://localhost:4004/places', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        placename: this.state.placename,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        adultlist: this.state.adultlist,
        childlist: this.state.childlist
      })
    })
    .then(response => response.json())
    .then(places => {
      console.log(places)
      this.setState({trips : places})
      if(this.state.trips.length == 0)
      {
        this.setState({errors : true})
      }
      else
      {
        this.setState({errors : false})
      }
    })
    //.then(place => this.setState({trips : place}))
  }
  render()
  {
     //let AddTag = null;
     let Redirecty = null;
     let No_Place = null;
     if(cookie.load('cookie'))
      {
        if(Object.keys(this.state.trips).length > 0)
        {
        // AddTag = <TravelHistory trips={this.state.trips} />
         Redirecty = <Redirect to="/home/places" />
        }
      }
      else
      {
        Redirecty = <Redirect to="/login" />
      }
      if(this.state.errors === true)
      {
        No_Place = "No Places found, Please select a different Criteria"
        alert(No_Place)
        this.setState({errors : false})
      }

    return (
          <div class="backgroundcontainer" >
          <img class="bg" src='https://greenvalleyranch.sclv.com/~/media/Images/Page-Background-Images/GVR/Hotel/GV_Hotel_Exterior4Pool-2012.jpg?h=630&la=en&w=1080'/>
      {Redirecty}

      <Navigation value={this.props.value} />
      <div class="centering row centered">
                              <div class="info-form">
                                  <form action="" class="form-inline justify-content-center">
                                      <div class="form-group">
                                          <input type="text" class="form-control form-control-lg roundy" placeholder="City" onChange = {this.onPlaceChange}/>
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="date" class="form-control form-control-lg roundy"
                              onChange={this.onStartDateChange}
                                       /> 
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="date" class="form-control form-control-lg roundy"
                              onChange={this.onEndDateChange}
                                           />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="text" class="reduce form-control form-control-lg roundy" placeholder="Adults" onChange = {this.onAdultListChange} />
                                          <input type="text" class="reduce form-control form-control-lg roundy" placeholder="Children" onChange = {this.onChildListChange} />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <button type="button" class="bluebutton btn btn-primary btn-lg roundy" onClick = {this.onSubmit}>Search</button>
                                  </form>
                              </div>
                        <br />  
           </div>
</div>


    )
  }
}
export default PlaceFinder;

/*
 //let AddTag = null;
     let Redirecty = null;
    if(Object.keys(this.state.trips).length > 0)
    {
    // AddTag = <TravelHistory trips={this.state.trips} />
     Redirecty = <Redirect to="/home/places" />
    }
    return (
          <div class="centering">
      {Redirecty}
      <div class="centering row">
          <section id="cover">
              <div id="cover-caption">
                  <div id="container" class="container">
                      <div class="row text-white">
                          <div class="col-sm-10 offset-sm-1 text-center">
                              <h1 class="display-3"></h1>
                              <div class="info-form">
                                  <form action="" class="form-inline justify-content-center">
                                      <div class="form-group">
                                          <label class="sr-only">Name</label>
                                          <input type="text" class="form-control form-control-lg" placeholder="" onChange = {this.onPlaceChange}/>
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <DatePicker class="form-control form-control-lg"
                              selected={this.state.startdate}
                              onChange={this.handleStartDateChange}
                                       />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <DatePicker class="form-control"  width="500"
                              selected={this.state.startdate}
                              onChange={this.handleStartDateChange}
                                           />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <label class="sr-only">Guest List</label>
                                          <input type="text" class="form-control form-control-lg" placeholder="" onChange = {this.onGuestListChange} />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <button type="button" class="btn btn-primary btn-lg" onClick = {this.onSubmit}>Search</button>
                                  </form>
                              </div>
                              <br />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </div>
</div>


*/