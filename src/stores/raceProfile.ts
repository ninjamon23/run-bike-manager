import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RacerProfile } from '../models/racer.profile.model'
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuthStore } from './auth'
import { FIREBASE_COLLECTIONS } from '../constants/firebase'

export const useRaceProfileStore = defineStore('raceProfile', () => {
  const racerProfiles = ref<RacerProfile[]>([])
  const loading = ref(false)
  const authStore = useAuthStore()

  // Convert Firestore document to RacerProfile
  const docToRacerProfile = (doc: QueryDocumentSnapshot<DocumentData>): RacerProfile => {
    try {
      const data = doc.data()
      
      console.log('Raw document data:', data)
      console.log('firstName type:', typeof data.firstName)
      console.log('firstName value:', data.firstName)
      
      // Helper function to safely convert date fields
      const convertDate = (dateField: any): Date | undefined => {
        if (!dateField) return undefined
        
        console.log('Converting date field:', dateField, 'type:', typeof dateField)
        
        // If it's a Firestore Timestamp
        if (dateField.toDate && typeof dateField.toDate === 'function') {
          console.log('Converting Firestore Timestamp')
          return dateField.toDate()
        }
        
        // If it's already a Date object
        if (dateField instanceof Date) {
          console.log('Converting Date object')
          return dateField
        }
        
        // If it's a string or timestamp number
        if (typeof dateField === 'string' || typeof dateField === 'number') {
          console.log('Converting string/number to Date')
          return new Date(dateField)
        }
        
        console.log('Could not convert date field')
        return undefined
      }
      
      return {
        id: doc.id,
        firstName: data.firstName || data.name?.split(' ')[0] || '',
        lastName: data.lastName || data.name?.split(' ').slice(1).join(' ') || '',
        birthDate: convertDate(data.birthDate) || new Date(),
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
        createdAt: convertDate(data.createdAt),
        updatedAt: convertDate(data.updatedAt),
        deletedAt: convertDate(data.deletedAt),
        deletedBy: data.deletedBy || '',
        deletedReason: data.deletedReason || ''
      }
    } catch (error) {
      console.error('Error in docToRacerProfile:', error)
      console.error('Document ID:', doc.id)
      console.error('Document data:', doc.data())
      throw error
    }
  }

  // Get all racer profiles for the current user
  const getRacerProfiles = async () => {
    if (!authStore.user) {
      console.error('No authenticated user')
      return []
    }

    loading.value = true
    try {
      const racerProfilesRef = collection(db, FIREBASE_COLLECTIONS.RACER_PROFILES)
      const q = query(racerProfilesRef, where('createdBy', '==', authStore.user.id))
      const querySnapshot = await getDocs(q)
      
      const profiles: RacerProfile[] = []
      querySnapshot.forEach((doc) => {
        profiles.push(docToRacerProfile(doc))
      })
      
      racerProfiles.value = profiles
      return profiles
    } catch (error) {
      console.error('Error fetching racer profiles:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  // Create new racer profile
  const createRacerProfile = async (profile: {
    firstName: string
    lastName: string
    birthDate: Date
    phone?: string
    address?: string
    city?: string
    state?: string
    zip?: string
  }) => {
    if (!authStore.user) {
      throw new Error('No authenticated user')
    }

    loading.value = true
    try {
      const racerProfilesRef = collection(db, FIREBASE_COLLECTIONS.RACER_PROFILES)
      
      // Create the document with profile data only
      const newProfileData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate instanceof Date ? profile.birthDate : new Date(profile.birthDate),
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip: profile.zip || '',
        createdBy: authStore.user.id,
        updatedBy: authStore.user.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        deletedBy: '',
        deletedReason: ''
      }
      
      console.log('Creating document with data:', newProfileData)
      const docRef = await addDoc(racerProfilesRef, newProfileData)
      
      const newProfile: RacerProfile = {
        id: docRef.id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        birthDate: profile.birthDate,
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || '',
        state: profile.state || '',
        zip: profile.zip || '',
        createdBy: authStore.user.id,
        updatedBy: authStore.user.id,
        deletedBy: '',
        deletedReason: ''
      }
      
      racerProfiles.value.push(newProfile)
      return newProfile
    } catch (error) {
      console.error('Error creating racer profile:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Get racer profile by ID
  const getRacerProfileById = (id: string) => {
    return racerProfiles.value.find(profile => profile.id === id)
  }

  // Update racer profile
  const updateRacerProfile = async (id: string, updates: Partial<RacerProfile>) => {
    if (!authStore.user) {
      throw new Error('No authenticated user')
    }

    loading.value = true
    try {
      const racerProfileRef = doc(db, FIREBASE_COLLECTIONS.RACER_PROFILES, id)
      
      // Filter out undefined values to prevent Firestore errors
      const cleanUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      )
      
      const updateData = {
        ...cleanUpdates,
        updatedBy: authStore.user.id,
        updatedAt: serverTimestamp()
      }
      
      console.log('Updating document with data:', updateData)
      await updateDoc(racerProfileRef, updateData)
      
      const index = racerProfiles.value.findIndex(profile => profile.id === id)
      if (index !== -1) {
        racerProfiles.value[index] = {
          ...racerProfiles.value[index],
          ...cleanUpdates,
          updatedBy: authStore.user.id
        }
        return racerProfiles.value[index]
      }
      throw new Error('Racer profile not found')
    } catch (error) {
      console.error('Error updating racer profile:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Delete racer profile (soft delete)
  const deleteRacerProfile = async (id: string, reason: string) => {
    if (!authStore.user) {
      throw new Error('No authenticated user')
    }

    loading.value = true
    try {
      const racerProfileRef = doc(db, FIREBASE_COLLECTIONS.RACER_PROFILES, id)
      
      const deleteData = {
        deletedAt: serverTimestamp(),
        deletedBy: authStore.user.id,
        deletedReason: reason,
        updatedBy: authStore.user.id,
        updatedAt: serverTimestamp()
      }
      
      await updateDoc(racerProfileRef, deleteData)
      
      const index = racerProfiles.value.findIndex(profile => profile.id === id)
      if (index !== -1) {
        racerProfiles.value[index] = {
          ...racerProfiles.value[index],
          deletedAt: new Date(),
          deletedBy: authStore.user.id,
          deletedReason: reason
        }
        return racerProfiles.value[index]
      }
      throw new Error('Racer profile not found')
    } catch (error) {
      console.error('Error deleting racer profile:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    racerProfiles,
    loading,
    getRacerProfiles,
    createRacerProfile,
    getRacerProfileById,
    updateRacerProfile,
    deleteRacerProfile
  }
}) 