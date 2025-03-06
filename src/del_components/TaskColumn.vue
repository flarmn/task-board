<template>
    <div class="task-column">
     
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    components: {
      draggable
    },
    props: {
      title: String,
      tasks: Array
    },
    data() {
      return {
        localTasks: [...this.tasks]
      };
    },
    watch: {
      tasks(newTasks) {
        this.localTasks = [...newTasks];
      }
    },
    methods: {
      addTask() {
        console.log(`Добавить задачу в колонку: ${this.title}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .task-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    xxpadding: 16px;
    background: #f4f4f4;
    border-radius: 8px;
  }
  .tasks {
    min-height: 100px;
    margin-bottom: 10px;
  }
  .task-item {
    background: white;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  button {
    width: 100%;
    padding: 8px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  