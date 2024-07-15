<template>
    <div>
      API Key: {{ apiKey }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        apiKey: process.env.VUE_APP_API_KEY
      };
    }
  };
  </script>