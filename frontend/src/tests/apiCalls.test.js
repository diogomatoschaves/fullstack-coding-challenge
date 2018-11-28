/**
 * Created by diogomatoschaves on 26/11/2018.
 */

import { fetchJobs, checkStatusAsync, getResultAsync, sendRequestAsync } from '../apiCalls'

// jest.mock('../apiCalls')

describe('Api Calls', () => {
  
  describe('fetchJobs', () => {
    
    const mockServerResponse = [
      {
        id: 12,
        original_text: "Powered by AI and refined by a global community of tens of thousands of human linguists,",
        source_lang: "en",
        status: "completed",
        target_lang: "es",
        text_format: "",
        timestamp: 1543174282,
        translated_text: "Desarrollado por AI y refinado por una comunidad global de decenas de miles de lingüistas humanos",
        uid: "913c966163",
    }, {
        id: 13,
        original_text: "Hi there",
        source_lang: "en",
        status: "pending",
        target_lang: "es",
        text_format: "",
        timestamp: 1543254668,
        translated_text: "",
        uid: "5d569f5bd9"
      }, {
        id: 10,
        original_text: 'The Cross-Origin Resource Sharing standard works by adding new HTTP headers that allow servers to ',
        source_lang: "en",
        status: "completed",
        target_lang: "es",
        text_format: "",
        timestamp: 1543174176,
        translated_text: 'La norma de origen cruzado de intercambio de recursos funciona mediante la adición de nuevas',
        uid: "9e48eec7c4",
      }
    ]
    
    it('returns an object if status code is ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
          status: 200,
            json: () => new Promise((resolve, reject) => {
            resolve({jobs: mockServerResponse})
          })
        }))
  
      expect(fetchJobs()).resolves.toEqual({jobs: mockServerResponse})
    })
  
    it('throws an error if status code is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 500,
      }))
  
      expect(fetchJobs()).rejects.toEqual(Error('Error fetching jobs'))
    })
  })
  
  describe('checkStatusAsync', () => {
    
    const mockStatusResponse = {
      "balance": 99937.0,
      "client": "username",
      "price": 6.0,
      "source_language": "en",
      "status": "completed",
      "target_language": "pt",
      "text": "Hello, world!",
      "text_format": "text",
      "translatedText": "Olá Mundo!",
      "uid": "ac1a53a264"
    }
    
    it('returns an object if status code is ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
          status: 200,
            json: () => new Promise((resolve, reject) => {
            resolve(mockStatusResponse)
          })
        }))
  
      expect(checkStatusAsync({uid: "ac1a53a264", id: "1"})).resolves.toEqual(mockStatusResponse)
    })
  
    it('throws an error if status code is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 500,
      }))
  
      expect(checkStatusAsync({uid: "ac1a53a264", id: "1"})).rejects.toEqual(Error('Error checking job status'))
    })
  })
  
  describe('getResultAsync', () => {
    
    const mockResultResponse = {
      "balance": 99943.0,
      "client": "username",
      "price": 6.0,
      "source_language": "en",
      "status": "new",
      "target_language": "pt",
      "text": "Hello, world!",
      "text_format": "text",
      "uid": "ac1a53a264"
    }
    
    it('returns an object if status code is ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
          status: 200,
            json: () => new Promise((resolve, reject) => {
            resolve(mockResultResponse)
          })
        }))
  
      expect(getResultAsync({ jobId: '57dade01-e7e1-42f9-b198-4ed7065a5139' , id: "10" }))
          .resolves.toEqual(mockResultResponse)
    })
  
    it('throws an error if status code is not ok', () => {
      window.fetch = jest.fn().mockImplementation(() => ({
        status: 500,
      }))
  
      expect(getResultAsync({ jobId: '57dade01-e7e1-42f9-b198-4ed7065a5139' , id: "10" }))
          .rejects.toEqual(Error('Error fetching result'))
    })
  })
  
  describe('sendRequestAsync', () => {
    
    const mockServerResponse = {
      job_id: '57dade01-e7e1-42f9-b198-4ed7065a5139',
      translation_job: '10',
    }
    
    it('returns an object if status code is ok', () => {
      window.fetch = jest.fn().mockImplementation((body) => ({
          status: 200,
            json: () => new Promise((resolve, reject) => {
            resolve(mockServerResponse)
          })
        }))
  
      expect(sendRequestAsync()).resolves.toEqual(mockServerResponse)
    })
  
    it('throws an error if status code is not ok', () => {
      window.fetch = jest.fn().mockImplementation((body) => ({
        status: 500,
      }))
  
      expect(sendRequestAsync()).rejects.toEqual(Error('Error sending request'))
    })
  })
  
})

