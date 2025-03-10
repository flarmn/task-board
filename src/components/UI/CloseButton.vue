<template>
    <button class="close-button" @click="$emit('click')"></button>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .close-button {
    width: 18px;
    height: 18px;
    background: url("@/assets/close_icon.png") no-repeat center;
    background-size: 12px;
    border: none;
    cursor: pointer;
  }
  </style>
  