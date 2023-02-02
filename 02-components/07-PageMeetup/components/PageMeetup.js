import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView'

export default defineComponent({
  name: 'PageMeetup',
  data() {
    return  {
      meetup: null,
      error: null,
    }
  },
  props: {
    meetupId:{
      type:Number,
      required:true,
    },
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  watch: {
    meetupId() {
      this.getData(this.meetupId)
    },
  },
  created() {
    this.getData(this.meetupId)
  },
  methods: {
    async getData(meetupId) {
      try {
        // Данные успешно получены
        this.meetup = null;
        this.meetup = await fetchMeetupById(meetupId);
        this.error = null;
      } catch (error) {
        // Произошла ошибка при получении данных
        this.meetup = null;
        this.error = error.message;
      }
    }
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup && meetup.length !== 0" :meetup="meetup" />
      <UiContainer v-else-if="error && error.length !== 0 "> 
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
      <UiContainer v-else>
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
    </div>`,
});
