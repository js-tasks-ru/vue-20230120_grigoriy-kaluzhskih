import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const CompOptions = {
  name: 'Lesson01-basics',
  data() {
    return {
      operator: "",
      firstNumb: null,
      secondNumb: null
    };
  },
  computed: {
    output() {
      if (this.operator === "sum") return this.firstNumb + this.secondNumb;
      else if (this.operator === "subtract") return this.firstNumb - this.secondNumb;
      else if (this.operator === "multiply") return this.firstNumb * this.secondNumb;
      else if (this.operator === "divide") return this.firstNumb / this.secondNumb;
      else return null;
    },
  },
};
const Component = defineComponent(CompOptions);

const vm = createApp(Component).mount('#app');
