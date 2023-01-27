<template>
  <div class="col-span-5">
    <div class="flex">
      <span
        class="inline-flex items-center px-3 text-sm text-gray-900 border border-r-0 border-gray-300 bg-stone-200 rounded-l-md dark:bg-stone-600 dark:text-stone-400 dark:border-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-stone-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      </span>

      <input
        type="text"
        id="folder-name"
        v-model="folderName"
        class="rounded-none rounded-r-lg bg-stone-100 border border-gray-300 text-stone-900 focus:ring-stone-500 focus:border-stone-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500"
        placeholder="folder-name"
      />

    <button
      class="px-2 ml-2 text-green-400 bg-green-100 hover:text-green-500 hover:bg-green-200 rounded-md opacity-70"
      @click="addFolder"
    >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

      </button>
      <button
        class="px-2 ml-2 text-red-400 bg-red-100 hover:text-red-500 hover:bg-red-200 rounded-md opacity-70"
        @click="stopDraftingFolder"
      >
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>

        </button>
    </div>
  </div>

  <div class="col-span-4"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';
import { sigShip } from '@/helpers';
import { initTooltips } from 'flowbite';

import { addFolder as troveAddFolder } from '@/api/troveAPI';

const emit = defineEmits(['cancelNewFolder'])

onMounted(() => {
  initTooltips();
});

interface Props {
}
const props = defineProps<Props>();

const store = useStore();
const currentSpace = computed(() => {
  return store.state.currentSpace;
});
const currentTrail = computed(() => {
  return store.state.currentTrail;
});

const folderName = ref('')

const addFolder = () => {
  const folder = {
    trail: currentTrail.value,
    name: folderName.value,
  }
  troveAddFolder(currentSpace.value, folder);
  folderName.value = ''
};

const stopDraftingFolder = () => {
  folderName.value = ''
  emit('cancelNewFolder')
}
</script>
