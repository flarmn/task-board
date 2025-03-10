<template>
<<<<<<< HEAD
    <div class="task-content">
      {{ task.text }}
      <button class="menu-button" @click="togleMenu" :class="{ 'menu-button__active': this.showMenu }" @close-menu = "closeMenu">⋯</button>
    </div>
  </template>
  
  <script>
  export default { props: { task: Object },
  data() {
      return {  showMenu: this.task.showMenu };
    },
  methods: {
    togleMenu(){
      this.showMenu = !this.showMenu
      console.log('df', this.showMenu); 
      this.$emit('toggle-menu');
    },
    closeMenu(){
      this.showMenu = false;
      console.log("CLOSED")
    }
  }
};
  </script>
  
  <style scoped>
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
    color: #86949E;
    font-weight: 1000;
    text-shadow: 1px 1px 4px #86949E;
}

.menu-button__active {
    color: rgba(61, 134, 244, 1)
}
  </style>
  
=======
	<div class="task-content">
		{{ task.text }}
		<button class="menu-button" @click="togleMenu" :class="{ 'menu-button__active': this.showMenu }"
			@close-menu="closeMenu">⋯</button>
	</div>
</template>

<script>
export default {
	props: { task: Object },
	data() {
		return { showMenu: this.task.showMenu };
	},
	methods: {
		togleMenu() {
			this.showMenu = !this.showMenu
			this.$emit('toggle-menu');
		},
		closeMenu() {
			this.showMenu = false;
		}
	}
};
</script>

<style scoped>
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
	color: #86949E;
	font-weight: 1000;
	text-shadow: 1px 1px 4px #86949E;
}

.menu-button__active {
	color: rgba(61, 134, 244, 1)
}
</style>
>>>>>>> 59911ab (Fix of final edit :))
