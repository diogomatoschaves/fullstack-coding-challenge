/**
 * Created by diogomatoschaves on 24/11/2018.
 */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'


class Form extends Component {

  state = {
    message: null
  }

  buttonsubmit = () => {
    const headers = new Headers()
    
    const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/newsearch`;
    
    fetch(url)
  }
  
  render() {
    
    return (
      <div className="flex-column" style={{width: '100%'}}>
        <FormGroup style={{width: '70%'}}>
          <ControlLabel>Message</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>
        <Button bsStyle="primary" bsSize="large" onClick={this.buttonSubmit}>
          Submit
        </Button>
      </div>
    )
  }
}

export default Form
