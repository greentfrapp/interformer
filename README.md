# interformer

## Quick start

```
npm i
npm run dev
```

Enter OpenAI or Gemini API keys in the Settings tab and switch the Backend dropdown accordingly. Then try one of the sample prompts below.

Click on the 3 dots on the top right to hide/show the Settings tab.

For each app, click on the 3 dots to hide/show the configuration.

The crux of the logic lies in `src/utils/mainPrompt.ts` and the "component interpreters" in the `src/components/components` folder. 

## Sample prompts

- Convert from celsius to kelvin or farenheit
- Translate from English to 5 other languages via a dropdown
- A shopping list

## ToDo

- Use esprima or acorn for parsing app descriptions before execution
