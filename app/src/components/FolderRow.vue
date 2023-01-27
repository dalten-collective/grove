<template>
  <div class="col-span-3">
    <div class="flex cursor-pointer"
      @click="openFolder(folder.ctrail)"
    >
        <span class="mr-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-stone-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
      </span>
      <span
        class="text-blue-400 underline"
        >{{ trimLeadingSlash(folder.display) }}
      </span>
    </div>
  </div>
  <div class="col-span-1 text-stone-700"></div>
  <div class="col-span-2 text-stone-700"></div>
  <div class="col-span-2 text-stone-700">Folder</div>
  <div class="col-span-1 text-stone-700">
    <span @click="menuOpen = !menuOpen" class="cursor-pointer">...</span>
  </div>

  <div v-if="menuOpen" style="position: absolute">
    <div
      style="position: relative"
      class="p-4 bg-white border shadow-md rounded-md"
    >
      <ul>
        <li>
          <span
            @click="deleteFolder()"
            class="text-red-500 underline cursor-pointer"
            >delete</span
          >
        </li>
        <li>
          <span
            @click="moveFolder()"
            class="text-blue-500 underline cursor-pointer"
            >move</span
          >
        </li>
      </ul>
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

import { deleteFolder as troveDeleteFolder } from '@/api/troveAPI';
import { moveFolder as troveMoveFolder } from '@/api/troveAPI';
import { addFolder as troveAddFolder } from '@/api/troveAPI';

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

const deleteFolder = () => {
  troveDeleteFolder(currentSpace.value, props.folder.ctrail);
};

const moveFolder = () => {
  buildNest();
  moving.value = true;
};

const doMoveFolder = () => {
  troveMoveFolder(currentSpace.value, props.folder.ctrail, moveTo.value);
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
