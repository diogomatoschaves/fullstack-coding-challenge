import React, { Component } from 'react';
import './App.css';
import { Label } from 'react-bootstrap'
import Form from './Form'
import TranslationsList from './TranslationsList'
import { fetchJobs, checkStatusAsync } from './apiCalls'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      translations: {}
    }
    this.checkStatus = this.checkStatus.bind(this);
  }
  
  async componentDidMount() {

    try {
      const response = await fetchJobs()
      console.log('used app.js')
      if (response.jobs && response.jobs instanceof Array) {
        response.jobs.forEach((job) => {
          this.addTranslation({
            id: String(job.id),
            originalText: job.original_text,
            translatedText: job.translated_text,
            sourceLang: job.source_lang,
            targetLang: job.target_lang,
            status: job.status,
            uid: job.uid,
            timeStamp: job.timestamp * 1000
          })
        })
      }
    } catch(err) {
      this.setState({errorStatus: err.message})
    }
  }
  
  async checkStatus (itemsToCheck) {

    let response

    itemsToCheck.map(async (item) => {

      this.updateTranslation(item.id, {disabled: true})

      try {
        response = await checkStatusAsync(item)

        response && this.updateTranslation(item.id, {disabled: false})

        if (response.status === 'completed') {
          this.updateTranslation(item.id, {
            status: 'completed',
            translatedText: response.translatedText
          })
        }
      } catch (err) {
        this.setState({errorStatus: err.message})
      }
    })
  }
  
  addTranslation = ({ jobId, id, originalText, translatedText, sourceLang, targetLang, status, uid, timeStamp }) => {
    this.setState((state) => {
      return {
        translations: {
          ...state.translations,
          [id]: {
            id,
            jobId,
            originalText,
            translatedText,
            sourceLang,
            targetLang,
            status,
            uid,
            timeStamp
          }
        }
      }
    })
  }
  
  deleteTranslation = ({ id }) => {
    this.setState((state) => {
      return {
        translations: Object.keys(state.translations).reduce((newObj, translation) => {
          // debugger
          return translation === id ?
            newObj : {
            ...newObj,
            [translation]: state.translations[translation]
          }
        }, {})
      }
    })
  }

  expandTranslation = (key) => {
    this.setState((state) => {
      return {
        translations: Object.keys(state.translations).reduce((newObj, translation) => {
          // debugger
          return translation === key ? {
            ...newObj,
            [translation]: {
              ...state.translations[translation],
              expanded: !state.translations[translation].expanded
            }
          } : {
            ...newObj,
            [translation]: state.translations[translation]
          }
        }, {})
      }
    })
  }

  addUid = (key, uid) => {
    this.setState((state) => {
      return {
        translations: Object.keys(state.translations).reduce((newObj, translation) => {
          return translation === key ? {
            ...newObj, 
            [translation]: {
              ...state.translations[translation],
              uid,
              status: 'pending'
            }
          } : {
            ...newObj,
            [translation]: state.translations[translation]
          }
        }, {})
      }
    })
  }

  updateTranslation = (key, updateObj) => {
    this.setState((state) => {
      return {
        translations: Object.keys(state.translations).reduce((newObj, translation) => {
          return translation === key ? {
            ...newObj,
            [translation]: {
              ...state.translations[translation],
              ...updateObj
            }
          } : {
            ...newObj,
            [translation]: state.translations[translation]
          }
        }, {})
      }
    })
  }

  render() {
    
    const { translations } = this.state
    
    return (
      <div className='app flex-column'>
        <Label className="title"><img src={require('./utils/unbabel-logo.svg')}/>Translation Service</Label>
        <Form
          addUid={this.addUid}
          addTranslation={this.addTranslation}
          updateTranslation={this.updateTranslation}
          checkStatus={this.checkStatus}
          translations={translations}
        />
        <TranslationsList
          translations={translations}
          expandTranslation={this.expandTranslation}
          checkStatus={this.checkStatus}
          deleteTranslation={this.deleteTranslation}
        />
      </div>
    );
  }
}

export default App;
