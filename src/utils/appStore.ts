import { defineStore } from 'pinia'
import sampleApp from './sampleApp.json'
import MAIN_PROMPT from './mainPrompt'
import { generateAPI as generateOpenAIAPI } from './openai'
import { generateAPI as generateGeminiAPI } from './gemini'
import { ComponentType } from './components'
import { useStorage } from '@vueuse/core'

function getRandomAlphanumericId(numChars: number = 5) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  let id = ''
  while (id.length < numChars) {
    id += chars[Math.floor(Math.random() * chars.length) + 1]
  }
  return id
}

type App = {
  id: string
  title: string
  description: string
  app: ComponentType[]
}

export const useAppStore = defineStore(
  'app', {
    state: () => ({
      apps: useStorage('interformerApps', [] as App[]),
      states: useStorage('interformerAppStates', [] as any),
      editAppIndex: -1,
      openAIAPIKey: useStorage('interformerOpenAIAPIKey', ''),
      geminiAPIKey: useStorage('interformerGeminiAIAPIKey', ''),
      backend: useStorage('interformerBackend', 'OpenAI' as 'OpenAI' | 'Gemini'),
    }),
    getters: {
      generateAPI(state) {
        return state.backend === 'OpenAI' ? generateOpenAIAPI : generateGeminiAPI
      },
      apiKey(state) {
        return state.backend === 'OpenAI' ? state.openAIAPIKey : state.geminiAPIKey
      },
    },
    actions: {
      initAppState(app: ComponentType[]) {
        return Object.fromEntries(
          app.filter(
            c => ['Input', 'Dropdown', 'Oracle', 'Tabular'].includes(c.type)
          ).map(c => {
            if (c.type === 'Input') {
              return [c.properties.id, c.properties.placeholder]
            } else if (c.type === 'Dropdown') {
              return [c.properties.id, c.properties.options[0].value]
            } else if (c.type === 'Oracle') {
              return [c.properties.id, c.properties.placeholder]
            } else if (c.type === 'Tabular') {
              return [c.properties.id, [
                Object.fromEntries(
                  c.properties.columns.map(c => [c.id, ''])
                )
              ]]
            } else {
              throw 'Invalid component'
            }
          })
        )
      },
      init() {
        if (this.apps.length) return
        this.reset()
      },
      reset() {
        this.apps = [
          {
            id: 'aaaaa',
            title: 'Sample',
            description: 'A sample app',
            app: sampleApp as ComponentType[],
          }
        ]
        this.states = this.apps.map(app => this.initAppState(app.app))
      },
      async createApp(query: string) {
        const result = await this.generateAPI(MAIN_PROMPT.replace('__DESCRIPTION__', query), 0.0, this.apiKey)
        console.log(result)
        if (result && result.result) {
          const rgx = /<title>(?<title>(.|\n)*?)<\/title>(.|\n)*?<json>(?<json>(.|\n)*?)<\/json>/
          const found = result.result.match(rgx)
          if (found && found.groups) {
            const app = JSON.parse(found.groups.json) as any[]
            this.apps.push({
              id: getRandomAlphanumericId(),
              title: found.groups.title,
              description: query,
              app,
            })
            this.states.push(this.initAppState(app))
          }
        }
      },
      editApp(appIndex: number) {
        if (this.editAppIndex === appIndex) this.editAppIndex = -1
        else this.editAppIndex = appIndex
      },
      deleteApp(appIndex: number) {
        this.apps.splice(appIndex, 1)
        this.states.splice(appIndex, 1)
      }
    }
  }
)
