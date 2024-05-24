// const API_URL = 'http://3.235.77.177/v1'
const API_URL = 'https://api.vispunk.com/v1'

export async function generateAPI(query: string, temperature: number = 0.0) {
  const body = JSON.stringify({
    query,
    temperature,
  })
  const response = await fetch(API_URL + '/generate/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  const responseJson = await response.json()
  let error = null as null|string
  if (!response.ok && responseJson.detail) {
    error = responseJson.detail
  }
  return { 
    success: response.ok,
    result: responseJson.result,
  }
}
