/**
 * Created by diogomatoschaves on 26/11/2018.
 */

import { shallow } from 'enzyme'
import React from 'react'
import Form from '../Form'


it('expect to render Form component', () => {
  
  const mockSourceLangs = [{
      name: 'English',
      key: 'en'
    }]
  
  const mockTargetLangs = [{
      name: 'Spanish',
      key: 'es'
    }]

  expect(shallow(<Form sourceLangs={mockSourceLangs} targetLangs={mockTargetLangs}/>)).toMatchSnapshot()
  
})
