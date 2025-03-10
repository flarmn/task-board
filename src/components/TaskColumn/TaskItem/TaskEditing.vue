<template>
<<<<<<< HEAD
    <div class="task-editing">
      <input v-model="localText" class="task-editing__input" />
      <AppButton type="primary" @click="saveTask">Сохранить</AppButton>
    </div>
  </template>
  
  <script>
  import AppButton from '@/components/UI/AppButton.vue';
  export default {
    props: { task: Object },
    components: { AppButton },
    data() {
      return { localText: this.task.text };
    },
    methods: {
      saveTask() {
        this.$emit('save', this.localText);
      }
    }
  };
  </script>
  
  <style scoped>
  .task-editing {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .task-editing__input {
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  </style>
  
=======
	<div class="task-editing">
		<textarea v-model="localText" class="task-editing__input" ref="editTextInput"></textarea>
		<div class="task-editing__btns">
			<AppButton type="primary" @click="saveTask" class="task-editing__accept-btn"></AppButton>
			<AppButton type="secondary" @click="cancel" class="task-editing__cancel-btn"></AppButton>
		</div>
	</div>
</template>

<script>
import AppButton from '@/components/UI/AppButton.vue';
export default {
	props: { task: Object },
	components: { AppButton },
	data() {
		return { localText: this.task.text };
	},
	methods: {
		saveTask() {
			this.$emit('save', this.localText);
		},
		cancel() {
			this.$emit('cancel', this.localText);
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.$refs.editTextInput.focus();
		});
	}
};
</script>

<style scoped>
.task-editing {
	display: flex;
	gap: 8px;
}

.task-editing__input {
	padding: 6px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 14px;
	width: 85%;
}

.task-editing__btns {
	width: 20px;
}

.task-editing__accept-btn,
.task-editing__cancel-btn {
	width: 20px;
	height: 20px;
	padding: 0;
	margin: 0;
	cursor: pointer;
}

.task-editing__accept-btn {
	background: url("@/assets/accept.svg") no-repeat center center;
}

.task-editing__cancel-btn {
	background: url("@/assets/cancel.svg") no-repeat center center;
}
</style>
>>>>>>> 59911ab (Fix of final edit :))
