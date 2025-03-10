<template>
    <div class="task-column" :data-id="column.id">
      <h2 class="task-column__title" :style="column.bColor">{{ column.title }}</h2>
  
      <draggable :list="localTasks" group="tasks" class="tasks" @end="$emit('drag-end', $event)">
        <TaskItem v-for="task in localTasks" :key="task.id" :task="task" @edit="editTask" @delete="confirmDelete" />
      </draggable>
  
      <button class="task-column__task-add-btn" @click="$emit('add-task', column.id)">Добавить</button>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  import TaskItem from './TaskItem/TaskItem.vue';
  
  export default {
    props: ['column'],
    components: { draggable, TaskItem },
    data() {
      return { localTasks: [] };
    },
    mounted() {
      this.localTasks = [...this.column.tasks];
    },
    watch: {
      'column.tasks': {
        handler(newTasks) {
          this.localTasks = [...newTasks];
        },
        deep: true
      }
    },
    methods: {
      editTask(updatedTask) {
        this.$emit('edit-task', updatedTask);
      },
      confirmDelete(task) {
        this.$emit('delete-task', this.column.id, task);
      }
    }
  };
  </script>
  
  <style scoped>
  .task-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20%;
    background: #f4f4f4;
    border: 1px solid #E3E5E8;
    border-radius: 8px;
  }
  .task-column__title {
    display: flex;
    height: 32px;
    border-radius: 6px 6px 0px 0px;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 1.5px;
  }
  .tasks {
    display: flex;
    flex-direction: column;
    min-height: 85%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #c4c4c4 transparent;
  }
  .tasks::-webkit-scrollbar {
    width: 8px;
  }
  .tasks::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 8px;
  }
  .task-column__task-add-btn {
    height: 30px;
    background: url("@/assets/plus.png") no-repeat center;
    border: none;
    font-size: 14px;
    color: #3D86F4;
    cursor: pointer;
  }
  </style>
  