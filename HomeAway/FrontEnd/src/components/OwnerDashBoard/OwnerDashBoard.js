import React from 'react';
import OwnerNavBar from '../OwnerNavBar/OwnerNavBar';
import OwnerSideBar from '../OwnerSideBar/OwnerSideBar';
import OwnerProperty from '../OwnerProperty/OwnerProperty';
import './OwnerDashBoard.css'
import OwnerNavigation from '../OwnerNavigation/OwnerNavigation';
import NavDropDown from '../OwnerNavigation/NavDropDown'
import {Redirect} from 'react-router'
import cookie from 'react-cookies'
class OwnerDashBoard extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      property: [],
      propertylocation : [],
      redirect : false
    };
  }

  componentDidMount() {
    var result = []
    fetch('http://localhost:4004/mypropertylistings/' + localStorage.getItem("ownery"))
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
    let redirect = null;
    if(!cookie.load('cookieowner'))
    {
      redirect = (<Redirect to="/owner/login" />)
    }
    return (
      <div>
      {redirect}
      <div>
      <OwnerNavigation properties={this.state.propertylocation}  />
      </div>
      <br />
      <hr />
      <div>
      </div>
      <div id="bodydiv" >
      <OwnerProperty properties={this.state.property}/>
      </div>
      </div>
    );
  }
}

export default OwnerDashBoard;