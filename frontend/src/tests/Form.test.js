/**
 * Created by diogomatoschaves on 26/11/2018.
 */

import { shallow, render } from 'enzyme'
import React from 'react'
import Form from '../Form'
import sinon from 'sinon'

jest.mock('../apiCalls')

describe('Form', () => {
  
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

  describe('button behaviour', async () => {
    
    let renderedComponent, button, textArea, mockAddTranslation, spy, spy2
    
    beforeEach(async () => {
      
      spy = jest.spyOn(Form.prototype, 'buttonSubmit')
      spy2 = jest.spyOn(Form.prototype, 'getResult')
      mockAddTranslation = jest.fn()

      renderedComponent = await shallow(<Form addTranslation={mockAddTranslation}/>)
      button = renderedComponent.find('[id="send-request"]');
      textArea = renderedComponent.find('FormControl').at(0);
    })
    

    it('should enable button once some textarea is not empty', async () => {
      
      expect(button.props().disabled).toBe(true)
      expect(renderedComponent.state().buttonDisabled).toBe(true)
      // console.log(button.prop('onClick'))
      
      textArea.simulate('change', {target: {value: 'test'}});
      
      expect(renderedComponent.state().text).toEqual('test')
      expect(renderedComponent.state().buttonDisabled).toBe(false)
      
      await renderedComponent.instance().forceUpdate()
      await renderedComponent.update()
      
    })

    it('Should call function addTranslation correctly', async () => {

      button.simulate('click')

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy2).toHaveBeenCalledTimes(0)
      // 
      
      textArea.simulate('change', {target: {value: 'test'}});
      
      await button.prop('onClick')()
      
      expect(renderedComponent.state().text).toEqual('')
      
      await renderedComponent.update()
      await renderedComponent.instance().forceUpdate()
      // sinon.assert.calledOnce(spy);
      expect(spy).toHaveBeenCalledTimes(2)
      
    })
  })

})
