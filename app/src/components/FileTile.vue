<template>
  <div class="flex flex-col w-40 p-1 mr-2">
    <div class="group" style="position: relative">
      <div
        class="invisible p-2 text-blue-400 bg-white rounded-full shadow-md cursor-pointer group-hover:visible"
        style="position: absolute; top: 10px; right: 10px"
        @click="copyLink"
      >
        <div v-if="copied" class="text-stone-400">Copied!</div>
        <div v-else class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.8"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </div>
      </div>

      <div v-if="isImage">
        <div class="flex flex-row items-center w-40 h-40 mx-auto">
          <img contain class="rounded-md" :src="file.url" />
        </div>
      </div>

      <div v-else>
        <div class="flex flex-row items-center w-40 h-40 mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-40 h-40 text-stone-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>
      </div>

      <a :href="file.url" target="_blank" class="text-blue-400 underline">
        <div class="w-40 text-center text-blue-400 truncate-break">
          <span>{{ file.dat.title }}{{ file.dat.extension }}</span>
        </div>
      </a>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';
import { sigShip } from '@/helpers';
import filetypes from '@/helpers/filetypes.json';
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite';

onMounted(() => {
  initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();
});

// import vClickOutside from 'click-outside-vue3'
// const vdClickOutside = vClickOutside.directive

import 'vue3-treeview/dist/style.css';
import treeview from 'vue3-treeview';

import { deleteNode as groveDeleteNode } from '@/api/groveAPI';
import { moveNode as groveMoveNode } from '@/api/groveAPI';
import md5 from 'md5';

interface Props {
  file: object;
  fileID: string;
  currentTrail: string;
}
const props = defineProps<Props>();

const store = useStore();
const currentSpace = computed(() => {
  return store.state.currentSpace;
});

const menuOpen = ref(false);
const moving = ref(false);
const moveTo = ref('');
const copied = ref(false);

const fileHash = computed(() => {
  return md5(props.file.url);
});

const isImage = computed(() => {
  return [
    '.png',
    '.gif',
    '.jpg',
    '.svg',
    '.jpeg',
    '.apng',
    '.avif',
    '.bmp',
    '.tif',
    '.tiff',
    '.webp',
  ].includes(props.file.dat.extension.toLowerCase());
});

const copyLink = () => {
  const link = props.file.url;
  navigator.clipboard.writeText(link);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 700);
};

</script>
