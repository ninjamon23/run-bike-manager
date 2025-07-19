<script setup lang="ts">
import MainLayout from '../components/MainLayout.vue'
import { useRaceProfileStore } from '../stores/raceProfile'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RacerProfile } from '../models/racer.profile.model'

const router = useRouter()
const raceProfileStore = useRaceProfileStore()
const showCreateDialog = ref(false)
const selectedProfile = ref<RacerProfile | null>(null)

// Form data for creating new racer profile
const newRacerProfile = ref({
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: ''
})

// Form validation rules
const rules = {
  firstName: [(v: string) => !!v || 'First name is required'],
  lastName: [(v: string) => !!v || 'Last name is required']
}

const handleCreateRacerProfile = async () => {
  try {
    const profileData = {
      firstName: newRacerProfile.value.firstName,
      lastName: newRacerProfile.value.lastName,
      birthDate: new Date(newRacerProfile.value.birthDate),
      phone: newRacerProfile.value.phone,
      address: newRacerProfile.value.address,
      city: newRacerProfile.value.city,
      state: newRacerProfile.value.state,
      zip: newRacerProfile.value.zip
    }
    
    await raceProfileStore.createRacerProfile(profileData)
    showCreateDialog.value = false
    
    // Reset form
    newRacerProfile.value = {
      firstName: '',
      lastName: '',
      birthDate: new Date(),
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    }
  } catch (error) {
    console.error('Error creating racer profile:', error)
  }
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString()
}

const getAge = (birthDate: Date) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

// Navigate to racer profile detail page
const navigateToProfile = (profile: RacerProfile) => {
  router.push(`/racer-profile/${profile.id}`)
}

// Check if profile has any address information
const hasAddress = (profile: RacerProfile) => {
  return profile.address || profile.city || profile.state || profile.zip
}

// Format address for display
const formatAddress = (profile: RacerProfile) => {
  const parts = [
    profile.address,
    profile.city,
    profile.state,
    profile.zip
  ].filter(Boolean)
  return parts.join(', ')
}

onMounted(async () => {
  await raceProfileStore.getRacerProfiles()
})
</script>

<template>
  <MainLayout>
    <v-row class="mt-4">
      <v-col cols="12">
        <h2 class="text-h5 mb-4" style="color: #800000;">Racer Profiles</h2>
        
        <!-- Skeleton Loading -->
        <div v-if="raceProfileStore.loading" class="skeleton-container">
          <div v-for="i in 3" :key="i" class="skeleton-item">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-subtitle"></div>
              <div class="skeleton-subtitle-short"></div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="raceProfileStore.racerProfiles.length === 0" class="text-center pa-8">
          <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-account-group</v-icon>
          <h3 class="text-h6 text-grey">No racer profiles yet</h3>
          <p class="text-body-2 text-grey">Create your first racer profile to get started!</p>
        </div>
        
        <!-- Racer Profiles List -->
        <div v-else>
          <template v-for="(profile, index) in raceProfileStore.racerProfiles" :key="profile.id">
            <v-list-item
              class="mb-3 racer-list-item"
              @click="navigateToProfile(profile)"
            >
              <template v-slot:prepend>
                <v-avatar 
                  color="primary" 
                  size="large"
                  class="cursor-pointer"
                  @click.stop="navigateToProfile(profile)"
                >
                  <span class="text-h6">{{ profile.firstName.charAt(0) }}{{ profile.lastName.charAt(0) }}</span>
                </v-avatar>
              </template>
              
              <v-list-item-title class="text-h6">
                {{ profile.firstName }} {{ profile.lastName }}
              </v-list-item-title>
              
              <v-list-item-subtitle>
                Age: {{ getAge(profile.birthDate) }} • {{ profile.phone }}
              </v-list-item-subtitle>
              
              <v-list-item-subtitle class="mt-1" v-if="hasAddress(profile)">
                {{ formatAddress(profile) }}
              </v-list-item-subtitle>
              
              <template v-slot:append>
                <!-- Removed edit and delete buttons for better UX -->
              </template>
            </v-list-item>
            
            <!-- Divider between items (except after the last one) -->
            <div 
              v-if="index < raceProfileStore.racerProfiles.length - 1" 
              class="racer-divider"
            ></div>
          </template>
        </div>
      </v-col>
    </v-row>

    <!-- Floating Action Button for Add Racer Profile -->
    <v-btn
      color="primary"
      icon="mdi-plus"
      size="large"
      class="fab-button"
      @click="showCreateDialog = true"
    />

    <!-- Create Racer Profile Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="600">
      <v-card>
        <v-card-title>Create New Racer Profile</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleCreateRacerProfile">
            <v-text-field
              v-model="newRacerProfile.firstName"
              label="First Name"
              :rules="rules.firstName"
              required
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.lastName"
              label="Last Name"
              :rules="rules.lastName"
              required
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.birthDate"
              label="Birth Date"
              type="date"
              required
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.phone"
              label="Phone Number"
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.address"
              label="Address"
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.city"
              label="City"
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.state"
              label="State"
              class="mb-4"
            />
            
            <v-text-field
              v-model="newRacerProfile.zip"
              label="ZIP Code"
              class="mb-4"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="showCreateDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="handleCreateRacerProfile"
            :loading="raceProfileStore.loading"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </MainLayout>
</template>

<style scoped>
.fab-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: #800000 !important;
  color: #F2E8C6 !important;
}

.fab-button:hover {
  background: #982B1C !important;
}

/* Racer List Item Styling */
.racer-list-item {
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: transparent;
}

.racer-list-item:hover {
  background: rgba(218, 212, 181, 0.1);
  transform: translateY(-1px);
}

.racer-avatar {
  background: #800000 !important;
  color: #F2E8C6 !important;
}

.racer-name {
  color: #800000;
}

.racer-details {
  color: #982B1C;
}

.edit-btn {
  color: #800000 !important;
}

.delete-btn {
  color: #982B1C !important;
}

.dialog-title {
  color: #800000;
}

.form-field {
  background: #F2E8C6;
}

.form-field:focus {
  background: #DAD4B5;
}

.primary-btn {
  background: #800000 !important;
  color: #F2E8C6 !important;
}

.primary-btn:hover {
  background: #982B1C !important;
}

.secondary-btn {
  color: #982B1C !important;
}

/* Skeleton Loading Styles */
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #F2E8C6;
  border-radius: 12px;
  border: 1px solid #DAD4B5;
}

.skeleton-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(90deg, #DAD4B5 25%, #F2E8C6 50%, #DAD4B5 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-title {
  height: 24px;
  width: 60%;
  border-radius: 4px;
  background: linear-gradient(90deg, #DAD4B5 25%, #F2E8C6 50%, #DAD4B5 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-subtitle {
  height: 16px;
  width: 80%;
  border-radius: 4px;
  background: linear-gradient(90deg, #DAD4B5 25%, #F2E8C6 50%, #DAD4B5 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-subtitle-short {
  height: 16px;
  width: 50%;
  border-radius: 4px;
  background: linear-gradient(90deg, #DAD4B5 25%, #F2E8C6 50%, #DAD4B5 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Racer Divider */
.racer-divider {
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #800000 0px,
    #800000 4px,
    transparent 4px,
    transparent 8px
  );
  margin: 16px 0;
  opacity: 0.8;
}
</style> 