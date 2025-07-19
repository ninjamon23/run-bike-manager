<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const drawer = ref(false)
const rail = ref(false)
const accountMenu = ref(false)

const menuItems = [
  { title: 'Home', icon: 'mdi-home', route: '/home' },
  { title: 'My Racers', icon: 'mdi-account-group', route: '/racer-profiles' }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleProfile = () => {
  // Placeholder: You can route to a profile page if you have one
  // router.push('/profile')
  alert('Profile clicked!')
}

const navigateTo = (route: string) => {
  router.push(route)
}

const toggleRail = () => {
  rail.value = !rail.value
}
</script>

<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      temporary
      @click="rail = false"
    >
      <!-- Navigation Menu Only -->
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          @click="navigateTo(item.route)"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>Run Bike</v-app-bar-title>
      <v-spacer />
      <v-menu
        v-model="accountMenu"
        :close-on-content-click="false"
        location="bottom end"
        offset-y
        :activator="null"
      >
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="profile-btn">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card class="profile-menu">
          <v-list>
            <v-list-item @click="handleProfile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleLogout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container :fluid="$vuetify.display.smAndDown" class="pa-0">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: #F2E8C6;
}

.v-navigation-drawer {
  transition: width 0.3s ease;
  background-color: #DAD4B5 !important;
}

.v-app-bar {
  background: linear-gradient(135deg, #800000 0%, #982B1C 100%) !important;
}

.v-list-item {
  color: #800000 !important;
}

.v-list-item:hover {
  background-color: #F2E8C6 !important;
}

.v-list-item--active {
  background-color: #800000 !important;
  color: #F2E8C6 !important;
}

.v-app-bar-title {
  color: #F2E8C6 !important;
}

.v-btn {
  color: #F2E8C6 !important;
}

.profile-btn {
  color: #F2E8C6 !important;
}

.profile-menu {
  background-color: #F2E8C6 !important;
  border: 1px solid #DAD4B5 !important;
  box-shadow: 0 4px 12px rgba(128, 0, 0, 0.15) !important;
}

.profile-menu .v-list {
  background-color: #F2E8C6 !important;
  padding: 0 !important;
}

.profile-menu .v-list-item {
  color: #800000 !important;
  padding: 12px 16px !important;
}

.profile-menu .v-list-item:hover {
  background-color: #DAD4B5 !important;
}

.profile-menu .v-list-item-title {
  color: #800000 !important;
  font-weight: 500 !important;
}

.v-menu {
  background-color: transparent !important;
}
</style> 