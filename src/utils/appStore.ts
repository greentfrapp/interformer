import { defineStore } from 'pinia'
import sampleApp from './sampleApp.json'
import { APP_TEMPLATE, generateAPI } from './api'

export const useAppStore = defineStore(
  'app', {
    state: () => ({
      appJson: sampleApp,
      state: {} as any,
    }),
    getters: {
    },
    actions: {
      init() {
        this.state = Object.fromEntries(
          this.appJson.filter(c => c.type === 'Input').map(c => [c.properties?.id, '1'])
        )
      },
      async createApp(query: string) {
        const result = await generateAPI(APP_TEMPLATE.replace('__DESCRIPTION__', query))
        console.log(result)
        if (result) {
          const rgx = /<json>(?<json>(.|\n)*?)<\/json>/
          const found = result.result.match(rgx)
          if (found.groups) {
            this.appJson = JSON.parse(found.groups.json)
            this.init()
          }
        }
      },
    }
  }
)
