<template>
  <UiInput :model-value="value" :type="type" @input="handleInput">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  props: {
    modelValue: Number,
    type: {
      type: String,
      default: "date",
    },
    step: String,
  },

  emits: ['update:model-value'],

  computed: {
    value() {
      if (typeof this.modelValue === 'undefined' || this.modelValue === null) {
        return '';
      }
      const date = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return date.substring(0, 10); 
      } else if (this.type === 'datetime-local') {
        return date.substring(0, 16); 
      } else if (this.type === 'time') {
        return this.step && this.step % 60 !== 0
          ? date.substring(11, 19) 
          : date.substring(11, 16); 
      }
      return '';
    },
  },
  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value !== '' ? $event.target.valueAsNumber : undefined)
    },
  },

  components: { UiInput },
};
</script>
