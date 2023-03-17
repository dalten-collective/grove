<template>
  <div class="col-span-3">
    <div class="flex cursor-pointer" @click="openFolder(folder.ctrail)">
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
            d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      </span>
      <span class="text-blue-400 underline"
        >{{ trimLeadingSlash(folder.display) }}
      </span>
    </div>
  </div>
  <div class="col-span-1 text-stone-700"></div>
  <div class="col-span-2 text-stone-700"></div>
  <div class="col-span-2 text-stone-700">Folder</div>
  <div class="col-span-1 text-stone-700">
    <div>
      <button
        :data-popover-target="`folderContextMenu-${folderHash}`"
        data-popover-placement="left"
        class="cursor-pointer text-stone-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
      </button>
    </div>
    <div
      data-popover
      :id="`folderContextMenu-${folderHash}`"
      role="tooltip"
      class="absolute z-10 invisible inline-block px-2 py-4 bg-white border border-gray-200 rounded-lg opacity-0 text-stone-500 transition-opacity duration-300 shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div class="px-2 py-2">
        <ul>
          <li class="mb-2">
            <button
              @click="moveFolder"
              :data-modal-target="`moveModal-${folderHash}`"
              :data-modal-toggle="`moveModal-${folderHash}`"
              class=""
              type="button"
            >
              Move
            </button>
          </li>

          <li>
            <button
              @click="deleteFolder()"
              type="button"
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

  <div
    :id="`moveModal-${folderHash}`"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full text-stone-700"
  >
    <div class="relative w-full h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-stone-700 dark:text-white">
            Move folder
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-hide="`moveModal-${folderHash}`"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div v-if="!moveTo">Choose a new path:</div>
          <div v-else>
            moving {{ folder.display }} to {{ moveTo }}
          </div>
          <treeview
            class="text-stone-700"
            @nodeFocus="gotFocus($event)"
            :nodes="flatNest"
            :config="treeConfig"
          />
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 border-gray-200 rounded-b space-x-2 dark:border-gray-600"
        >
          <button
            :disabled="!moveTo"
            @click="doMoveFolder"
            :data-modal-hide="`moveModal-${folderHash}`"
            type="button"
            class="border border-blue-400 px-2 py-1.5 rounded-md"
          >
            Move
          </button>
          <button
            @click="resetMove"
            :data-modal-hide="`moveModal-${folderHash}`"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-md border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
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
        moving {{ folder.display }} to {{ moveTo }}
        <treeview
          @nodeFocus="gotFocus($event)"
          :nodes="flatNest"
          :config="treeConfig"
        />
        <button @click="doMoveFolder">Move</button>
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

import 'vue3-treeview/dist/style.css';
import treeview from 'vue3-treeview';

import { deleteFolder as groveDeleteFolder } from '@/api/groveAPI';
import { moveFolder as groveMoveFolder } from '@/api/groveAPI';
import { addFolder as groveAddFolder } from '@/api/groveAPI';

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

import md5 from 'md5';

interface Props {
  folder: object;
}
const props = defineProps<Props>();

const store = useStore();
const currentSpace = computed(() => {
  return store.state.currentSpace;
});
const selectedTrail = computed(() => {
  return store.state.currentTrail;
});

const menuOpen = ref(false);
const moving = ref(false);
const moveTo = ref('');

const folderHash = computed(() => {
  return md5(props.folder.ctrail);
});

const deleteFolder = () => {
  groveDeleteFolder(currentSpace.value, props.folder.ctrail);
};

const moveFolder = () => {
  buildNest();
};

const doMoveFolder = () => {
  if (!moveTo.value) {
    return
  }
  if (moveTo.value === props.folder.ctrail) {
    console.log('cannot move a folder into itself')
    return
  }
  groveMoveFolder(currentSpace.value, props.folder.ctrail, moveTo.value);
};

const trimLeadingSlash = (name) => {
  if (name[0] === '/') {
    return name.substring(1, name.length);
  }
  return name;
};

const openFolder = (trail) => {
  store.dispatch(ActionTypes.CURRENT_TRAIL_SET, trail);
};

//////
const flatNest = ref({});
const buildNest = () => {
  flatNest.value = buildFlatnest();
};
// TODO: de-dupe
const buildFlatnest = () => {
  var fn = {};
  groveFolders.value.forEach((fullPath) => {
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
          groveFolders.value
            .map((fp) => {
              return fp.split('/')[1];
            })
            .filter((n) => n !== '')
        )
      );
    } else {
      children = groveFolders.value
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
  groveFolders.value.forEach((fullPath) => {
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
const groveFolders = computed(() => {
  if (!selectedSpace.value) {
    return [];
  }
  return Object.keys(theSelectedSpace.value.grove);
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
  return groves.value[selectedSpace.value];
});
const groves = computed(() => store.state.groves);

const gotFocus = (node) => {
  console.log('focused ', node);
  moveTo.value = node.id;
};
</script>
