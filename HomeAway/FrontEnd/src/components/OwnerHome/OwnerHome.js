import React from 'react';
import OwnerNavBar from '../OwnerNavBar/OwnerNavBar';
import OwnerSideBar from '../OwnerSideBar/OwnerSideBar';
import OwnerProperty from '../OwnerProperty/OwnerProperty';
import OwnerNavigation from '../OwnerNavigation/OwnerNavigation';
import NavDropDown from '../OwnerNavigation/NavDropDown'
import './OwnerHome.css'
import {Redirect} from 'react-router';
import cookie from 'react-cookies'

class OwnerHome extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      property: [],
      propertylocation : []
    };
  }

  componentDidMount() {
    var result = []
    fetch('http://localhost:4004/allpropertylisting/' + localStorage.getItem("ownery"))
    .then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);
      for(var i=0;i<responseJson.length;i++){
        console.log(responseJson[i].name)
        result.push({value:responseJson[i].name, text:responseJson[i].name})
    }
    console.log(result)
    this.setState({property : responseJson});
    this.setState({propertylocation : result});
  })
  }
  render() {
    let Redirect_to_login = null;
    if(!cookie.load('cookieowner'))
    {
      Redirect_to_login = (<Redirect to="/owner/login" />)
    }
    return (
      <div>
      {Redirect_to_login}
      <div>
      <OwnerNavigation properties={this.state.propertylocation}  />
      </div>
      <div class="divide">
      <hr />
      </div>
      <div class="silevrback">
      <OwnerProperty properties={this.state.property}/>
      </div>
      </div>
    );
  }
}

export default OwnerHome;