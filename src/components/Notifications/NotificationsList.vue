<template>
    <div class="notifications">
      <Notification v-for="notification in notifications" :key="notification.id" :notification="notification" @remove="$emit('remove', notification.id)"/>
    </div>
  </template>
  
  <script>
  import Notification from './AppNotification.vue';
  export default { props: { notifications: Array }, components: { Notification } };
  </script>
  

<style scoped>
  .notifications {
      position: fixed;
      bottom: 30%;
      right: 4%;
      display: flex;
      flex-direction: column;
      gap: 30px;
  }
</style>