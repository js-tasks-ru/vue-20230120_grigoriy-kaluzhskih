<template>
  <div class="calendar-view">

    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button @click="getPrevMonth" class="calendar-view__control-left" type="button" aria-label="Previous month"> </button>
        <div class="calendar-view__date">{{ toLocaleDateString(date) }}</div>
        <button @click="getNextMonth" class="calendar-view__control-right" type="button" aria-label="Next month"></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div v-for="day in daysCalendar" class="calendar-view__cell" :class="{'calendar-view__cell_inactive': inactiveDay(day.date)}" tabindex="0">
        <div class="calendar-view__cell-day">{{ day.date.getDate() }}</div>
        <div v-if="day.meetupOnDay.length" class="calendar-view__cell-content"></div>
        
          <a v-for="meetup in day.meetupOnDay" href="/meetups/1" class="calendar-event"> {{ meetup.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
const millisec = (1000 * 60 * 60 * 24);
export default {
  name: 'MeetupsCalendar',
  data() {
    return {
      date: new Date(),
    }
  },
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toLocaleDateString(date) {
      return date.toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
    getPrevMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    },
    getNextMonth() {
      this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
    },
    inactiveDay(date) {
      return date < this.firstDayOfMonth || date > this.lastDayOfMonth ? true : false;
    },
  },
  computed: {
    firstDayOfMonth() {
      return new Date(Date.UTC(this.date.getFullYear(), this.date.getMonth(), 1)); //.getDay()
    },
    lastDayOfMonth() {
      return new Date(Date.UTC(this.date.getFullYear(), this.date.getMonth() + 1, 0)); //.getDay()
    },
    firstDayOfCalendar() {
      return new Date(this.firstDayOfMonth.getTime() + (-((this.firstDayOfMonth.getDay() || 7 ) - 1) * millisec));
    },
    lastDayOfCalendar() {
      return new Date(this.lastDayOfMonth.getTime() + (  (7 - (this.lastDayOfMonth.getDay() || 7 ))  * millisec))
    },
    daysCalendar() {
      let daysOfYear = [];
      for (let d = this.firstDayOfCalendar; d <= this.lastDayOfCalendar; d = new Date(d.getTime() + 1 * millisec)) {
        let meetupOnDay = this.meetups.filter((meetup) => {
          let meetupDate = new Date(meetup.date);
          return (
            meetupDate.getFullYear() === d.getFullYear() &&
            meetupDate.getMonth() === d.getMonth() &&
            meetupDate.getDate() === d.getDate()
          );
        });
        daysOfYear.push({
          date:new Date(d), 
          meetupOnDay: meetupOnDay}
        );
      }
      return daysOfYear;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
