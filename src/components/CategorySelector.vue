<template>
  <v-container>
    <v-row align="center" justify="center" class="category-row">
      <v-col cols="auto" v-for="category in outingCategories" :key="category.id" class="category-col">
        <div class="button-container">
          <v-btn
            :icon="category.icon"
            :height="buttonHeight"
            :width="buttonWidth"
            :color="buttonColor"
          >
            <v-icon :icon="category.icon" size="x-large"></v-icon>
          </v-btn>
          <div class="text-center category-name">{{ category.name }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// mdi Icons
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';
import '../assets/main.css';

export default {
  name: 'CategorySelector',
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiAccount,
      buttonHeight: 80,
      buttonWidth: 80,
      buttonColor: 'var(--secondary)',
      outingCategories: [
        { id: 'F&B', name: 'F&B', icon: 'mdi-food-outline' },
        { id: 'Nature', name: 'Nature', icon: 'mdi-forest-outline' },
        { id: 'Cultural', name: 'Cultural', icon: 'mdi-bank-outline' },
        { id: 'Entertainment', name: 'Entertainment', icon: 'mdi-drama-masks' },
        { id: 'Outdoor', name: 'Outdoor Activities', icon: 'mdi-bike' },
        { id: 'Educational', name: 'Educational', icon: 'mdi-human-male-board' },
        { id: 'Adventure', name: 'Adventure', icon: 'mdi-airballoon-outline' },
        { id: 'Shopping', name: 'Shopping', icon: 'mdi-shopping-outline' },
        { id: 'Wellness', name: 'Wellness', icon: 'mdi-spa-outline' },
        { id: 'Events', name: 'Events & Festivals', icon: 'mdi-calendar' },
      ],
    };
  },
};
</script>

<style scoped>
.category-row {
  justify-content: space-around;
}

.category-col {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px; /* Adjust based on content */
}

.category-name {
  max-width: 100px;
  word-wrap: break-word; /* Allow text to wrap */
}

.v-btn {
  color: black !important;
}

.label {
  text-align: right;
}
</style>
