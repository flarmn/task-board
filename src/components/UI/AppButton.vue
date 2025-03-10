<template>
<<<<<<< HEAD
  <button :class="['custom-button', type]" @click="$emit('click')">
    <slot></slot>
  </button>
=======
	<button :class="['custom-button', type]" @click="$emit('click')">
		<slot></slot>
	</button>
>>>>>>> 59911ab (Fix of final edit :))
</template>

<script>
export default {
<<<<<<< HEAD
  name: "AppButton",  // Исправили имя компонента
  props: {
    type: { type: String, default: 'default' } // default | primary | danger
  }
=======
	name: "AppButton",
	props: {
		type: { type: String, default: 'default' }
	}
>>>>>>> 59911ab (Fix of final edit :))
};
</script>

<style scoped>
.custom-button {
<<<<<<< HEAD
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  font-size: 14px;
}
.default { background-color: #f0f0f0; color: #000; }
.primary { background-color: #3D86F4; color: white; }
.danger { background-color: #F53D5C; color: white; }
=======
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	border: 1px solid transparent;
	font-size: 14px;
}

.default {
	background-color: #f0f0f0;
	color: #000;
}

.primary {
	background-color: #3D86F4;
	color: white;
}

.danger {
	background-color: #F53D5C;
	color: white;
}
>>>>>>> 59911ab (Fix of final edit :))
</style>
