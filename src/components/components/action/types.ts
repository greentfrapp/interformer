export type ActionProperties = {
  id: string
  label: string
  function: string
}

export type ActionType = {
  type: 'Action'
  properties: ActionProperties
}
