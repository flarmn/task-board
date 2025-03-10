<template>
  <div class="task-board">
    <TaskColumn
      v-for="column in columns"
      :key="column.id"
      :column="column"
      @add-task="addTask"
      @delete-task="confirmDelete"
      @edit-task="editTask"
      @drag-end="handleDragEnd"
    />

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :task="taskToDelete"
      @confirm="deleteTaskConfirmed"
      @cancel="cancelDelete"
    />

    <NotificationsList :notifications="notifications" @remove="removeNotification" />
  </div>
</template>

<script>
import TaskColumn from '@/components/TaskColumn/TaskColumn.vue';
import DeleteConfirmationModal from '@/components/Modal/DeleteConfirmationModal.vue';
import NotificationsList from '@/components/Notifications/NotificationsList.vue';

export default {
  components: {
    TaskColumn,
    DeleteConfirmationModal,
    NotificationsList
  },
  data() {
    return {
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
    };
  },
  methods: {
    addTask(columnId) {
      const column = this.columns.find(col => col.id === columnId);
      if (column) {
        const newTask = { id: Date.now(), text: 'Новая задача', showMenu: false, isEditing: false };
        column.tasks.push(newTask);
        this.showNotification(`Задача создана в "${column.title}"`, newTask.text);
      }
    },
    confirmDelete(columnId, task) {
      this.showMenu = false;
      this.showDeleteModal = true;
      this.taskToDelete = task;
      this.columnIdToDeleteFrom = columnId;
    },
    deleteTaskConfirmed() {
      const column = this.columns.find(col => col.id === this.columnIdToDeleteFrom);
      if (column) {
        column.tasks = column.tasks.filter(task => task.id !== this.taskToDelete.id);
        this.showNotification('Задача удалена', this.taskToDelete.text);
      }
      this.cancelDelete();
    },
    cancelDelete() {
      this.showMenu = false;
      this.showDeleteModal = false;
      this.taskToDelete = null;
      this.columnIdToDeleteFrom = null;
    },
    editTask(updatedTask) {
      const column = this.columns.find(col => col.tasks.some(task => task.id === updatedTask.id));
      if (column) {
        const taskIndex = column.tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          this.$set(column.tasks, taskIndex, updatedTask);
        }
      }
    },
    handleDragEnd(evt) {
      if (!evt || !evt.item || !evt.to) return;

      const movedTask = evt.item.innerText;
      const toColumnElement = evt.to.closest('.task-column');
      if (!toColumnElement) return;

      const toColumnId = parseInt(toColumnElement.getAttribute('data-id'), 10);
      if (isNaN(toColumnId)) return;

      const toColumn = this.columns.find(col => col.id === toColumnId);
      if (toColumn && movedTask) {
        this.showNotification(`Задача перемещена в "${toColumn.title}"`, movedTask);
      }
    },
    showNotification(title, text) {
      const id = Date.now();
      this.notifications.push({ id, title, text });
      setTimeout(() => {
        this.removeNotification(id);
      }, 3000);
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    }
  }
};
</script>

<style scoped>
.task-board {
  display: flex;
  width: 89.843%;
  height: 596px;
  gap: 16px;
  overflow-x: auto;
  margin: auto;
  margin-top: 8vh;
}
</style>
