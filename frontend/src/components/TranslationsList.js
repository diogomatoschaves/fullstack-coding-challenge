/**
 * Created by diogomatoschaves on 24/11/2018.
 */


import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'


class TranslationsList extends Component {

  static defaultProps = {
    styleOptions: {
      requesting: 'warning',
      pending: 'info',
      completed: 'success',
      failed: 'danger'
    }
  }
  
  render() {

    const { translations, styleOptions, expandTranslation } = this.props
    
    return (
      <div className="flex-row" style={{width: '80%', maxWidth: '700px', justifyContent: 'space-around'}}>
        <ListGroup style={{width: '100%'}}>
          {translations && Object.keys(translations).map(translation => {

            const data = translations[translation]

            return (
              <div>
                <ListGroupItem
                  key={translation}
                  bsStyle={styleOptions[data.status]}
                  style={{cursor: 'pointer', padding: 0}}
                  className="flex-column"
                >
                  <div onClick={() => expandTranslation(data.id)} className="flex-column" style={{width: '100%', padding: '20px'}}>
                    <div className='flex-row' style={{width: '100%', justifyContent: 'space-between'}}>
                      <div style={{width: '60%'}} className="message-header">{data.text}</div>
                      <div style={{width: '30%'}}><strong>status: </strong>{data.status}</div>
                    </div>
                    {data.expanded && (
                      <div style={{width: '100%', marginTop: '15px'}}>
                        <strong>Original Text:</strong>
                        <div style={{width: '100%'}}>
                          {data.text}
                        </div>
                        {data.translated && (
                          <div style={{width: '100%', marginTop: '15px'}}>
                            <strong>Translated Text:</strong>
                            <div style={{width: '100%'}}>
                              {data.translated}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ListGroupItem>
              </div>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default TranslationsList

