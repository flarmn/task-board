// TaskBoard.vue - Добавление контекстного меню в задачи
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
          <div class="task-content">
            {{ task.text }}
            <button class="menu-button" @click="toggleMenu(task)">⋯</button>
          </div>
          <div v-if="task.showMenu" class="task-menu">
            <button @click="editTask(task)">Редактировать</button>
            <button @click="deleteTask(column.id, task.id)">Удалить</button>
          </div>
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
        { id: 1, title: 'На согласовании', tasks: [ { id: 101, text: 'Проверить документ', showMenu: false } ] },
        { id: 2, title: 'Новые', tasks: [ { id: 102, text: 'Создать задачу', showMenu: false } ] },
        { id: 3, title: 'В процессе', tasks: [ { id: 103, text: 'Разработка компонента', showMenu: false } ] },
        { id: 4, title: 'Готово', tasks: [ { id: 104, text: 'Проведено тестирование', showMenu: false } ] },
        { id: 5, title: 'Доработать', tasks: [ { id: 105, text: 'Исправить ошибки', showMenu: false } ] }
      ]
    };
  },
  methods: {
    addTask(columnId) {
      const column = this.columns.find(col => col.id === columnId);
      if (column) {
        const newTask = { id: Date.now(), text: 'Новая задача', showMenu: false };
        column.tasks.push(newTask);
      }
    },
    toggleMenu(task) {
      task.showMenu = !task.showMenu;
    },
    editTask(task) {
      console.log('Редактировать задачу:', task);
      task.showMenu = false;
    },
    deleteTask(columnId, taskId) {
      const column = this.columns.find(col => col.id === columnId);
      if (column) {
        column.tasks = column.tasks.filter(task => task.id !== taskId);
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
  position: relative;
  background: white;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  width: auto;
  color: grey;
}
.task-menu {
  position: absolute;
  top: 30px;
  right: 8px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 10;
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
