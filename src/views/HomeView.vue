<script setup lang="ts">
import MainLayout from '../components/MainLayout.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

const authStore = useAuthStore()
const router = useRouter()

const navigateToRacers = () => {
  router.push('/racer-profiles')
}

const navigateToEvents = () => {
  router.push('/events')
}
</script>

<template>
  <MainLayout>
    <!-- Hero Section with Logo -->
    <v-row class="hero-section">
      <v-col cols="12" class="text-center">
        <div class="logo-container mb-6">
          <img :src="logo" alt="Run Bike Manager Logo" class="hero-logo" />
        </div>
        
        <h1 class="text-h3 font-weight-bold mb-4">
          Welcome to Run Bike Manager
        </h1>
        
        <p class="text-h6 text-medium-emphasis mb-8 max-width-600">
          The ultimate platform for managing your racers and creating exciting events. 
          Build your racing community and compete with fellow enthusiasts.
        </p>
      </v-col>
    </v-row>

    <!-- App Description Section -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="description-card">
          <v-card-title class="text-h4 text-center mb-6">
            What You Can Do
          </v-card-title>
          
          <v-row>
            <v-col cols="12" md="6" class="mb-6">
              <div class="feature-section">
                <div class="feature-icon mb-4">
                  <v-icon size="64" color="primary">mdi-account-group</v-icon>
                </div>
                <h3 class="text-h5 font-weight-bold mb-3">Manage Your Racers</h3>
                <p class="text-body-1 text-medium-emphasis">
                  Create and manage detailed profiles for all your racers. Track personal information, 
                  contact details, and racing history. Keep everything organized in one place.
                </p>
                <ul class="feature-list mt-4">
                  <li>• Complete racer profiles with personal details</li>
                  <li>• Contact information and address management</li>
                  <li>• Age and birthday tracking</li>
                  <li>• Easy profile editing and updates</li>
                </ul>
              </div>
            </v-col>
            
            <v-col cols="12" md="6" class="mb-6">
              <div class="feature-section">
                <div class="feature-icon mb-4">
                  <v-icon size="64" color="success">mdi-calendar-plus</v-icon>
                </div>
                <h3 class="text-h5 font-weight-bold mb-3">Create & Join Events</h3>
                <p class="text-body-1 text-medium-emphasis">
                  Host your own racing events or join events created by other users. 
                  Configure event settings, invite participants, and build your racing community.
                </p>
                <ul class="feature-list mt-4">
                  <li>• Create customizable racing events</li>
                  <li>• Set event rules and configurations</li>
                  <li>• Invite racers to join your events</li>
                  <li>• Join events hosted by other users</li>
                </ul>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Quick Actions Section -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="actions-card">
          <v-card-title class="text-h4 text-center mb-6">
            Get Started
          </v-card-title>
          
          <v-row>
            <v-col cols="12" md="6" class="text-center mb-4">
              <v-btn
                @click="navigateToRacers"
                color="primary"
                size="x-large"
                prepend-icon="mdi-account-plus"
                class="action-btn"
              >
                Manage Racers
              </v-btn>
              <p class="text-body-2 text-medium-emphasis mt-2">
                Create and manage your racer profiles
              </p>
            </v-col>
            
            <v-col cols="12" md="6" class="text-center mb-4">
              <v-btn
                @click="navigateToEvents"
                color="success"
                size="x-large"
                prepend-icon="mdi-calendar-plus"
                class="action-btn"
              >
                Create Events
              </v-btn>
              <p class="text-body-2 text-medium-emphasis mt-2">
                Host events and invite other racers
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features Grid -->
    <v-row class="mt-8">
      <v-col cols="12">
        <v-card class="features-card">
          <v-card-title class="text-h4 text-center mb-6">
            Key Features
          </v-card-title>
          
          <v-row>
            <v-col cols="12" sm="6" md="3" class="text-center mb-4">
              <v-icon size="48" color="primary" class="mb-3">mdi-account-multiple</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">Racer Management</h4>
              <p class="text-body-2 text-medium-emphasis">
                Complete profiles with personal details and contact information
              </p>
            </v-col>
            
            <v-col cols="12" sm="6" md="3" class="text-center mb-4">
              <v-icon size="48" color="success" class="mb-3">mdi-calendar-multiple</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">Event Creation</h4>
              <p class="text-body-2 text-medium-emphasis">
                Create customizable events with flexible configuration options
              </p>
            </v-col>
            
            <v-col cols="12" sm="6" md="3" class="text-center mb-4">
              <v-icon size="48" color="info" class="mb-3">mdi-account-group</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">Community</h4>
              <p class="text-body-2 text-medium-emphasis">
                Connect with other racers and join events in your area
              </p>
            </v-col>
            
            <v-col cols="12" sm="6" md="3" class="text-center mb-4">
              <v-icon size="48" color="warning" class="mb-3">mdi-cog</v-icon>
              <h4 class="text-h6 font-weight-bold mb-2">Customizable</h4>
              <p class="text-body-2 text-medium-emphasis">
                Flexible event settings to match your racing preferences
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </MainLayout>
</template>

<style scoped>
.hero-section {
  padding: 2rem 0;
  text-align: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-logo {
  max-width: 200px;
  height: auto;
  object-fit: contain;
}

.max-width-600 {
  max-width: 600px;
  margin: 0 auto;
}

.description-card,
.actions-card,
.features-card {
  background: linear-gradient(135deg, #F2E8C6 0%, #DAD4B5 100%);
  border: 1px solid #DAD4B5;
  border-radius: 16px;
}

.feature-section {
  padding: 1rem;
  height: 100%;
}

.feature-icon {
  display: flex;
  justify-content: center;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  margin-bottom: 0.5rem;
  color: #800000;
  font-weight: 500;
}

.action-btn {
  min-width: 200px;
  height: 56px;
  font-size: 1.1rem;
  font-weight: 600;
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .hero-logo {
    max-width: 150px;
  }
  
  .text-h3 {
    font-size: 1.75rem !important;
  }
  
  .text-h4 {
    font-size: 1.5rem !important;
  }
  
  .action-btn {
    min-width: 100%;
    margin-bottom: 1rem;
  }
}

/* Ensure proper spacing */
:deep(.v-row) {
  margin: 0 !important;
}

:deep(.v-col) {
  padding: 0.5rem !important;
}

@media (min-width: 600px) {
  :deep(.v-col) {
    padding: 1rem !important;
  }
}
</style> 