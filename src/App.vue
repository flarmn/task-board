<template>
  <div id="app">
    <TaskBoard />
  </div>
</template>

<script>
import TaskBoard from './components/TaskBoard.vue'

export default {
  name: 'App',
  components: {
    TaskBoard
  }
}
</script>

<style>
#app {
display:flex;
flex-direction: column;
}
</style>
