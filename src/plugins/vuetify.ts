import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#800000',
          secondary: '#982B1C',
          accent: '#DAD4B5',
          background: '#F2E8C6',
          surface: '#F2E8C6',
          error: '#982B1C',
          warning: '#982B1C',
          info: '#800000',
          success: '#800000',
          'on-primary': '#F2E8C6',
          'on-secondary': '#F2E8C6',
          'on-accent': '#800000',
          'on-background': '#800000',
          'on-surface': '#800000',
          'on-error': '#F2E8C6',
          'on-warning': '#F2E8C6',
          'on-info': '#F2E8C6',
          'on-success': '#F2E8C6'
        }
      }
    }
  }
})

export default vuetify 