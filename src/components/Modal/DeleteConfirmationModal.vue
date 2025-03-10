<template>
	<div class="modal-overlay">
		<div class="modal">
			<div class="modal__title">
				<h2 class="modal__title-text">Удалить задачу?</h2>
				<CloseButton @click="closeAll"></CloseButton>
			</div>
			<p class="modal__task-text">{{ task.text }}</p>
			<div class="modal-buttons">
				<button @click="$emit('confirm')">Удалить</button>
				<button @click="$emit('cancel')">Отменить</button>
			</div>
		</div>
	</div>
</template>

<script>
import CloseButton from '@/components/UI/CloseButton.vue';
export default {
	props: { task: Object },
	components: {
		CloseButton
	},
	methods: {
		closeAll() {
			this.$emit('cancel');
			this.$emit('close-menu');
		}
	}
};
</script>

<style scoped>
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
	z-index: 100;
}

.modal__title {
	display: flex;
	justify-content: space-between;
}

.modal__title-text {
	font-family: "TT Interphases Pro Variable", Arial;
	font-weight: 584;
	font-size: 24px;
	line-height: 30px;
	letter-spacing: 0%;
	vertical-align: middle;
	padding: 0;
	margin: 0;
	color: #1C2530;
}

.modal__task-text {
	font-family: "TT Interphases Pro Variable", Arial;
	font-weight: 400;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0%;
	color: #1C2530;
	max-height: 54px;
	overflow-y: hidden;
}

.modal__title .close-btn {
	width: 24px;
	height: 24px;
	background-size: 12px;
	cursor: pointer;
}

.modal-buttons {
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
</style>
