/**
 * Created by diogomatoschaves on 26/11/2018.
 */

import React from 'react';
// import ReactDOM from 'react-dom';
import App from '../App';
import Form from '../Form';
import TranslationsList from '../TranslationsList';
import { shallow } from 'enzyme'


describe(`adding a translation`, () => {
  
  const mockTranslations = {
    "10": {
      "id": "10", 
      "jobId": undefined, 
      "originalText": "The Cross-Origin Resource Sharing standard works by adding new HTTP headers that allow servers to ",
      "sourceLang": "en", 
      "status": "pending", 
      "targetLang": "es", 
      "timeStamp": 1543174176000, 
      "translatedText": "", 
      "uid": "9e48eec7c4"}, 
    "12": {
      "id": "12", 
      "jobId": undefined, 
      "originalText": "Powered by AI and refined by a global community of tens of thousands of human linguists,", 
      "sourceLang": "en", 
      "status": "completed",
      "targetLang": "es", 
      "timeStamp": 1543174282000,
      "translatedText": "Desarrollado por AI y refinado por una comunidad global de decenas de miles de lingüistas humanos", 
      "uid": "913c966163"
    },
  }

  it('renders without crashing', () => {
    expect(shallow(<TranslationsList translations={mockTranslations} />)).toMatchSnapshot()
  });
  
  
  it('', () => {

  })

})

// describe(`adding a translation`, () => {
//
//   const mockTranslation = {
//     id: "13",
//     jobId: "dd483a4a-36d1-413d-b088-5a21cd49a589",
//     originalText: "Hi there",
//     sourceLang: {
//       key: "en",
//       name: "English"
//     },
//     status: "requesting",
//     targetLang: {
//       key: "es",
//       name: "Spanish"
//     },
//     timeStamp: 1543254667796,
//     translatedText: ""
//   }
//
//   const wrapperApp = shallow(<App />);
//   const wrapperTranlationsList = shallow(<TranslationsList />);
//   const instance = wrapperApp.instance();
//   expect(wrapperTranlationsList.props().translations).toEqual({});
//   instance.addTranslation(mockTranslation);
//   expect(wrapperTranlationsList.props().translations).toEqual({
//     13: {
//       id: "13",
//       jobId: "dd483a4a-36d1-413d-b088-5a21cd49a589",
//       originalText: "Hi there",
//       sourceLang: {
//         key: "en",
//         name: "English"
//       },
//       status: "requesting",
//       targetLang: {
//         key: "es",
//         name: "Spanish"
//       },
//       timeStamp: 1543254667796,
//       translatedText: ""
//     }
//   });


// });