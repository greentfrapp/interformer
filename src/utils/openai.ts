import OpenAI from "openai"

const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })

export async function generateAPI(query: string, temperature: number = 0.0, apiKey: string | null = null) {
  if (apiKey) openai.apiKey = apiKey
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: query },
    ],
    model: 'gpt-4o-2024-05-13',
    temperature,
  })
  console.log(completion.usage)
  return { 
    success: true,
    result: completion.choices[0].message.content,
  }
}
