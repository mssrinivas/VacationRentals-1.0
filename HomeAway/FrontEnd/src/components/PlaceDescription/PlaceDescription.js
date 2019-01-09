import React,{Component} from 'react';
import './PlaceDescription.css';
import  { Carousel, CarouselInner, CarouselItem, View, Container } from 'mdbreact';
import {Redirect} from 'react-router'
import cookie from 'react-cookies'

var img1 = ''

class PlaceDescription extends Component 
{
	 constructor(props) {
	    super(props);
	    this.state = {
	      Headline: '',
	      PropertyDescription: '',
	      PropertyType: '',
	      Bedrooms : '',
	      Accomodates : '',
	      Bathroom : '',
	      MinStay: '',
	      People: '',
	      PerNight: '',
	      AvailableStartDate: '',
	      AvailableEndDate: '',
	      Currency: '',
	      Redirecty : false,
	      placename: '',
	      startdate: 0,
	      enddate: 0,
	      adultlist: 0,
	      childlist: 0,
	      photos: [],
	      Total : 0
	    }
	}

	componentDidMount()
	{

	var id = localStorage.getItem("activekey");
	//var id = 15
		 var url = 'http://localhost:4004/places/propertydescription/' + id
		    fetch(url, {
		      method: 'get',
		      credentials : 'include',
		    })
		    .then(response => response.json())
		    .then(places => {
		       this.setState({Headline: places[0].name})
		      this.setState({PropertyDescription: places[0].description})
		      this.setState({PropertyType: places[0].type})
		      this.setState({Bedrooms: places[0].bed})
		      this.setState({Bathroom: places[0].bath})
		      this.setState({MinStay: places[0].minstay})
		      let res1= places[0].maxadults;
		      let res2 = places[0].maxchild;
		      let res = res1+res2;
		      this.setState({People: res})
		      this.setState({PerNight: places[0].rate})
		      this.setState({AvailableStartDate: places[0].startdate})
		      this.setState({AvailableEndDate: places[0].enddate})
		      this.setState({Currency: places[0].currencytype})
			  var one =  new Date(this.state.enddate);
			  var two =  new Date(this.state.startdate);
			  var timeDiff = Math.abs(one.getTime() - two.getTime());
	          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	          var totalAmount = diffDays * places[0].rate;
	          this.setState({Total : totalAmount})
		  })


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

	     fetch('http://localhost:4004/getPropertyImg', {
		      method: 'post',
		      headers: {'Content-Type': 'application/json'},
		      credentials : 'include',
		      body : JSON.stringify({
		      	id : id
		      })
		    })
		    .then(response => response.json())
		    .then(data => {
		    	var imageArr = [];
		    	console.log("length is "+ data.results.length)
		    	for (let i = 0; i < data.results.length; i++) {
		    	let imagePreview = 'data:image/jpg;charset=utf-8;base64, ' + data.results[i];
                                imageArr.push(imagePreview);
                                const photoArr = this.state.photos.slice();
                                photoArr[i] = imagePreview;
                                this.setState({
                                    photos: photoArr
                                });
                                console.log('Photo State: ', this.state.photos);
                  }
		    })

	}

	onSubmit = () => {
		var id = localStorage.getItem("activekey");
		var name = localStorage.getItem("usernamey")
		var url= 'http://localhost:4004/book/property'
		fetch(url, {
      		method: 'post',
      		headers: {'Content-Type': 'application/json'},
      		body: JSON.stringify({
       			 property_id: id,
       			 username: name,
       			 startdate : this.state.startdate,
       			 enddate : this.state.enddate
      })
    })

   .then(response => {
      if(response.status === 400)
        {
          alert("This Property Cannot be booked")
        }
      else
        {
          response.json()
          .then(places => {
          this.setState({Redirecty : true})
           alert("Property Booked Successfully")
          })

        }
      })
	}
 
  render()
  {
  	let Redirection_Value = null;
  	let Error_Display = null;
  	if(cookie.load('cookie'))
  	{
	  	if(this.state.Redirecty === true)
	  	{
	  		Redirection_Value = (<Redirect to="/home" />)
	  	}
  	}
  	else
  	{
  		Redirection_Value = (<Redirect to="/login" />)
  	}
  	

  	let carousalBlock = this.state.photos.map(function (item, index) {

            return (
                <div className={index == 0 ? "carousel-item active" : "carousel-item"} key={index}>
                    <img className=" carousel-img property-display-img" src={item} width="900" height="400" alt="property-image" />
                </div>
            )
        });

        let carousalIndicator = this.state.photos.map(function (item, index) {

            return (                
                    <li data-target="#myCarousel" data-slide-to={index} className={index == 0 ? "active" : ""} key={index}></li>     
            )
        });

  	return(
<div class="row rowy">
	<div class="col-md-8 bordering shadowingcontainertraveller">
	 <div id="myCarousel" className="carousel slide" data-ride="carousel">
                                <ul className="carousel-indicators">
                                    {carousalIndicator}
                                </ul>
                                <div className="carousel-inner">
                                    {carousalBlock}
                                </div>
                                <a className="carousel-control-prev" href="#myCarousel" data-slide="prev">
                                    <span className="carousel-control-prev-icon"></span>
                                </a>
                                <a className="carousel-control-next" href="#myCarousel" data-slide="next">
                                    <span className="carousel-control-next-icon"></span>
                                </a>
      </div>
	{/*<img class="imagey" src="http://www.sjsu.edu/sjsuhome/pics/tower-hall.jpg" /> */}
		<hr />
		<div class="item itemy">
		<i class="home icon"> <p class="boldy">Type {this.state.PropertyType}</p></i>&nbsp;&nbsp;
		<i class="bed icon"> <p class="boldy">Bed {this.state.Bedrooms}</p></i>&nbsp;&nbsp;
		<i class="users icon"> <p class="boldy">Sleeps {this.state.People}</p></i>&nbsp;&nbsp;
		<i class="bath icon"><p class="boldy"> Bath {this.state.Bathroom}</p></i>&nbsp;&nbsp;
		<i class="moon icon"> <p class="boldy">MinStay {this.state.MinStay} </p></i>&nbsp;&nbsp;
		</div>
		
		</div>
		<div class="col-md-4 shadowingcontainertraveller bordering booking">
				    <div class="contenty">	
				      <a class="header"><h1>{this.state.Headline}</h1></a>
				      <h3>Price : {this.state.Currency} {this.state.Total}</h3>
				      <h3> Dates Available </h3>
				      <label for="firstName">Start Date</label>
                     <input type="date" class="form-controly form-control form-control-lg roundy" id="startdate" placeholder="" value={this.state.startdate} required="" disabled />	
                     <label for="firstName">End Date</label>
                     <input type="date" class="form-controly form-control form-control-lg roundy" id="enddate" placeholder="" value={this.state.enddate} required=""  disabled/>	
                     <br />
				     <button type="button" class="booknow btn-lg" onClick = {this.onSubmit}>Book Now</button>
				     </div>
				  <br />
				  </div>
				  {Redirection_Value}
		</div>
		);
  }
}



export default PlaceDescription;