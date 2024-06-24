<template>
  <div>
   <router-view></router-view>
  </div>
</template>

<script>

import db from '../firebase/firestoreServices';

export default {
  name: 'App',
  // data() {
  //   return {}
  // },
  // created() {
  //   this.getListing();
  // },
  // methods: {
  //   getListing() {
  //     db.collection('listings').get().then((querySnapshot) => {
  //       querySnapshot.forEach(async(doc) => {
  //         console.log(`${doc.id} => ${doc.data()}`);
  //       });
  //     });
  //   }
    
  // }
}
</script>