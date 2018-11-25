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
  
  render() {

    const { translations, styleOptions, expandTranslation, checkStatus } = this.props
    
    return (
      <div className="flex-row" style={{width: '80%', maxWidth: '850px', justifyContent: 'space-around'}}>
        <ListGroup style={{width: '100%'}}>
          {translations && Object.keys(translations).map(translation => {

            const data = translations[translation]

            return (
              <div className="flex-row" style={{width: '100%', justifyContent: 'space-between'}}>
                <ListGroupItem
                  key={translation}
                  bsStyle={styleOptions[data.status]}
                  style={{cursor: 'pointer', padding: 0, width: '77%'}}
                  className="flex-column"
                >
                  <div onClick={() => expandTranslation(data.id)} className="flex-column" style={{width: '100%', padding: '20px'}}>
                    <div className='flex-row' style={{width: '100%', justifyContent: 'space-between'}}>
                      <div style={{width: '60%'}} className="message-header">{data.originalText}</div>
                      <div style={{width: '30%'}}><strong>status: </strong>{data.status}</div>
                    </div>
                    {data.expanded && (
                      <div style={{width: '100%', marginTop: '15px'}}>
                        <strong>Original Text:</strong>
                        <Well style={{width: '100%'}}>
                          {data.originalText}
                        </Well>
                        {data.translatedText && (
                          <div style={{width: '100%', marginTop: '15px'}}>
                            <strong>Translated Text:</strong>
                            <Well style={{width: '100%'}}>
                              {data.translatedText}
                            </Well>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ListGroupItem>
                <div style={{width: '20%'}}>
                  <ButtonGroup style={{whiteSpace: 'nowrap'}}>
                    <Button
                      onClick={() => checkStatus([{id: data.id, uid: data.uid}])}
                      disabled={data.status !== 'pending' || data.disabled}
                      bsStyle="info"
                      // style={{maxWidth: '100px'}}
                    >
                      {data.disabled ? 'Checking..' : 'Update'}
                    </Button>
                    <Button 
                      bsStyle="danger"
                      onClick={() => this.deleteJob({ id: data.id })}
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

