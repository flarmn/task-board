import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    columns: [
      { id: 1, title: 'На согласовании', tasks: [], bColor: { backgroundColor: '#FF65DD' } },
      { id: 2, title: 'Новые', tasks: [], bColor: { backgroundColor: '#33A0FF' } },
      { id: 3, title: 'В процессе', tasks: [], bColor: { backgroundColor: '#FFC633' } },
      { id: 4, title: 'Готово', tasks: [], bColor: { backgroundColor: '#22C33D' } },
      { id: 5, title: 'Доработать', tasks: [], bColor: { backgroundColor: '#F53D5C' } }
    ],
    notifications: [],
    showDeleteModal: false,
    taskToDelete: null,
    columnIdToDeleteFrom: null
  }),

  actions: {
    addTask(columnId) {
      const column = this.columns.find(col => col.id === columnId);
      if (column) {
        const newTask = { id: Date.now(), text: 'Новая задача', showMenu: false, isEditing: false };
        column.tasks.push(newTask);
      }
    },

    toggleTaskMenu(taskId) {
      this.columns.forEach(column => {
        column.tasks.forEach(task => {
          if (task.id === taskId) {
            task.showMenu = !task.showMenu;
          } else {
            task.showMenu = false; // Закрываем все остальные меню
          }
        });
      });
    }
  }
});
