<template>
  <div class="col-span-3">
    <a :href="file.url" target="_blank" class="text-blue-400 underline">
      <div class="flex cursor-pointer">
        <span class="mr-1">
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
        <span>{{ file.dat.title }}{{ file.dat.extension }}</span>
      </div>
    </a>
  </div>

  <div class="col-span-1 text-stone-700">-</div>
  <div class="col-span-2 text-stone-700">
    {{ new Date(file.dat.from * 1000).toLocaleString() }}
  </div>
  <div class="col-span-2 text-stone-700">
    <button
      type="button"
      :data-tooltip-target="`tooltip-default-${file.dat.extension}`"
      class="w-full text-left"
      style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
    >
      {{ fileType }}
    </button>
    <div
      :id="`tooltip-default-${file.dat.extension}`"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg opacity-0 transition-opacity duration-300 shadow-sm tooltip dark:bg-gray-700"
    >
      {{ fileType }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
  <div class="col-span-1 text-stone-700">

    <div>
      <button
        :data-popover-target="`fileContextMenu-${fileHash}`"
        data-popover-placement="left"
        class="cursor-pointer"
      >
        . . .
      </button>
    </div>
    <div
      data-popover
      :id="`fileContextMenu-${fileHash}`"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-2 py-4 bg-white border border-gray-200 rounded-lg opacity-0 text-stone-500 transition-opacity duration-300 shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div class="px-2 py-2">
        <ul>
          <li class="mb-2">
            <button @click="moveNode" :data-modal-target="`moveModal-${ fileHash }`" :data-modal-toggle="`moveModal-${ fileHash }`" class="" type="button">
            Move
            </button>
          </li>

          <li>
            <button @click="deleteNode()" type="button"
              class="text-red-500 cursor-pointer"
            >
              Delete
            </button>
          </li>

        </ul>
      </div>
      <div data-popper-arrow></div>
    </div>
  </div>

<div :id="`moveModal-${ fileHash }`" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full text-stone-700">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-stone-700 dark:text-white">
                    Move file
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" :data-modal-hide="`moveModal-${ fileHash }`">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div v-if="!moveTo">
                Choose a new path:
              </div>
              <div v-else>
                moving {{ file.dat.title }} to {{ moveTo ? moveTo : 'Choose:' }}
              </div>
              <treeview
                class="text-stone-700"
                @nodeFocus="gotFocus($event)"
                :nodes="flatNest"
                :config="treeConfig"
              />
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 border-gray-200 rounded-b space-x-2 dark:border-gray-600">
                <button :disabled="!moveTo" @click="doMoveNode" :data-modal-hide="`moveModal-${ fileHash }`" type="button" class="border border-blue-400 px-2 py-1.5 rounded-md">Move</button>
                <button @click="resetMove" :data-modal-hide="`moveModal-${ fileHash }`" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
        </div>
    </div>
</div>

  <div v-if="moving" v-click-outside="moveClickOutside">
    <div
      style="position: absolute; top: 100px; left: 50%"
      class="p-4 bg-white border shadow-md rounded-md"
    >
      <div style="position: relative">
        <treeview
          @nodeFocus="gotFocus($event)"
          :nodes="flatNest"
          :config="treeConfig"
        />
        <button @click="doMoveNode">Move</button>
      </div>
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

import { deleteNode as troveDeleteNode } from '@/api/troveAPI';
import { moveNode as troveMoveNode } from '@/api/troveAPI';
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

const fileType = computed(() => {
  const result = filetypes[props.file.dat.extension];
  if (result) {
    return result;
  } else {
    return props.file.dat.extension;
  }
});

const fileHash = computed(() => {
  return md5(props.file.url);
});

const deleteNode = () => {
  troveDeleteNode(currentSpace.value, props.currentTrail, props.fileID);
};

const moveNode = () => {
  buildNest();
};

const resetMove = () => {
  moveTo.value = ''
}

const doMoveNode = () => {
  if (!moveTo.value) {
    return
  }
  if (moveTo.value === props.currentTrail) {
    console.log('cannot move to same place')
    return
  }

  troveMoveNode(
    currentSpace.value,
    props.fileID,
    props.currentTrail,
    moveTo.value
  );

  resetMove()
};

const moveClickOutside = () => {
  console.log('clicked outside move');
};
const menuClickOutside = () => {
  console.log('clicked outside menu');
};

////
const flatNest = ref({});
const buildNest = () => {
  flatNest.value = buildFlatnest();
};
// TODO: de-dupe
const buildFlatnest = () => {
  var fn = {};
  troveFolders.value.forEach((fullPath) => {
    const text = fullPath.split('/')[fullPath.split('/').length - 1];
    let displayText;
    if (text === '') {
      displayText = '/';
    } else {
      displayText = text;
    }

    let children;
    if (fullPath === '/') {
      children = Array.from(
        new Set(
          troveFolders.value
            .map((fp) => {
              return fp.split('/')[1];
            })
            .filter((n) => n !== '')
        )
      );
    } else {
      children = troveFolders.value
        .filter((fp) => {
          const ourLength = fp.split('/').length;
          return (
            fp.startsWith(fullPath) &&
            ourLength - fullPath.split('/').length == 1
          );
        })
        .filter((fp) => fp !== fullPath);
    }

    fn[fullPath] = {
      text: displayText,
      children,
      state: {},
    };
  });
  return fn;
};
// TODO: de-dupe
const treeConfig = computed(() => {
  const manyRoots = new Set();
  troveFolders.value.forEach((fullPath) => {
    manyRoots.add(`/${fullPath.split('/')[1]}`);
  });
  const roots = Array.from(manyRoots).filter((fp) => fp !== '/');
  console.log('roots ', roots);
  return {
    disabled: false,
    roots,
    padding: 25,
  };
});
// TODO: de-dupe
const troveFolders = computed(() => {
  if (!selectedSpace.value) {
    return [];
  }
  return Object.keys(theSelectedSpace.value.trove);
});
// TODO: de-dupe
const selectedSpace = computed(() => {
  return store.state.currentSpace;
});
// TODO: de-dupe
const theSelectedSpace = computed(() => {
  if (!selectedSpace.value) {
    return {};
  }
  return troves.value[selectedSpace.value];
});
const troves = computed(() => store.state.troves);

const gotFocus = (node) => {
  console.log('focused ', node);
  moveTo.value = node.id;
};
</script>
