declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuetify/styles' {
  const content: any
  export default content
}

declare module 'vuetify/components' {
  const components: any
  export * from 'vuetify/components'
}

declare module 'vuetify/directives' {
  const directives: any
  export * from 'vuetify/directives'
} 