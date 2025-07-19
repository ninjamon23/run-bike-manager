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
  { title: 'Home', icon: 'mdi-home', route: '/home' }
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
      permanent
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
      <v-app-bar-title>Run Bike Manager</v-app-bar-title>
      <v-spacer />
      <v-menu
        v-model="accountMenu"
        :close-on-content-click="false"
        location="bottom end"
        offset-y
      >
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleProfile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-main {
  background-color: #f5f5f5;
}

.v-navigation-drawer {
  transition: width 0.3s ease;
}
</style> 