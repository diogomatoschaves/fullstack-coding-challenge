/**
 * Created by diogomatoschaves on 24/11/2018.
 */


import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button, ButtonGroup, Well } from 'react-bootstrap'


class TranslationsList extends Component {

  static defaultProps = {
    styleOptions: {
      requesting: 'warning',
      pending: 'info',
      completed: 'success',
      failed: 'danger'
    }
  }

  deleteJob = ({ id }) => {
  
    const headers = new Headers()
    
    const { deleteTranslation } = this.props
    
    const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/delete_job?id=${id}`;
    
    deleteTranslation({ id })
    
    fetch(url, {
      method: 'get',
      headers,
    })
      .then(res => res.json())
      .then(response => {
        if (response.status === 'deleted') {
          
        }
      })
  }

  getFormattedDate = (timeStamp) => {

    let difference = Date.now() - timeStamp;
    const daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    const hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    const minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    const secondsDifference = Math.floor(difference/1000);

    return daysDifference >= 1 ? `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago` :
        hoursDifference >= 1 ? `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago` :
            minutesDifference >= 1 ? `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago` :
                `${secondsDifference} ${secondsDifference === 1 ? 'second' : 'seconds'} ago`

  };
  
  render() {

    const { translations, styleOptions, expandTranslation, checkStatus } = this.props

    // const sortProp = optionsSort.filter((option) => option.value === valueSort)[0].key;

    const orderedTranslations = translations ? Object.keys(translations).map(key => translations[key]).sort((a, b) => {
      return b.originalText.length - a.originalText.length
    }) : []
    
    return (
      <div className="flex-row" style={{width: '80%', maxWidth: '850px', justifyContent: 'space-around'}}>
        <ListGroup style={{width: '100%'}}>
          {orderedTranslations && orderedTranslations.map(translation => {

            return (
              <div key={translation.id} className="flex-row translation-item-wrapper" style={{width: '100%', justifyContent: 'space-between'}}>
                <ListGroupItem
                  bsStyle={styleOptions[translation.status]}
                  style={{cursor: 'pointer', padding: 0, width: '77%', border: translation.expanded && '2px solid rgb(180, 180, 180)'}}
                  className="flex-column translation-item"
                >
                  <div onClick={() => expandTranslation(translation.id)} className="flex-column" style={{width: '100%', padding: '20px'}}>
                    <div className='flex-row' style={{width: '100%', justifyContent: 'space-between'}}>
                      <div style={{width: '40%'}} className="message-header">{translation.originalText}</div>
                      <div style={{width: '25%', textAlign: 'center'}}><strong>time: </strong>{this.getFormattedDate(translation.timeStamp)}</div>
                      <div style={{width: '30%', textAlign: 'right'}}><strong>status: </strong>{translation.status}</div>
                    </div>
                    {translation.expanded && (
                      <div style={{width: '100%', marginTop: '15px'}}>
                        <strong>Original Text:</strong>
                        <Well style={{width: '100%'}}>
                          {translation.originalText}
                        </Well>
                        {translation.translatedText && (
                          <div style={{width: '100%', marginTop: '15px'}}>
                            <strong>Translated Text:</strong>
                            <Well style={{width: '100%'}}>
                              {translation.translatedText}
                            </Well>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ListGroupItem>
                <div style={{width: '20%', textAlign: 'center', alignSelf: 'flex-start', paddingTop: '20px'}}>
                  <ButtonGroup style={{whiteSpace: 'nowrap'}}>
                    <Button
                      onClick={() => checkStatus([{id: translation.id, uid: translation.uid}])}
                      disabled={translation.status !== 'pending' || translation.disabled}
                      bsStyle="info"
                      // style={{maxWidth: '100px'}}
                    >
                      {translation.disabled ? 'Checking..' : 'Update'}
                    </Button>
                    <Button 
                      bsStyle="danger"
                      onClick={() => this.deleteJob({ id: translation.id })}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default TranslationsList

