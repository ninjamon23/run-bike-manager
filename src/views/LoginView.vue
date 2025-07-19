<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

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
      <h1 class="text-h4 mb-8">Run Bike Manager</h1>
      
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
}

/* Override any Vuetify dark theme styles */
:deep(.v-application) {
  background-color: #ffffff !important;
}

:deep(.v-main) {
  background-color: #ffffff !important;
}
</style> 