<template>
  <div class="flex flex-col w-20 p-1">

    <div class="cursor-pointer" @click="openParent">
      <div class="text-center text-stone-500">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
</svg>

        </span>
      </div>
      <div class="w-20 text-center text-blue-400 truncate-break">
        <span class="text-blue-400 underline"
          >Parent Folder
        </span>
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

const openParent = () => {
  store.dispatch(ActionTypes.GO_TO_PARENT);
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
  moveTo.value = node.id;
};
</script>
