/**
 * Created by diogomatoschaves on 26/11/2018.
 */

const mockJobsResponse = [
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

export const fetchJobs = jest.fn()
  .mockImplementationOnce(() => {
    console.log('mock fetch jobs was called')
    return {
      jobs: mockJobsResponse
    }
  })
  .mockImplementationOnce(() => {
    throw(new Error('Error fetching jobs'))
  })

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

export const checkStatusAsync = jest.fn()
  .mockImplementation((item) => (mockStatusResponse))
  .mockImplementation((item) => {
    throw(new Error('Error checking job status'))
  })

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

export const getResultAsync = jest.fn()
  .mockImplementation(({ jobId, id }) => {
    console.log('mock get result was called')
    return mockResultResponse
  })
  .mockImplementation(({ jobId, id }) => {
    throw(new Error('Error fetching result'))
  })

const mockServerResponse = {
  job_id: '57dade01-e7e1-42f9-b198-4ed7065a5139',
  translation_job: '10',
}

export const sendRequestAsync = jest.fn()
  .mockImplementation((body) => {
    console.log('mock send request was called')
    return mockServerResponse
  })
  .mockImplementation((body) => {
    throw(new Error('Error sending request'))
  })

