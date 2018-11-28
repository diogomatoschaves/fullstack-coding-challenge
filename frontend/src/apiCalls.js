/**
 * Created by diogomatoschaves on 26/11/2018.
 */

export const fetchJobs = async () => {

  const headers = new Headers()
  
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/get_jobs`;

  const response = await fetch(url, {
    method: 'get',
    headers,
  })
  
  if(response.status >= 400) {
    throw(new Error('Error fetching jobs'))
  } else {
    return await response.json()
  }
}

export const checkStatusAsync = async (item) => {

  const headers = new Headers()
  
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
  : process.env.REACT_APP_API_URL_PRODUCTION}/check_status?uid=${item.uid}&id=${item.id}`;

  const response = await fetch(url, {
    method: 'get',
    headers,
  })
  
  if (response.status >= 400) {
    throw(new Error('Error checking job status'))
  } else {
    return await response.json()
  }
}

export const getResultAsync = async ({ jobId, id }) => {
  
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
      : process.env.REACT_APP_API_URL_PRODUCTION}/check_confirmation?jobId=${jobId}&id=${id}`;

  const headers = new Headers()
  
  const response = await fetch(url, {
    method: 'get',
    headers,
  })
  
  if (response.status >= 400) {
    throw(new Error('Error fetching result'))
  } else {
    return await response.json()
  }
}

export const sendRequestAsync = async (body) => {
  
  const headers = new Headers()
    
  const url = `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT 
    : process.env.REACT_APP_API_URL_PRODUCTION}/new_translation`;
     
  const response = await fetch(url, {
    method: 'post',
    headers,
    body
  })
      
  if (response.status >= 400) {
    throw(new Error('Error sending request'))
  } else {
    return await response.json()
  }
}


