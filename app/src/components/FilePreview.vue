<template>
  <component :is="tag" class="items-center grid grid-cols-8 file-preview">
    <div class="flex flex-row items-center col-span-6">
      <button
        aria-label="Remove"
        class="px-2 py-2 mr-2 text-red-400 bg-red-100 close-icon hover:text-red-500 hover:bg-red-200 rounded-md opacity-70"
        @click="$emit('remove', file)"
        :disabled="file && (file.status === true || file.status === false || file.status === 'loading')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
      <div>
        <img
          v-if="isImg(file)"
          :src="file.url"
          width="40"
          class="text-stone-500"
          :alt="file.file.name"
          :title="file.file.name"
        />

        <div v-else class="flex">
          <div class="mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-stone-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>

          <div
            class="w-80 text-stone-500"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ file.file.name }}
          </div>

        </div>
      </div>
    </div>

    <div class="text-right col-span-2">
      <div class="flex-grow">
        <span
          class="status-indicator loading-indicator"
          v-show="file.status == 'loading'"
          >In Progress</span
        >
        <span
          class="status-indicator success-indicator"
          v-show="file.status == true"
          >Uploaded</span
        >
        <span
          class="status-indicator failure-indicator"
          v-show="file.status == false"
          >Error</span
        >
      </div>
    </div>
  </component>
</template>

<script setup>
import { computed, watch } from 'vue';

defineProps({
  file: { type: Object, required: true },
  tag: { type: String, default: 'li' },
});
defineEmits(['remove']);

const isImg = (file) => {
  const extension = file.id.split('/')[1];
  const imgExtensions = ['png', 'jpg', 'gif'];
  if (imgExtensions.includes(extension.toLowerCase())) {
    return true;
  }
  return false;
};
</script>
