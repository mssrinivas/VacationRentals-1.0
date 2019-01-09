import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const Demo = () => {
   return (
    <AliceCarousel>
    <img src="/img1" className="yours-custom-class" />
    <img src="/img2" className="yours-custom-class" />
    <img src="/img3" className="yours-custom-class" />
    <img src="/img4" className="yours-custom-class" />
    <img src="/img5" className="yours-custom-class" />
  </AliceCarousel>)
}


export default Demo;