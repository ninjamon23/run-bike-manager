<template>
  <MainLayout>
    <div class="racer-profile-container">
      <!-- Back Button -->
      <div class="back-button-container">
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          color="primary"
          size="large"
          @click="goBack"
          class="back-btn"
        />
        <span class="back-text">Back to Racers</span>
      </div>

      <!-- Details Card -->
      <div class="details-card">
        <!-- Personal Info Section -->
        <div class="info-section">
          <h3 class="section-title">Personal Info</h3>
          <div class="info-grid">
            <div class="info-item">
              <v-icon color="primary" class="mr-2">mdi-account</v-icon>
              <span class="info-label">Name:</span>
              <span class="info-value">{{ racerProfile?.firstName }} {{ racerProfile?.lastName }}</span>
            </div>
            <div class="info-item">
              <v-icon color="primary" class="mr-2">mdi-calendar</v-icon>
              <span class="info-label">Birthday:</span>
              <span class="info-value">{{ formatDate(racerProfile?.birthDate) }}</span>
              <span class="info-age">({{ getAge(racerProfile?.birthDate) }} years old)</span>
            </div>
            <div class="info-item" v-if="racerProfile?.phone">
              <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
              <span class="info-label">Phone:</span>
              <span class="info-value">{{ racerProfile.phone }}</span>
            </div>
          </div>
        </div>

        <!-- Address Section -->
        <div class="info-section" v-if="hasAddress">
          <h3 class="section-title">Address</h3>
          <div class="address-info">
            <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
            <span>{{ formatAddress() }}</span>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="info-section">
          <h3 class="section-title">Profile Stats</h3>
          <div class="stats-grid">
            <div class="stat-item">
              <v-icon color="primary" class="stat-icon">mdi-calendar</v-icon>
              <div class="stat-content">
                <div class="stat-label">Member Since</div>
                <div class="stat-value">{{ formatDate(racerProfile?.createdAt) }}</div>
              </div>
            </div>
            <div class="stat-item">
              <v-icon color="primary" class="stat-icon">mdi-update</v-icon>
              <div class="stat-content">
                <div class="stat-label">Last Updated</div>
                <div class="stat-value">{{ formatDate(racerProfile?.updatedAt) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <v-btn
            color="primary"
            prepend-icon="mdi-pencil"
            variant="flat"
            size="large"
            @click="openEditDialog"
            class="action-btn"
          >
            Edit Profile
          </v-btn>
          <v-btn
            color="error"
            prepend-icon="mdi-delete"
            variant="outlined"
            size="large"
            @click="handleDelete"
            class="action-btn"
          >
            Delete Profile
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Edit Dialog -->
    <v-dialog v-model="showEditDialog" max-width="600">
      <v-card>
        <v-card-title>Edit Racer Profile</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleEditRacerProfile">
            <v-text-field
              v-model="editRacerProfile.firstName"
              label="First Name"
              :rules="rules.firstName"
              required
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.lastName"
              label="Last Name"
              :rules="rules.lastName"
              required
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.birthDate"
              label="Birth Date"
              type="date"
              required
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.phone"
              label="Phone Number"
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.address"
              label="Address"
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.city"
              label="City"
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.state"
              label="State"
              class="mb-4"
            />
            
            <v-text-field
              v-model="editRacerProfile.zip"
              label="ZIP Code"
              class="mb-4"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="showEditDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="handleEditRacerProfile"
            :loading="raceProfileStore.loading"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import { useRaceProfileStore } from '../stores/raceProfile'
import type { RacerProfile } from '../models/racer.profile.model'

const route = useRoute()
const router = useRouter()
const raceProfileStore = useRaceProfileStore()

const racerProfile = ref<RacerProfile | null>(null)
const showEditDialog = ref(false)
const editRacerProfile = ref<Partial<RacerProfile>>({})

// Form validation rules
const rules = {
  firstName: [(v: string) => !!v || 'First name is required'],
  lastName: [(v: string) => !!v || 'Last name is required']
}

// Computed properties
const hasAddress = computed(() => {
  return racerProfile.value?.address || racerProfile.value?.city || racerProfile.value?.state || racerProfile.value?.zip
})

// Methods
const getAge = (birthDate: Date | undefined) => {
  if (!birthDate) return 'N/A'
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age.toString()
}

const formatAddress = () => {
  if (!racerProfile.value) return ''
  const parts = [
    racerProfile.value.address,
    racerProfile.value.city,
    racerProfile.value.state,
    racerProfile.value.zip
  ].filter(Boolean)
  return parts.join(', ')
}

const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
}

const openEditDialog = () => {
  if (racerProfile.value) {
    // Only copy the fields that should be editable
    editRacerProfile.value = {
      firstName: racerProfile.value.firstName,
      lastName: racerProfile.value.lastName,
      birthDate: racerProfile.value.birthDate,
      phone: racerProfile.value.phone,
      address: racerProfile.value.address,
      city: racerProfile.value.city,
      state: racerProfile.value.state,
      zip: racerProfile.value.zip
    }
    showEditDialog.value = true
  }
}

const handleEditRacerProfile = async () => {
  if (!racerProfile.value) return
  
  try {
    await raceProfileStore.updateRacerProfile(racerProfile.value.id, editRacerProfile.value)
    const updatedProfile = await raceProfileStore.getRacerProfileById(racerProfile.value.id)
    if (updatedProfile) {
      racerProfile.value = updatedProfile
    }
    showEditDialog.value = false
  } catch (error) {
    console.error('Error updating racer profile:', error)
  }
}

const handleDelete = async () => {
  if (!racerProfile.value) return
  
  if (confirm('Are you sure you want to delete this racer profile?')) {
    try {
      await raceProfileStore.deleteRacerProfile(racerProfile.value.id, 'User deleted profile')
      router.push('/racer-profiles')
    } catch (error) {
      console.error('Error deleting racer profile:', error)
    }
  }
}

const goBack = () => {
  router.push('/racer-profiles')
}

onMounted(async () => {
  const profileId = route.params.id as string
  if (profileId) {
    try {
      const profile = await raceProfileStore.getRacerProfileById(profileId)
      if (profile) {
        racerProfile.value = profile
      } else {
        router.push('/racer-profiles')
      }
    } catch (error) {
      console.error('Error loading racer profile:', error)
      router.push('/racer-profiles')
    }
  }
})
</script>

<style scoped>
.racer-profile-container {
  min-height: 100vh;
  background: #F2E8C6;
  position: relative;
  padding: 24px;
}

.back-button-container {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.back-btn {
  margin-right: 8px;
}

.back-text {
  font-size: 1rem;
  font-weight: 500;
  color: #800000;
}

.details-card {
  background: #F2E8C6;
  border-radius: 16px;
  padding: 32px 24px;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 48px);
  box-shadow: 0 4px 12px rgba(128, 0, 0, 0.1);
}

.info-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #800000;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #DAD4B5;
  border-radius: 12px;
  border-left: 4px solid #800000;
}

.info-label {
  font-weight: 600;
  color: #982B1C;
  margin-right: 8px;
  min-width: 60px;
}

.info-value {
  font-weight: 500;
  color: #800000;
}

.info-age {
  font-weight: 500;
  color: #982B1C;
}

.address-info {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #DAD4B5;
  border-radius: 12px;
  border-left: 4px solid #800000;
  font-weight: 500;
  color: #800000;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #DAD4B5;
  border-radius: 12px;
  border: 2px solid #982B1C;
}

.stat-icon {
  margin-right: 12px;
  font-size: 1.5rem;
  color: #800000;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #982B1C;
  font-weight: 500;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1rem;
  color: #800000;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

.action-btn {
  flex: 1;
  height: 48px;
}

@media (max-width: 600px) {
  .details-card {
    padding: 24px 16px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style> 