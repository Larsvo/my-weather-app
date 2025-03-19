<template>
  <component :is="weatherImage" />
</template>

<script>
import { defineAsyncComponent } from "vue";

const weatherConditions = [
  'Clear', 'Clouds', 'Rain', 'Drizzle', 'Fog', 'ClearNight',
];

export default {
  props: {
    condition: {
      type: String,
      required: true,
      validator: (value) => weatherConditions.includes(value)
    },
  },
  computed: {
    weatherImage() {
      const safeCondition = weatherConditions.includes(this.condition)
          ? this.condition
          : 'Clear'; // Fallback to Clear if condition is not in the list
      return defineAsyncComponent(() =>
          import(`@/assets/Icons/${safeCondition}.svg`)
      );
    },
  },
};
</script>
