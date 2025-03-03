// TaskBoard.vue - Главный контейнер с поддержкой drag-and-drop между колонками
<template>
  <div class="task-board">
    <div 
      v-for="column in columns" 
      :key="column.id" 
      class="task-column-wrapper"
    >
      <h2>{{ column.title }}</h2>
      <draggable
        v-model="column.tasks"
        :group="'tasks'"
        class="tasks"
        @end="handleDragEnd"
      >
        <div v-for="task in column.tasks" :key="task.id" class="task-item">
          {{ task.text }}
        </div>
      </draggable>
      <button @click="addTask(column.id)">Добавить</button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      columns: [
        { id: 1, title: 'На согласовании', tasks: [ { id: 101, text: 'Проверить документ' } ] },
        { id: 2, title: 'Новые', tasks: [ { id: 102, text: 'Создать задачу' } ] },
        { id: 3, title: 'В процессе', tasks: [ { id: 103, text: 'Разработка компонента' } ] },
        { id: 4, title: 'Готово', tasks: [ { id: 104, text: 'Проведено тестирование' } ] },
        { id: 5, title: 'Доработать', tasks: [ { id: 105, text: 'Исправить ошибки' } ] }
      ]
    };
  },
  methods: {
    addTask(columnId) {
      const column = this.columns.find(col => col.id === columnId);
      if (column) {
        const newTask = { id: Date.now(), text: 'Новая задача' };
        column.tasks.push(newTask);
      }
    },
    handleDragEnd() {
      console.log('Задача перемещена');
    }
  }
};
</script>

<style scoped>
.task-board {
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
}
.task-column-wrapper {
  width: 200px;
  padding: 16px;
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
