import Input from '@/components/components/Input.vue'
import Oracle from '@/components/components/Oracle.vue'
import Output from '@/components/components/Output.vue'
import Table from '@/components/components/Table.vue'
import { Component } from 'vue'

export const COMPONENTS = {
    "Input": Input,
    "Oracle": Oracle,
    "Output": Output,
    "Table": Table,
} as {[k: string]: Component}
