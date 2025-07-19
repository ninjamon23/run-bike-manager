<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import logo from '../assets/logo.png'

const router = useRouter()
const authStore = useAuthStore()

const error = ref('')

const handleGoogleLogin = async () => {
  error.value = ''
  
  try {
    const result = await authStore.login()
    if (result.success) {
      router.push('/home')
    } else {
      error.value = result.error || 'Login failed'
    }
  } catch (err) {
    error.value = 'An error occurred during login'
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="logo-container mb-6">
        <img :src="logo" alt="Run Bike Manager Logo" class="logo" />
      </div>
      
      <h1 class="text-h4 mb-4">Run Bike Manager</h1>
      
      <p class="text-body-1 text-medium-emphasis mb-8 app-description">
        The ultimate platform for managing your racers and creating exciting events. 
        Build your racing community and compete with fellow enthusiasts.
      </p>
      
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        {{ error }}
      </v-alert>
      
      <v-btn
        @click="handleGoogleLogin"
        :loading="authStore.loading"
        color="primary"
        size="large"
        block
        prepend-icon="mdi-google"
        class="mb-4"
      >
        Sign in with Google
      </v-btn>
      
      <v-divider class="my-4" />
      
      <div class="text-center text-body-2 text-medium-emphasis">
        <p>Sign in with your Google account to continue</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #ffffff !important;
  color: #213547 !important;
}

.login-content {
  max-width: 400px;
  width: 100%;
  text-align: center;
  background-color: #ffffff;
  color: #213547;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-width: 280px;
  height: auto;
  object-fit: contain;
}

.app-description {
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
  color: #666;
}

/* Override any Vuetify dark theme styles */
:deep(.v-application) {
  background-color: #ffffff !important;
}

:deep(.v-main) {
  background-color: #ffffff !important;
}
</style> 