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

  it('renders without crashing', () => {
    expect(shallow(<TranslationsList />)).toMatchSnapshot()
  });

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