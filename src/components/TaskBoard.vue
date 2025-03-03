<template>
<div class="task-board">
    <div v-for="column in columns" :data-id="column.id" 
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
        <div v-if="task.isEditing" class="task-editing">
            <input v-model="task.text" />
            <button @click="saveTask(task)">Сохранить</button>
        </div>
        <div v-else class="task-content">
            {{ task.text }}
            <button class="menu-button" @click="toggleMenu(task)">⋯</button>
        </div>
        <div v-if="task.showMenu" class="task-menu">
            <button @click="editTask(task)">Редактировать</button>
            <button @click="confirmDelete(column.id, task)">Удалить</button>
        </div>
        </div>
    </draggable>
    <button @click="addTask(column.id)">Добавить</button>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal">
        <p>Вы уверены, что хотите удалить задачу?</p>
        <p><strong>{{ taskToDelete.text }}</strong></p>
        <div class="modal-buttons">
        <button @click="deleteTaskConfirmed">Удалить</button>
        <button @click="cancelDelete">Отменить</button>
        </div>
    </div>
    </div>

    <div class="notifications">
    <div v-for="(notification, index) in notifications" :key="index" class="notification">
        <strong>{{ notification.title }}</strong>
        <p>{{ notification.text }}</p>
    </div>
    </div>
</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
components: { draggable },
data() {
    return {
    columns: [
        { id: 1, title: 'На согласовании', tasks: [] },
        { id: 2, title: 'Новые', tasks: [] },
        { id: 3, title: 'В процессе', tasks: [] },
        { id: 4, title: 'Готово', tasks: [] },
        { id: 5, title: 'Доработать', tasks: [] }
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
    toggleMenu(task) {
    task.showMenu = !task.showMenu;
    },
    editTask(task) {
    task.isEditing = true;
    task.showMenu = false;
    },
    saveTask(task) {
    task.isEditing = false;
    },
    confirmDelete(columnId, task) {
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
    this.showDeleteModal = false;
    this.taskToDelete = null;
    this.columnIdToDeleteFrom = null;
    },
    handleDragEnd(evt) {
        const movedTask = evt.item.innerText;
        console.log('movedTask', movedTask);
        const toColumnElement = evt.to.closest('.task-column-wrapper');
        console.log('toColumnElement', toColumnElement);
        const toColumnId = parseInt(toColumnElement.getAttribute('data-id'));
        console.log('toColumnId', toColumnId);
        const toColumn = this.columns.find(col => col.id === toColumnId);
        console.log('toColumn', toColumn);
        if (toColumn && movedTask) {
            this.showNotification(`Задача перемещена в "${toColumn.title}"`, movedTask);
        }
    },
    showNotification(title, text) {
    this.notifications.push({ title, text });
    setTimeout(() => {
        this.notifications.shift();
    }, 3000);
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
.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
}
.modal {
background: #fff;
padding: 20px;
border-radius: 8px;
width: 300px;
text-align: center;
}
.modal-buttons button {
margin: 10px;
padding: 8px 16px;
border: none;
border-radius: 4px;
cursor: pointer;
}
.notifications {
position: fixed;
bottom: 20px;
right: 20px;
display: flex;
flex-direction: column;
gap: 10px;
}
.notification {
background: #323232;
color: white;
padding: 10px 20px;
border-radius: 8px;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
