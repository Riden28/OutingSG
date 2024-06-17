<template>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="auto" v-for="category in outingCategories" align-self="end">
          <v-btn 
          :icon="category.icon"
          :height=buttonHeight
          :width=buttonWidth
          :color=buttonColor>
            <v-icon :icon="category.icon" size="x-large"></v-icon>
          </v-btn>
            
          <p class="text-center">{{ category.name }}</p>
            
        </v-col>
  
      </v-row>
    </v-container>
</template>

<script>
// mdi Icons
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount } from '@mdi/js'
import '../assets/main.css'

export default {
    name: 'CategorySelector',
    components: {
		  SvgIcon
	  },
    data() {
      return {
          path: mdiAccount,
          buttonHeight: 80,
          buttonWidth: 80,
          buttonColor: 'var(--secondary)',
          outingCategories: [
            {id: "food", name: "F&B", icon: "mdi-food"},
            {id: "sport", name: "Sport", icon: "mdi-bike"},
            {id: "cultural", name: "Cultural", icon: "mdi-bank"},
            {id: "music", name: "Music", icon: "mdi-music"}
          ]
      }
	}

}
</script>

<style scoped>
  .v-btn {
    color: black !important;
  }
  .label {
    text-align:right;
  }
</style>