<template>
<<<<<<< HEAD
    <div class="task-menu">
      <AppButton type="default" class="task-menu__item task-menu__edit-btn" @click="$emit('edit')">Редактировать</AppButton>
      <AppButton type="default" class="task-menu__item task-menu__delete-btn" @click="$emit('delete'); ">Удалить</AppButton>
    </div>
  </template>
  
  <script>
  import AppButton from '@/components/UI/AppButton.vue';
  export default { components: { AppButton } };
  </script>
  
  <style scoped>
    .task-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    right: 8px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.task-menu .task-menu__item {
    display: flex;
    align-items: center;
    width: 144px;
    height: 30px;
    background-position: 8px center;
    border-style: none;
    padding-left: 32px;
    padding-right: 8px;
    padding-bottom: 8px;
    padding-top: 8px;
    margin-bottom: 8px;
}

.task-menu .task-menu__item:hover {
    background-color: rgba(225, 241, 255, 1);
}

.task-menu__edit-btn {
    background: url("@/assets//edit.svg") no-repeat 20px;
}

.task-menu__delete-btn {
    background: url("@/assets//delete.svg") no-repeat 20px;
}
  </style>
  
=======
	<div class="task-menu">
		<AppButton type="default" class="task-menu__item task-menu__edit-btn" @click="$emit('edit')">Редактировать
		</AppButton>
		<AppButton type="default" class="task-menu__item task-menu__delete-btn" @click="$emit('delete');">Удалить
		</AppButton>
	</div>
</template>

<script>
import AppButton from '@/components/UI/AppButton.vue';
export default { components: { AppButton } };
</script>

<style scoped>
.task-menu {
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 30px;
	right: 8px;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	z-index: 10;
}

.task-menu .task-menu__item {
	display: flex;
	align-items: center;
	width: 144px;
	height: 30px;
	background-position: 8px center;
	border-style: none;
	padding-left: 32px;
	padding-right: 8px;
	padding-bottom: 8px;
	padding-top: 8px;
	margin-bottom: 8px;
}

.task-menu .task-menu__item:hover {
	background-color: rgba(225, 241, 255, 1);
}

.task-menu__edit-btn {
	background: url("@/assets/edit.svg") no-repeat 20px;
}

.task-menu__delete-btn {
	background: url("@/assets/delete.svg") no-repeat 20px;
}
</style>
>>>>>>> 59911ab (Fix of final edit :))
