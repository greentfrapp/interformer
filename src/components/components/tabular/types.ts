type Column = {
  label: string
  id: string
}

export type TabularProperties = {
  id: string
  label: string
  columns: Column[]
}

export type TabularType = {
  type: 'Tabular'
  properties: TabularProperties
}
