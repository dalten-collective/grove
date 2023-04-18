<template>
  <div class="col-span-9">
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
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
      </span>

      <input
        type="text"
        id="file-name"
        v-model="newFile.name"
        class="rounded-none rounded-r-lg bg-stone-100 border border-gray-300 text-stone-900 focus:ring-stone-500 focus:border-stone-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500"
        :class="errors ? 'border-red-500' : ''"
        placeholder="filename"
      />

      <input
        type="text"
        class="ml-1 rounded-lg bg-stone-100 border border-gray-300 text-stone-900 focus:ring-stone-500 focus:border-stone-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500"
        placeholder=".txt"
        :class="errors ? 'border-red-500' : ''"
        v-model="newFile.extension"
      />

      <input
        type="text"
        class="ml-1 rounded-lg bg-stone-100 border border-gray-300 text-stone-900 focus:ring-stone-500 focus:border-stone-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-stone-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-stone-500 dark:focus:border-stone-500"
        placeholder="URL"
        :class="errors ? 'border-red-500' : ''"
        v-model="newFile.url"
      />

    <button
      class="px-2 ml-2 text-green-400 bg-green-100 hover:text-green-500 hover:bg-green-200 rounded-md opacity-70"
      @click="addNode"
    >
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

      </button>
      <button
        class="px-2 ml-2 text-red-400 bg-red-100 hover:text-red-500 hover:bg-red-200 rounded-md opacity-70"
        @click="stopDraftingNode"
      >
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
  </svg>

        </button>
    </div>

    <div class="mt-2 text-center">
      <p v-if="errors" class="text-red-500">
        {{ errorMsg }}
      </p>
      <p v-else class="text-stone-400">
        Create a file as a link to an existing resource at a URL
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';
import { sigShip } from '@/helpers';
import { addNode as groveAddNode } from '@/api/groveAPI';
import { initTooltips } from 'flowbite';
import { validHepName } from '@/helpers'

import { addFolder as groveAddFolder } from '@/api/groveAPI';

const emit = defineEmits(['cancelNewNode'])

onMounted(() => {
  initTooltips();
});

interface Props {
}
const props = defineProps<Props>();

const newFile = ref({});
const errors = ref(false)
const errorMsg = ref('')

watch(newFile, (val) => {
  if (val && val.name) {
    errors.value = false
    errorMsg.value = ''
  }
})

const store = useStore();
const currentSpace = computed(() => {
  return store.state.currentSpace;
});
const currentTrail = computed(() => {
  return store.state.currentTrail;
});

const folderName = ref('')

const addNode = () => {
  newFile.value.trail = currentTrail.value

  if (!validHepName(newFile.value.name)) {
    errors.value = true
    errorMsg.value = 'Invalid filename'
    newFile.value.name = ''
    return
  }

  if (!(newFile.value.url) || newFile.value.url === '') {
    errors.value = true
    errorMsg.value = 'URL cannot be blank'
    return
  }

  if (!(newFile.value.extension) || newFile.value.extension === '') {
    errors.value = true
    errorMsg.value = 'Extension cannot be blank'
    return
  }

  const file = {
    trail: newFile.value.trail,
    url: newFile.value.url,
    name: newFile.value.name.toLowerCase(),
    extension: newFile.value.extension
  }

  groveAddNode(selectedSpace.value, file);
  stopDraftingNode()
};

const selectedSpace = computed(() => {
  return store.state.currentSpace
})
const selectedTrail = computed(() => {
  return store.state.currentTrail
})

const stopDraftingNode = () => {
  newFile.value = {}
  emit('cancelNewNode')
}
</script>
