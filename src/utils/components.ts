import { Dropdown, DropdownInfo, DropdownType } from '@/components/components/dropdown'
import { Input, InputInfo, InputType } from '@/components/components/input'
import { Oracle, OracleInfo, OracleType } from '@/components/components/oracle'
import { Output, OutputInfo, OutputType } from '@/components/components/output'
import { Tabular, TabularInfo, TabularType } from '@/components/components/tabular'
import { Component } from 'vue'

export const COMPONENTS = {
  "Dropdown": Dropdown,
  "Input": Input,
  "Oracle": Oracle,
  "Output": Output,
  "Tabular": Tabular,
} as {[k: string]: Component}

export const COMPONENT_INFO_CARDS = {
  "Dropdown": DropdownInfo,
  "Input": InputInfo,
  "Oracle": OracleInfo,
  "Output": OutputInfo,
  "Tabular": TabularInfo,
} as {[k: string]: Component}

export type ComponentType =
  | DropdownType
  | InputType
  | OracleType
  | OutputType 
  | TabularType
