// const API_URL = 'http://3.235.77.177/v1'
const API_URL = 'https://api.vispunk.com/v1'

export const APP_TEMPLATE = `
We are building an app using a framework called Interformer.

There are 2 types of components in this framework:
Input: This component allows the user to enter inputs
  properties:
    id: unique id used to reference this input
Output: This component displays outputs from Javascript functions
  properties:
    function: Javascript code that utilizes input ids
Oracle: This is an LLM-powered component that returns the output from a prompt, with the specific answer enclosed in <answer> tags
  properties:
    prompt: Prompt provided to the LLM

Here is a sample app description and the JSON describing the resulting app

Description: Create an app that doubles the value of an input

<json>
[
  {
    "type": "Input",
    "properties": {
      "id": "x"
    }
  },
  {
    "type": "Output",
    "properties": {
      "function": "2 * parseInt(x)"
    }
  }
]
</json>

Here is an example that uses the Oracle component.

Description: Create an app that translates from English to Japanese and Malay

<json>
[
  {
    "type": "Input",
    "properties": {
      "id": "english_input"
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "prompt": "You will be translating text from English to Japanese.\\nEnclose your output in <answer> tags.\\n\\nHere is an example.\\n\\n<input>\\nHello\\n</input>\\n<answer>\\nこんにちは\\n</answer>\\nPlease translate the following:\\n<input>\\n{{english_input}}\\n</input>"
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "prompt": "You will be translating text from English to Malay.\\nEnclose your output in <answer> tags.\\n\\nHere is an example.\\n\\n<input>\\nHello\\n</input>\\n<answer>\\nSelamat datang\\n</answer>\\nPlease translate the following:\\n<input>\\n{{english_input}}\\n</input>"
    }
  }
]
</json>

Here is another example that uses the Oracle component.

Description: Create an app that generates 5 ideas for a given topic

<json>
[
  {
    "type": "Input",
    "properties": {
      "id": "topic"
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "prompt": "You will help to generate 5 ideas for a given topic.\\nYou will first think about the topic. Then, summarize your thoughts into 5 concise ideas.\\nHere is an example.\\n<topic>\\nbirthday\\n</topic>\\n<thoughts>\\nTypical birthday celebrations include parties, singing and cake. It is also appropriate to get a gift. Depending on the person, a nice birthday may also include a trip to the theme park or the beach.\\n</thoughts>\\n<answer>\\n1. Sing a birthday song\\n2. Buy a cake\\n3. Buy an appropriate gift\\n4. Plan a trip to the theme park\\n5. Plan a trip to the beach\\n</answer>\\nNow generate 5 ideas for the following topic.\\n<topic>\\n{{topic}}\\n</topic>"
    }
  }
]
</json>

Here is another example that uses the Output component.

Description: Generate a random number from 1 to 10

<json>
[
  {
    "type": "Output",
    "properties": {
      "function": "Math.floor(Math.random() * 10) + 1"
    }
  }
]
</json>

Create a JSON for the following description and enclose it in <json> tags

Description: __DESCRIPTION__
`

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
