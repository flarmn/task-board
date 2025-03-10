<template>
    <div class="task-item">
      <TaskEditing v-if="isEditing" :task="task" @save="saveTask" />
      <TaskContent v-else :task="task" @toggle-menu="toggleMenu" @close-menu = "closeMenu"/>
      <TaskMenu v-if="showMenu" @edit="editTask" @delete="deleteTask(task)" />
    </div>
  </template>
  
  <script>
  import TaskEditing from './TaskEditing.vue';
  import TaskContent from './TaskContent.vue';
  import TaskMenu from './TaskMenu.vue';
  
  export default {
    props: { task: Object },
    components: { TaskEditing, TaskContent, TaskMenu },
    data() {
      return { isEditing: this.task.isEditing, showMenu: this.task.showMenu };
    },
    methods: {
      toggleMenu() { this.showMenu = !this.showMenu},
      closeMenu(){ this.showMenu = false; console.log("CLOSED in task item")},
      editTask() { this.isEditing = true; 
        this.showMenu = false
      },
      deleteTask(task){
        this.$emit('delete', task);
        this.showMenu = false
      },
      saveTask(newText) {
        this.isEditing = false;
        this.$emit('edit', { ...this.task, text: newText });
      }
    }
  };
  </script>
  
  <style scoped>
  .task-item {
    position: relative;
    background: white;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    border: 1px solid #C4CAD4;
  }

  
  </style>
  