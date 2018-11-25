import React, { Component } from 'react';
import '../App.css';
import { Label } from 'react-bootstrap'
import Form from './Form'
import TranslationsList from './TranslationsList'

class App extends Component {

  state = {
    disabledIds: []
  }

  componentDidMount() {
    const headers = new Headers()

    const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/get_jobs`;

    fetch(url, {
      method: 'get',
      headers,
    })
      .then(res => res.json())
      .then(response => {
        if (response.jobs && response.jobs instanceof Array) {
          response.jobs.forEach((job) => {
            this.addTranslation({ 
              id: String(job.id),
              originalText: job.original_text, 
              sourceLang: job.source_lang, 
              targetLang: job.target_lang, 
              status: job.status,
              uid: job.uid
            })
          })
        }
      })

  }
  
  checkStatus = (itemsToCheck) => {
    
    const headers = new Headers()
    
    this.setState((state) => {
      return {disabledIds: [...state.disabledIds, ...itemsToCheck.map(item => item.id)]}
    })

    itemsToCheck.forEach((item) => {
      const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/check_status?uid=${item.uid}&id=${item.id}`;

      fetch(url, {
        method: 'get',
        headers,
      })
        .then(res => res.json())
        .then(response => {
          if (response.status === 'completed') {
            this.updateTranslation(item.id, {
              status: 'completed',
              translatedText: response.translatedText
            })
          }
        })
    })
  }
  
  addTranslation = ({ jobId, id, originalText, translatedText, sourceLang, targetLang, status, uid }) => {
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
            uid
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
        <Label className="title"><img src={require('../utils/unbabel-logo.svg')}/>Translation Service</Label>
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
