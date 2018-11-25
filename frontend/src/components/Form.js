/**
 * Created by diogomatoschaves on 24/11/2018.
 */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, ListGroupItem} from 'react-bootstrap'


class Form extends Component {

  static defaultProps = {
    sourceLang: 'en',
    targetLang: 'es'
  }

  state = {
    message: '',
    text: ''
  }

  getResult = ({ jobId, id, text }) => {

    const { addUid, addTranslation, updateTranslation, checkStatus, sourceLang, targetLang } = this.props
    let i = 0

    addTranslation({ id, jobId, originalText: text, sourceLang, targetLang, status: 'requesting' })

    this.setState({
      showMessage: true,
      message: 'Your request for translation was sent!',
      bsStyle: 'success'
    })
    setTimeout(() => {
      this.setState({ showMessage: false })
    }, 3000)

    const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/check_confirmation?jobId=${jobId}&id=${id}`;

    const headers = new Headers()

    const timeoutCallback = () => {
      i++
      fetch(url, {
        method: 'get',
        headers,
      })
        .then(res => res.json())
        .then(response => {
          if (response.uid) {
            addUid(id, response.uid)
            setTimeout(() => {
              checkStatus([{ id, uid: response.uid }])
            }, 3000)
          } else {
            if (response.status && response.status === 'failed') {
              updateTranslation(id, {
                status: 'failed',
              })
            } else {
              const { translations } = this.props
              if (Object.keys(translations).includes(id)) setTimeout(timeoutCallback, (7 - i) >= 2 ? (7 - i)*1000 : 2000)
            }
          }
        })
    }
    setTimeout(timeoutCallback, 7000)
  }

  buttonSubmit = () => {

    const { text } = this.state
    const { sourceLang, targetLang } = this.props

    this.setState({ text: '' })

    if (!text) return

    const headers = new Headers()
    
    const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/new_translation`;

    const body =  JSON.stringify({ text, sourceLang, targetLang })
    
    fetch(url, {
      method: 'post',
      headers,
      body
    })
      .then(res => res.json())
      .then(response => this.getResult({ jobId: response.job_id, id: response.translation_job, text }))
      .catch(error => {
        this.setState({
          showMessage: true,
          message: 'There was an error processing your request. Make sure you are connected to the internet.',
          bsStyle: 'danger'
        })
        setTimeout(() => {
          this.setState({ showMessage: false })
        }, 3000)
      })
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }
  
  render() {

    const { text, message, showMessage, bsStyle } = this.state
    
    return (
      <div className="flex-row" style={{width: '80%', maxWidth: '800px', justifyContent: 'space-around'}}>
        <FormGroup style={{width: '77%'}}>
          <ControlLabel>Text to be translated</ControlLabel>
          <FormControl
            value={text}
            onChange={this.handleChange}
            componentClass="textarea"
            placeholder="Insert your text here"
            style={{height: '150px'}}
          />
        </FormGroup>
        <div className="flex-row" style={{width: '20%'}}>
          <Button disabled={!text} bsStyle="primary" bsSize="large" onClick={this.buttonSubmit}>
            Request
          </Button>
        </div>
        <ListGroupItem
          className='message-to-user flex-column'
          bsSize="large"
          bsStyle={bsStyle}
          style={{top: showMessage ? '60px' : '-200px'}}
        >
          {message}
        </ListGroupItem>
      </div>
    )
  }
}

export default Form
