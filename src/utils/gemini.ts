import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateAPI(query: string, temperature: number = 0.0, apiKey: string | null = null) {

  const genAI = new GoogleGenerativeAI(apiKey || '')
  const model = genAI.getGenerativeModel({
    model: 'gemini-pro',
    generationConfig: {
      temperature,
    },
  })
  const result = await model.generateContent(query)
  const text = result.response.text()

  return {
    success: true,
    result: text,
  }
}
