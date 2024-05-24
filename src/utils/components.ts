import Dropdown from '@/components/components/Dropdown.vue'
import Input from '@/components/components/Input.vue'
import Oracle from '@/components/components/Oracle.vue'
import Output from '@/components/components/Output.vue'
// import Table from '@/components/components/Table.vue'
import { Component } from 'vue'

export const COMPONENTS = {
  "Dropdown": Dropdown,
  "Input": Input,
  "Oracle": Oracle,
  "Output": Output,
  // "Table": Table,
} as {[k: string]: Component}

type DropdownType = {
  type: 'Dropdown'
  properties: {
    label: string
    id: string
    options: any[]
  }
}

type InputType = {
  type: 'Input'
  properties: {
    label: string
    id: string
    placeholder: string
  }
}

type OracleType =  {
  type: 'Oracle'
  properties: {
    label: string
    id: string
    prompt: string
    placeholder: string
  }
}

type OutputType = {
  type: 'Output'
  properties: {
    label: string
    id: string
    function: string
  }
}

export type ComponentType =
  | DropdownType
  | InputType
  | OracleType
  | OutputType 
