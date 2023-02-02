import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  // Компонент должен иметь входной параметр и порождать событие

  props: {
    count: {
      type:Number,
      default:0,
    },
  },
  emits: ['update:count'],

  methods: {
    updateCount(value) {
      this.$emit('update:count', value);
    },
  },
  

  template: `<button type="button" @click="updateCount(count + 1)" >{{ count }}</button>`,
});
