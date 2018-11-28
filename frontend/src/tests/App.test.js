import React from 'react';
// import ReactDOM from 'react-dom';
import App from '../App';
import Form from '../Form';
import { shallow } from 'enzyme'


jest.mock('../apiCalls')

const mockServerResponse = {"10": {"id": "10", "jobId": undefined, "originalText": "The Cross-Origin Resource Sharing standard works by adding new HTTP headers that allow servers to ", "sourceLang": "en", "status": "completed", "targetLang": "es", "timeStamp": 1543174176000, "translatedText": "La norma de origen cruzado de intercambio de recursos funciona mediante la adición de nuevas", "uid": "9e48eec7c4"}, "12": {"id": "12", "jobId": undefined, "originalText": "Powered by AI and refined by a global community of tens of thousands of human linguists,", "sourceLang": "en", "status": "completed", "targetLang": "es", "timeStamp": 1543174282000, "translatedText": "Desarrollado por AI y refinado por una comunidad global de decenas de miles de lingüistas humanos", "uid": "913c966163"}, "13": {"id": "13", "jobId": undefined, "originalText": "Hi there", "sourceLang": "en", "status": "pending", "targetLang": "es", "timeStamp": 1543254668000, "translatedText": "", "uid": "5d569f5bd9"}}

describe('App', () => {
  
  describe('componentDidMount', () => {
    it('sets the state componentDidMount', async() => {
      const renderedComponent = await shallow(<App />)
      await renderedComponent.update()
      
      expect(renderedComponent.state().translations).toEqual(mockServerResponse)
    })
    
    it('sets the state componentDidMount on error', async () => {
      const renderedComponent = await shallow(<App />)
      await renderedComponent.update()
      expect(renderedComponent.state().errorStatus).toEqual('Error fetching jobs')
    })
  })

  describe('check status', () => {

    it('', () => {
      
    })

  })
  
  it('renders without crashing', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  });

})
