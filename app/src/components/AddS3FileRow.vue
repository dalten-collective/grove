<template>
  <div class="col-span-9">
    <FileDrop
      class="mb-1 drop-area"
      @files-dropped="addFiles"
      #default="{ dropZoneActive }"
    >
      <div class="flex flex-row w-full mb-2">
        <label
          for="file-input"
          class="flex flex-col items-center justify-center w-full border-2 rounded-lg cursor-pointer border-stone bg-stone-100 dark:hover:bg-stone-800 dark:bg-stone-700 hover:bg-stone-100 dark:border-stone-600 dark:hover:border-stone-500 dark:hover:bg-stone-400"
          :class="dropZoneActive ? 'border border-solid border-stone-200 bg-stone-300' : 'border-dashed'"
        >
          <div class="flex flex-col items-center justify-center pt-2 pb-2">
            <!--
            <svg
              aria-hidden="true"
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            -->
            <p class="text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <!--
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
            -->
          </div>
          <input type="file" class="hidden" id="file-input" multiple @change="onInputChange" />
        </label>

        <button
          class="px-2 py-2 ml-2 text-red-400 bg-red-100 hover:text-red-500 hover:bg-red-200 rounded-md opacity-70"
          @click="stopDraftingUpload"
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
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </button>
      </div>

      <ul v-show="files.length">
        <FilePreview
          class="mb-1"
          v-for="file of files"
          :key="file.id"
          :file="file"
          tag="li"
          @remove="removeFile"
        />
      </ul>

      <div class="flex items-center justify-end w-full">
        <button
          class="flex items-center px-4 py-2 rounded-md opacity-70"
          :class="(s3UploadButtonStatus.loading || s3UploadButtonStatus.disabled) ? 'bg-stone-200 text-stone-400' : 'hover:text-green-500 hover:bg-green-200 text-green-400 bg-green-100 '"
          @click="uploadFiles(files)"
          v-if="files.length > 0"
          :disabled="files.length === 0 || s3UploadButtonStatus.loading || s3UploadButtonStatus.disabled"
        >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
</svg>
          <div class="ml-2">
            Upload
          </div>
        </button>

      </div>
      <div class="mt-2 text-center">
        <p class="text-stone-400">
          Upload files in this folder
        </p>
      </div>
    </FileDrop>
  </div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';
import { sigShip } from '@/helpers';
import { initTooltips } from 'flowbite';

import FileDrop from '@/components/FileDrop.vue';
import FilePreview from '@/components/FilePreview.vue';
import useFileList from '@/compositions/file-list';

import  createUploader  from  '@/compositions/file-uploader'

import { addFolder as groveAddFolder } from '@/api/groveAPI';
import {current} from 'immer';

const { files, addFiles, removeFile } = useFileList();
function onInputChange(e) {
    addFiles(e.target.files)
    e.target.value = null
}

const emit = defineEmits(['cancelUpload']);

onMounted(() => {
  initTooltips();
});

interface Props {}
const props = defineProps<Props>();

const store = useStore();

const s3UploadButtonStatus = computed(() => {
  return store.getters[GetterTypes.ELEMENT_STATUS_MAP]('s3UploadButton')
})
const currentBucketName = computed(() => {
  return store.getters[GetterTypes.CURRENT_S3_BUCKET]
})
const currentBucketRegion = computed(() => {
  return store.state.s3Config.region
})
const s3Config = computed(() => {
  return store.state.s3Config
})
const s3Credentials = computed(() => {
  return store.state.s3Credentials
})

const currentSpace = computed(() => {
  return store.state.currentSpace;
});
const currentTrail = computed(() => {
  return store.state.currentTrail;
});

const { uploadFiles } = createUploader(
  {
    space: currentSpace.value, trail: currentTrail.value
  },
  {
    config: s3Config.value, credentials: s3Credentials.value
  },
  store
)

const uploadProgress = computed(() => {
  return store.getters[GetterTypes.ELEMENT_STATUS_MAP]('s3UploadProgress')
})

watch(uploadProgress, (val) => {
  if (val.success) {
    emit('cancelUpload');
  }
})

const stopDraftingUpload = () => {
  emit('cancelUpload');
};
</script>
