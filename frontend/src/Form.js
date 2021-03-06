/**
 * Created by diogomatoschaves on 24/11/2018.
 */

import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, ListGroupItem, DropdownButton, MenuItem } from 'react-bootstrap'
import { sendRequestAsync, getResultAsync } from './apiCalls'


class Form extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      text: '',
      sourceLang: {
        name: 'English',
        key: 'en'
      },
      targetLang: {
        name: 'Spanish',
        key: 'es'
      },
      buttonDisabled: true
    }
    this.getResult = this.getResult.bind(this)
    this.buttonSubmit = this.buttonSubmit.bind(this)
  }

  static defaultProps = {
    sourceLangs: [{
      name: 'English',
      key: 'en'
    }],
    targetLangs: [{
      name: 'Spanish',
      key: 'es'
    }]
  }

  getResult({ jobId, id, text, timeStamp }) {
    
    console.log('this is being called')

    const { addUid, addTranslation, updateTranslation, checkStatus } = this.props
    const { sourceLang, targetLang } = this.state
    let i = 0

    addTranslation({ id, jobId, originalText: text, sourceLang, targetLang, status: 'requesting', timeStamp, translatedText: '' })

    this.setState({
      showMessage: true,
      message: 'Your request was sent!',
      bsStyle: 'success'
    })
    setTimeout(() => {
      this.setState({ showMessage: false })
    }, 3000)

    const timeoutCallback = async () => {
      i++
      try {
        const response = await getResultAsync({ jobId, id })
        
        console.log(response)
        
        if (response.uid) {
          addUid(id, response.uid)
          setTimeout(() => {
            checkStatus([{id, uid: response.uid}])
          }, 3000)
        } else {
          if (response.status && response.status === 'failed') {
            this.setState({
              showMessage: true,
              message: 'The request failed. Please try again',
              bsStyle: 'danger'
            })
            setTimeout(() => {
              this.setState({showMessage: false})
            }, 3000)
            updateTranslation(id, {
              status: 'failed',
            })
          } else {
            const {translations} = this.props
            if (Object.keys(translations).includes(id)) setTimeout(timeoutCallback, (7 - i) >= 2 ? (7 - i) * 1000 : 2000)
          }
        }
      } catch (err) {
        this.setState({
          showMessage: true,
          message: 'The request failed. Please try again',
          bsStyle: 'danger'
        })
        setTimeout(() => {
          this.setState({showMessage: false})
        }, 3000)
      }
    }
    setTimeout(timeoutCallback, 7000)
  }

  async buttonSubmit () {
    
    const { text } = this.state
    const { sourceLang, targetLang } = this.state
    
    if (!text) return null

    this.setState({ text: '' })

    const timeStamp = new Date().getTime()

    const body =  JSON.stringify({ text, sourceLang: sourceLang.key, targetLang: targetLang.key, timeStamp })

    try {
      const response = await sendRequestAsync(body)
      response && this.getResult({jobId: response.job_id, id: response.translation_job, text, timeStamp})
      console.log('this too was called')

    } catch (err) {
      this.setState({
        showMessage: true,
        message: 'There was an error processing your request. Make sure you are connected to the internet.',
        bsStyle: 'danger'
      })
      setTimeout(() => {
        this.setState({showMessage: false})
      }, 3000)
    }
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value, buttonDisabled: !e.target.value });
  }
  
  render() {

    const { text, message, showMessage, bsStyle, sourceLang, targetLang, buttonDisabled } = this.state
    const { sourceLangs, targetLangs } = this.props

    return (
      <div className="flex-column" style={{width: '80%', maxWidth: '850px', justifyContent: 'space-around'}}>
        <div className="flex-row" style={{ justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
          <div>
            <strong>From:</strong>
            <DropdownButton
              // bsStyle={title.toLowerCase()}
              title={sourceLang.name}
              id={`dropdown-basic`}
              style={{marginLeft: '10px'}}
            >
              {sourceLangs.map(lang => {
                return (
                  <MenuItem onClick={() => this.setState({ sourceLang: lang })} key={lang.key} eventKey="1">{lang.name}</MenuItem>
                )
              })}
            </DropdownButton>
          </div>
          <div style={{paddingLeft: '20px'}}>
            <strong>To:</strong>
            <DropdownButton
              style={{marginLeft: '10px'}}
              title={targetLang.name}
              id={`dropdown-basic`}
            >
              {targetLangs.map(lang => {
                return (
                  <MenuItem onClick={() => this.setState({ sourceLang: lang })} key={lang.key} eventKey="1">{lang.name}</MenuItem>
                )
              })}
            </DropdownButton>
          </div>
        </div>
        <div className="flex-row" style={{width: '100%', justifyContent: 'space-between', marginTop: '15px'}}>
          <FormGroup style={{width: '77%'}}>
            <FormControl
              id="input-textarea"
              value={text}
              onChange={this.handleChange}
              componentClass="textarea"
              placeholder="Insert your text here"
              style={{height: '150px'}}
            />
          </FormGroup>
          <div className="flex-row" style={{width: '20%'}}>
            {/*<button id="send-request" onClick={this.buttonSubmit} disabled={buttonDisabled}>Send Request</button>*/}
            <Button type="button" id="send-request" disabled={buttonDisabled} bsStyle="primary" bsSize="large" onClick={this.buttonSubmit}>
              Send Request
            </Button>
          </div>
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
