import React, { Component } from 'react';
import '../App.css';
import { Label } from 'react-bootstrap'
import Form from './Form'
import TranslationsList from './TranslationsList'

class App extends Component {

  state = {
    translations: {
      "141477b9-102b-4024-b4ac-31fba1a23a4f" : {
        id: "141477b9-102b-4024-b4ac-31fba1a23a4f",
        status: "requesting",
        text: "Hello World, this is the Moon. It's been a while",
        translated: 'Hola Mundo, aqui te habla la Luna. Ha pasado un ratito',
        expanded: false
      }
    }
  }
  
  addTranslation = ({ jobId, id, text, sourceLang, targetLang, status }) => {
    this.setState((state) => {
      return {
        translations: {
          ...state.translations,
          [id]: {
            id,
            jobId,
            text,
            sourceLang,
            targetLang,
            status
          }
        }
      }
    })
  }

  expandTranslation = (key) => {
    this.setState((state) => {
      return {
        translations: Object.keys(state.translations).reduce((newObj, translation) => {
          // debugger
          return translation == key ? {
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
          return translation == key ? {
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
          return translation == key ? {
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
        />
        <TranslationsList
          translations={translations}
          expandTranslation={this.expandTranslation}
        />
      </div>
    );
  }
}

export default App;
