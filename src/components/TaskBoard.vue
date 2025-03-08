<template>
<div class="task-board">
    <div v-for="column in columns" :data-id="column.id" 
    :key="column.id" 
    class="task-column"
    >
        <h2 class = "task-column__title" :style = "column.bColor">{{ column.title }} </h2>

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

        <button @click="addTask(column.id)" class = "task-column__task-add-btn">Добавить</button>
    </div>

    <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal">
            <div class = "modal__title">
                <h2 class = "modal__title-text">Удалить задачу?</h2>
                <button class = "close-btn" @click="cancelDelete"></button>
            </div>
            <p class = "modal__task-text">{{ taskToDelete.text }}</p>
            <div class="modal-buttons">
                <button @click="deleteTaskConfirmed">Удалить</button>
                <button @click="cancelDelete">Отменить</button>
            </div>
        </div>
    </div>

    <div class="notifications">
    <div v-for="(notification) in notifications" :key="notification.id" class="notification">
        <div class = "notification__sign"></div>
        <div class = "notification__info">
            <strong class = "notification__info-title">{{ notification.title }}</strong>
            <p class = "notification__info-text">{{ notification.text }}</p>
        </div>
        <button class = "close-btn" @click="removeNotification(notification.id)"></button>
        
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
        { id: 1, title: 'На согласовании', tasks: [], bColor: { backgroundColor: '#FF65DD'} },
        { id: 2, title: 'Новые', tasks: [], bColor: { backgroundColor: '#33A0FF' } },
        { id: 3, title: 'В процессе', tasks: [], bColor: { backgroundColor: '#FFC633'} },
        { id: 4, title: 'Готово', tasks: [], bColor: { backgroundColor: '#22C33D'} },
        { id: 5, title: 'Доработать', tasks: [], bColor: {backgroundColor: '#F53D5C' } }
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
        const toColumnElement = evt.to.closest('.task-column');
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
    const id = Date.now();
    this.notifications.push({ id, title, text });
    setTimeout(() => {
        this.removeNotification(id);
    }, 3000);
    },
    removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    },
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
    xxbackground-color: red;
    margin:auto;
    margin-top: 8vh;
    flex-shrink: 1;
}

.task-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20%;
    background: #f4f4f4;
    border: 1px solid #E3E5E8;
    border-radius: 8px;
    xxbackground-color: green;
    flex-shrink: 1;
    flex-grow: 0;
}

.task-column__title{
    display: flex;
    xxbackground: gold;
    height: 32px;
    xxborder: 1px solid #E3E5E8;
    xxborder-bottom: none;
    border-radius: 6px 6px 0px 0px;
    width: 99%;
    align-items: center;
    justify-content: center;
    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 584;
    font-size: 14px;
    line-height: 17.5px;
    letter-spacing: 0%;
    padding: 1.5px;
    margin: 0;
    xxmargin-left: -1px;
    flex-shrink:0;

}


/* Общие стили для контейнера с прокруткой */
.tasks {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 100px;
    margin-bottom: 10px;
    xxbackground-color: violet;
    min-height: 85%;
  xxmax-height: 300px;
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #c4c4c4 transparent; /* Firefox */
  border-radius: 8px; /* для контейнера */
  overflow-anchor: none;
}

/* Chrome, Safari и Edge */
.tasks::-webkit-scrollbar {
  width: 8px;
}

.tasks::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 8px;
}

.tasks::-webkit-scrollbar-thumb {
  background-color: #c4c4c4;
  border-radius: 8px;
  border: 2px solid transparent;
  background-clip: content-box;
}

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

.task-item:hover{
    border: 1px solid rgba(227, 229, 232, 1);

    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.08);
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
    font-size: 24px;
    color:  #86949E;
    xxborder: 2px solid #86949E;
    font-weight: 1000;
    text-shadow: 1px 1px 4px #86949E;
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

.task-column__task-add-btn{
    height: 30px;
    flex-shrink:0;
    background: url("@/assets//plus.png") no-repeat 35% ;
    border-style: none;

    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0%;
    text-align: center;
    color: #3D86F4;

}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* MODAL SECTION */
.modal {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
    max-height: 196px;
    background: #fff;
    padding: 40px;
    border-radius: 8px;
}

.modal__title{
    display: flex;
    justify-content: space-between;
}

.modal__title-text{
    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 584;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0%;
    vertical-align: middle;
    padding:0;
    margin:0;
    color: #1C2530;
}

.modal__task-text{
    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0%;
    color: #1C2530;
    max-height: 54px;
    overflow-y: hidden;
}

.modal__title .close-btn{
    width: 24px;
    height: 24px;
    background-size: 12px;
    cursor: pointer;
}

.modal-buttons{
    display: flex;
    column-gap: 20px;
}

.modal-buttons button {
    margin: 0px;
    border-radius: 4px;
    border: 1px solid #C4CAD4;

    cursor: pointer;
    width: 50%;
    height: 36px;
    background-color: transparent;

    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0%;
    text-align: center;
}

/* Notifications */
.notifications {
    position: fixed;
    bottom: 30%;
    right: 4%;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.notification {
    display: flex;
    background: #FFFFFF;
    color: white;
    padding: 10px;
    padding-left: 0;
    border: 1px solid #E3E5E8;
    border-left: 8px solid #22C33D;
    border-radius: 4px;
    xxbox-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    height: 76px;
    width: 400px;
    color: #1C2530;

    font-family: "TT Interphases Pro Variable", Arial;
    font-weight: 584;
    font-size: 14px;
    line-height: 125%;
    letter-spacing: 1%;
    vertical-align: middle;

    box-shadow: 0px 8px 16px 0px #0000000F;
    box-shadow: 0px 8px 8px 0px #00000014;
}

.notification__sign{
    height: 100%;
    width: 56px;
    xxbackground-color: yellow;
    background: url("@/assets/notification_icon.png") no-repeat center top;
    background-size: 24px;
}
 
.notification__info{
    width: 370px;
    height: 100%;
    xxbackground-color: red;
}

.notification__info-title{
    font-weight: 584;
    font-size: 14px;
    line-height: 125%;
    letter-spacing: 0%;
    vertical-align: middle;
 
}

.notification__info-text{
font-weight: 400;
font-size: 14px;
line-height: 18px;
letter-spacing: 0%;
vertical-align: middle;
max-height: 54px;
overflow-y: hidden;
margin-top: 8px;
}

.close-btn{
    width: 18px;
    height: 18px;
    background: url("@/assets/close_icon.png") no-repeat center;
    border-style: none;
    cursor: pointer;
}

</style>
