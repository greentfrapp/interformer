const MAIN_PROMPT = `
We are building an app using a framework called Interformer.

There are 5 types of components in this framework:
Input: This component allows the user to enter inputs
  properties:
    label: A label for this component visible to the user
    id: Unique id used to reference this input
    placeholder: An appropriate initial placeholder value
Output: This component displays outputs from Javascript functions
  properties:
    label: A label for this component visible to the user
    id: Unique id used to reference the function output
    function: Javascript code that utilizes input ids
Dropdown: This component allows the user to select from a set of options that can be used in other components
  properties:
    label: A label for this component visible to the user
    id: Unique id used to reference the selected option
    options: A list of options, where each option has a label and a value
Oracle: This is an LLM-powered component that returns the output from a prompt, where only output enclosed in <answer> tags will be shown to the user
  properties:
    label: A label for this component visible to the user
    id: Unique id used to reference the oracle output
    prompt: Prompt provided to the LLM
    placeholder: An appropriate initial placeholder value
Tabular: This is a table component that allows the user to create and list tabular data
  properties:
    label: A label for this component visible to the user
    id: Unique id used to reference the table
    columns: An array describing the columns of the label
      label: Label of the column
      id: Unique id used to reference the column
Button: This is a button component that allows the user to run actions
  properties:
    label: A label for this component visible to the user
    id: Unique id used to reference the action
    function: Javascript code that utilizes input ids

Here is a sample app description and the JSON describing the resulting app

<description>
Create an app that doubles the value of an input
</description>
<thoughts>
This app will use an Input component to allow the user to enter an input. Then the Output component will be used to parse the input into a number and then double it.
</thoughts>
<title>Doubler</title>
<json>
[
  {
    "type": "Input",
    "properties": {
      "label": "x",
      "id": "_x",
      "placeholder": "1"
    }
  },
  {
    "type": "Output",
    "properties": {
      "label": "Double x",
      "id": "_double_x",
      "function": "2 * parseInt(_x)"
    }
  }
]
</json>

Here is another example.

<description>
Add two numbers
</description>
<thoughts>
This app will use two Input components to allow the user to enter two different numbers. Then the Output component will be used to parse the inputs into numbers and sum them.
</thoughts>
<title>Sum</title>
<json>
[
  {
    "type": "Input",
    "properties": {
      "label": "x",
      "id": "_x",
      "placeholder": "1"
    }
  },
  {
    "type": "Input",
    "properties": {
      "label": "y",
      "id": "_y",
      "placeholder": "1"
    }
  },
  {
    "type": "Output",
    "properties": {
      "label": "Sum",
      "id": "_sum",
      "function": "parseInt(_x) + parseInt(_y)"
    }
  }
]
</json>

Here is an example that uses the Oracle component.

<description>
Create an app that translates from English to Japanese and Malay
</description>
<thoughts>
This app will use an Input component to allow the user to enter English text. Then there will be two Oracle components to translate the input text to Japanese and Malay respectively.
</thoughts>
<title>English to Japanese/Malay</title>
<json>
[
  {
    "type": "Input",
    "properties": {
      "label": "English",
      "id": "_english_input",
      "placeholder": "Hello"
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "label": "Japanese",
      "id": "_japanese_output",
      "prompt": "You will be translating text from English to Japanese.\\nEnclose your output in <answer> tags.\\n\\nHere is an example.\\n\\n<input>\\nHello\\n</input>\\n<answer>\\nこんにちは\\n</answer>\\nPlease translate the following:\\n<input>\\n{{_english_input}}\\n</input>",
      "placeholder": "こんにちは"
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "label": "Malay",
      "id": "_malay_output",
      "prompt": "You will be translating text from English to Malay.\\nEnclose your output in <answer> tags.\\n\\nHere is an example.\\n\\n<input>\\nHello\\n</input>\\n<answer>\\nSelamat datang\\n</answer>\\nPlease translate the following:\\n<input>\\n{{_english_input}}\\n</input>",
      "placeholder": "Selamat datang"
    }
  }
]
</json>

Here is another example that uses the Oracle component.

<description>
Create an app that generates 5 ideas for a given topic
</description>
<thoughts>
This app will use the Input component to let the user enter a desired topic. Then an Oracle component will be used to generate the ideas for the given topic.
</thoughts>
<title>Idea Generator</title>
<json>
[
  {
    "type": "Input",
    "properties": {
      "label": "Topic",
      "id": "_topic",
      "placeholder": "Birthday"
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "label": "Ideas",
      "id": "_ideas",
      "prompt": "You will help to generate 5 ideas for a given topic.\\nYou will first think about the topic. Then, summarize your thoughts into 5 concise ideas.\\nHere is an example.\\n<topic>\\nBirthday\\n</topic>\\n<thoughts>\\nTypical birthday celebrations include parties, singing and cake. It is also appropriate to get a gift. Depending on the person, a nice birthday may also include a trip to the theme park or the beach.\\n</thoughts>\\n<answer>\\n1. Sing a birthday song\\n2. Buy a cake\\n3. Buy an appropriate gift\\n4. Plan a trip to the theme park\\n5. Plan a trip to the beach\\n</answer>\\nNow generate 5 ideas for the following topic.\\n<topic>\\n{{_topic}}\\n</topic>",
      "placeholder": "1. Sing a birthday song\\n2. Buy a cake\\n3. Buy an appropriate gift\\n4. Plan a trip to the theme park\\n5. Plan a trip to the beach"
    }
  }
]
</json>

Here is another example that uses the Output component.

<description>
Generate a random number from 1 to 10
</description>
<thoughts>
This app will use the Output component to randomly generate a number from 1 to 10 using the Math.floor and Math.random functions.
</thoughts>
<title>Random Number Generator</title>
<json>
[
  {
    "type": "Output",
    "properties": {
      "label": "Random number",
      "id": "_random",
      "function": "Math.floor(Math.random() * 10) + 1"
    }
  }
]
</json>

Here is an example that uses the Dropdown and Oracle components.

<description>
Translate from English to one of three languages - Malay, Chinese, or French
</description>
<thoughts>
This app will use an Input component to allow the user to enter English text, a Dropdown component to select the target language (Malay, Chinese or French), and an Oracle component to translate the input text to the target language.
</thoughts>
<title>Translator</title>
<json>
[
  {
    "type": "Input",
    "properties": {
      "label": "English",
      "id": "_english_input",
      "placeholder": "Hello"
    }
  },
  {
    "type": "Dropdown",
    "properties": {
      "label": "Language",
      "id": "_target_lang",
      "options": [{
        "label": "Malay",
        "value": {
          "lang": "Malay",
          "example": "Selamat datang"
        }
      }, {
        "label": "Chinese",
        "value": {
          "lang": "Chinese",
          "example": "你好"
        }
      }, {
        "label": "French",
        "value": {
          "lang": "French",
          "example": "Bonjour"
        }
      }]
    }
  },
  {
    "type": "Oracle",
    "properties": {
      "label": "Translation",
      "id": "_translation",
      "prompt": "You will be translating text from English to {{_target_lang.lang}}.\\nEnclose your output in <answer> tags.\\n\\nHere is an example.\\n\\n<input>\\nHello\\n</input>\\n<answer>\\n{{_target_lang.example}}\\n</answer>\\nPlease translate the following:\\n<input>\\n{{_english_input}}\\n</input>",
      "placeholder": "Selamat datang"
    }
  }
]
</json>

Here is an example that uses the Dropdown and Output components.

<description>
Flip a coin or roll or die
</description>
<thoughts>
This app will use a Dropdown component to allow the user to select either coin or die. Then an output component will generate a random outcome with a random method based on the selected item.
</thoughts>
<title>Coin/Die</title>
<json>
[
  {
    "type": "Dropdown",
    "properties": {
      "label": "Coin or die",
      "id": "_item",
      "options": [{
        "label": "Coin",
        "value": "coin"
      }, {
        "label": "Die",
        "value": "die"
      }]
    }
  },
  {
    "type": "Output",
    "properties": {
      "label": "Outcome",
      "id": "_outcome",
      "function": "(_item === 'coin') ? (Math.random() > 0.5 ? 'Heads' : 'Tails') : (Math.floor(Math.random() * 6) + 1)
    }
  }
]
</json>

Here is an example that uses the Tabular and Button components.

<description>
A Todo app
</description>
<thoughts>
This app will use a Tabular component to allow the user to add a list of tasks. An Input and a Button component will be used to allow the user to easily add a new task.
</thoughts>
<title>ToDo</title>
<json>
[
  {
    "type": "Tabular",
    "properties": {
      "label": "Tasks",
      "id": "_tasks",
      "columns": [{
        "label": "Description",
        "id": "_description"
      }, {
        "label": "Status",
        "id": "_status"
      }]
    }
  },
  {
    "type": "Input",
    "properties": {
      "label": "Task",
      "id": "_new_task",
      "placeholder": "Make the bed"
    }
  },
  {
    "type": "Action",
    "properties": {
      "label": "Add Task",
      "id": "_add_task",
      "function": "_tasks.push({'_description': _new_task, '_status': 'Not started'})"
    }
  }
]
</json>

Now, create an app for the following description.
First think about the components and logic required in the <thoughts> tags.
Then come up with a title for the app in the <title> tags.
Finally, create the app description and enclose it within <json> tags.

<description>
__DESCRIPTION__
</description>
`

export default MAIN_PROMPT
