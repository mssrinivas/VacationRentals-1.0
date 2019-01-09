import React from 'react';
import TravelHistory from '../TripsBoard/TravelHistory'
import PlaceFinder from '../PlaceFinder/PlaceFinder'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchBar.css'
import {Redirect} from 'react-router-dom';
import Places from '../Places/Places';
import cookie from 'react-cookies'

var len0 = 0;
var len1 = 0;
var len2 = 0;

class SearchBar extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      placename: '',
      startdate: 0,
      enddate: 0,
      adultlist: 0,
      childlist: 0,
      placeslist: [],
      redirecty: false
    };
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

  onSubmit = () => {
    fetch('http://localhost:4004/places', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        placename: this.state.placename,
        startdate: this.state.startdate,
        enddate: this.state.enddate,
        adultlist: this.state.adultlist,
        childlist: this.state.childlist,
        NoPlacestoShow : false
      })
    })
    .then(response => response.json())
    .then(places => {
      console.log(places)
       this.setState({placeslist : places})
      len0 =Object.keys(this.state.placeslist).length
       if(len0)
      {
        console.log("Setting True")
         this.setState({redirecty: true})
         this.setState({NoPlacestoShow : false})
     }
     else
    {
      this.setState({NoPlacestoShow : true})
      this.setState({redirecty: false})
    }
    })
  }

  componentDidMount() {
   fetch('http://localhost:4004/placefilters')
    .then((response) => response.json())
    .then((data) => {
      console.log("HERE" + data.placename)
      this.setState({placename: data.placename})
      this.setState({adultlist: data.adultlist})
      this.setState({childlist : data.childlist})
      this.setState({startdate: data.startdate})
      this.setState({enddate: data.enddate})

      console.log("ADULTS " + data.adultlist)
      console.log("CHILDREN " + data.childlist)
  })


    var url = 'http://localhost:4004/places/'
    fetch(url, {
      method: 'get',
      credentials : 'include',
    })
    .then(response => response.json())
    .then(places => {
    this.setState({placeslist : places});
    console.log("PLACE LSIST" + places)
    len1 = Object.keys(this.state.placeslist).length
     if(len1)
    {
       console.log("came here and Setting True")
         this.setState({redirecty: true})
         this.setState({NoPlacestoShow : false})
    }
    else
    {
      this.setState({NoPlacestoShow : true})
      this.setState({redirecty: false})
    }

    if(this.props.value === false)
    {
      this.setState({redirecty: false})
    }
  })
    
  }
  componentWillMount()
  {
    var url = 'http://localhost:4004/places/'
    fetch(url, {
      method: 'get',
      credentials : 'include',
    })
    .then(response => response.json())
    .then(places => {
    this.setState({placeslist : places});
    console.log(places)
     len2 = Object.keys(this.state.placeslist).length
    if(len2)
    {
      console.log("Setting True")
         this.setState({redirecty: true})
         this.setState({NoPlacestoShow : false})
    }
    else
    {
       this.setState({NoPlacestoShow : true})
      this.setState({redirecty: false})
    }
  })
    
  }


handleClick(key){
    console.log("KEY IS " +key);
    localStorage.setItem("activekey" , key)
    this.setState(
      {propId:key})
    console.log(this.state)
}

  render() {
    let redirecty_value = null;
    let NoPlaces = null;
    if(cookie.load('cookie'))
    {
        if(this.state.redirecty === true)
        {
            redirecty_value = ( <div class="padtop">{
         this.state.placeslist.map((trip, i) => {
              return (
                <Places
                  key={trip.id}
                  id={trip.id}
                  name={trip.name}
                  type={trip.type}
                  location={trip.location}
                  bed={trip.bed}
                  bath={trip.bath}
                  description={trip.description}
                  startdate={trip.startdate}
                  enddate={trip.enddate}
                  clicked={this.handleClick}
                 value={trip.id}
                  />
              ); //return
            }) //map
        }
    </div>)
      } //if

      if(this.state.NoPlacestoShow === true)
      {
          NoPlaces = (<p class="error"><h3> No Places to show! Please select a different criteria</h3></p> )
      }
    }
     else
      {
        redirecty_value = (<Redirect to="/login" />)
      }
    return (
        <div>
        <hr />

         <div class="row centery">
                              <div class="info-form">
                                  <form action="" class="form-inline justify-content-center">
                                      <div class="form-group">
                                          <input type="text" class="form-control form-control-lg roundy" value={this.state.placename} placeholder="" onChange = {this.onPlaceChange}/>
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                         <input type="date" class="form-control form-control-lg roundy"
                                         value={this.state.startdate}
                              onChange={this.onStartDateChange}
                                       /> 
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                        <input type="date" class="form-control form-control-lg roundy"
                                        value = {this.state.enddate}
                              onChange={this.onEndDateChange}
                                           />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <div class="form-group">
                                          <input type="text" class="reduce form-control form-control-lg roundy smally" placeholder="" value={this.state.adultlist} onChange = {this.onAdultListChange} />
                                          <input type="text" class="reduce form-control form-control-lg roundy smally" placeholder="" value={this.state.childlist} onChange = {this.onChildListChange} />
                                      </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      <button type="button" class="bluebutton btn btn-primary btn-lg roundy" onClick = {this.onSubmit}>Search</button>
                                  </form>
                              </div>
                        <br />  
           </div>
            {redirecty_value}
              <div class="centery errorcenter">
                  {NoPlaces} 
              </div> 
        </div>
        );

  }
}

export default SearchBar;