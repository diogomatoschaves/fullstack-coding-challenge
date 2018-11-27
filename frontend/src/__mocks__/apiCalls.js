/**
 * Created by diogomatoschaves on 26/11/2018.
 */

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

export const fetchJobs = jest.fn()
  .mockImplementationOnce(() => ({
    jobs: mockServerResponse
  }))
  .mockImplementationOnce(() => {
    throw(new Error('Error fetching jobs'))
  })
