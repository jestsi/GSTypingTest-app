<script setup lang="ts">
import {computed, ref} from 'vue';

const testText = 'test app test app h test app h';
const countErrors = ref<number>(0);
const startTime = ref<number | null>(null);
const endTime = ref<number | null>(null);

const startTimer = () => {
  startTime.value = Date.now();
};

const stopTimer = () => {
  if (startTime.value) {
    endTime.value = Date.now();
  }
};

const wordsPerMinute = computed(() => {
  if (startTime.value !== null && endTime.value !== null && endTime.value > startTime.value) {
    const elapsedTimeInMinutes = (endTime.value - startTime.value) / (1000 * 60);
    const wordCount = testText.split(' ').length;
    return Math.round(wordCount / elapsedTimeInMinutes);
  }
  return 0;
});

const elapsedTime = computed(() => {
  if (startTime.value !== null && endTime.value !== null) {
    const elapsedMilliseconds = endTime.value - startTime.value;
    const minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    const seconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);
    const milliseconds = elapsedMilliseconds % 1000;
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  }
  return '0:00.000';
});
</script>

<template>
  <UContainer class="my-5">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <UContainer class="space-y-5">
        <div class="flex justify-end">
          <ThemeChanger/>
        </div>
        <UContainer>
          <TestGenerator
              :text="testText"
              :type-error="payload => countErrors += Number(payload.isErrorChar)"
              :complete="stopTimer"
              :start="startTimer"
              class="test-generator"
          />
        </UContainer>
        <UContainer v-if="endTime">
          <label>Errors count: {{ countErrors }}</label><br>
          <label>Words per minute: {{ wordsPerMinute }}</label><br>
          <label>Elapsed time: {{ elapsedTime }}</label>
        </UContainer>

        <ServerPlaceholder class="h-48" />
      </UContainer>
    </UCard>
  </UContainer>
</template>


<style scoped>

</style>