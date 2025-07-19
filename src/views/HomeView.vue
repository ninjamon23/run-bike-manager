<script setup lang="ts">
import MainLayout from '../components/MainLayout.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <MainLayout>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-h4">
            Welcome back, {{ authStore.user?.name }}!
          </v-card-title>
          <v-card-text>
            <p class="text-body-1">
              Manage your running and biking activities with ease.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="4">
        <v-card color="primary" dark>
          <v-card-title>
            <v-icon start>mdi-run</v-icon>
            Running Activities
          </v-card-title>
          <v-card-text>
            <div class="text-h4">12</div>
            <div class="text-body-2">This month</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="success" dark>
          <v-card-title>
            <v-icon start>mdi-bike</v-icon>
            Biking Activities
          </v-card-title>
          <v-card-text>
            <div class="text-h4">8</div>
            <div class="text-body-2">This month</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card color="info" dark>
          <v-card-title>
            <v-icon start>mdi-map-marker-distance</v-icon>
            Total Distance
          </v-card-title>
          <v-card-text>
            <div class="text-h4">156 km</div>
            <div class="text-body-2">This month</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Recent Activities</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(activity, index) in [
                  { type: 'Running', distance: '5.2 km', time: '25 min', date: 'Today' },
                  { type: 'Biking', distance: '15.8 km', time: '45 min', date: 'Yesterday' },
                  { type: 'Running', distance: '3.1 km', time: '18 min', date: '2 days ago' }
                ]"
                :key="index"
              >
                <template v-slot:prepend>
                  <v-icon :color="activity.type === 'Running' ? 'primary' : 'success'">
                    {{ activity.type === 'Running' ? 'mdi-run' : 'mdi-bike' }}
                  </v-icon>
                </template>
                <v-list-item-title>{{ activity.type }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ activity.distance }} • {{ activity.time }} • {{ activity.date }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Quick Actions</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  color="primary"
                  prepend-icon="mdi-plus"
                  class="mb-2"
                >
                  Add Run
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  color="success"
                  prepend-icon="mdi-plus"
                  class="mb-2"
                >
                  Add Bike
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  variant="outlined"
                  prepend-icon="mdi-chart-line"
                  class="mb-2"
                >
                  View Stats
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  variant="outlined"
                  prepend-icon="mdi-calendar"
                  class="mb-2"
                >
                  Schedule
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </MainLayout>
</template>

<style scoped>
.h-100 {
  height: 100%;
}

.welcome-section,
.stats-section,
.content-section {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

/* Mobile optimizations */
@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.25rem !important;
  }
  
  .v-card-text {
    padding: 0.75rem !important;
  }
  
  .v-list-item {
    padding: 0.5rem 0 !important;
  }
}

/* Tablet optimizations */
@media (min-width: 601px) and (max-width: 960px) {
  .v-card-title {
    font-size: 1.5rem !important;
  }
}

/* Ensure no horizontal scroll */
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