<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <v-card class="pa-4">
    <v-card-title class="text-h4 mb-4">
      {{ msg }}
    </v-card-title>

    <v-card-text>
      <v-btn 
        color="primary" 
        @click="count++"
        class="mb-4"
      >
        Count is {{ count }}
      </v-btn>
      
      <v-alert 
        type="info" 
        variant="tonal"
        class="mb-4"
      >
        Edit <code>components/HelloWorld.vue</code> to test HMR
      </v-alert>

      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-link</v-icon>
          </template>
          <v-list-item-title>
            <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
              create-vue
            </a>
            , the official Vue + Vite starter
          </v-list-item-title>
        </v-list-item>
        
        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-ide-support</v-icon>
          </template>
          <v-list-item-title>
            Learn more about IDE Support for Vue in the
            <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">
              Vue Docs Scaling up Guide
            </a>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Custom styles can be added here */
</style>
