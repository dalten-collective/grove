<template>
  <tr>
    <td>
      <a
        :href="file.url"
        target="_blank"
        class="text-blue-400 underline"
        >{{ file.dat.title }}</a
      >
    </td>
    <td>0</td>
    <td>
      {{ new Date(file.dat.from * 1000).toLocaleString() }}
    </td>
    <td>
      {{ file.dat.extension }}
    </td>
    <td>
      <div>
        <span @click="menuOpen = !menuOpen" class="cursor-pointer">...</span>
      </div>
      <div v-if="menuOpen" style="position: absolute;" v-click-outside="menuClickOutside">
        <div style="position: relative;" class="p-4 bg-white border shadow-md rounded-md">
          <ul>
            <li>
              <span @click="deleteNode()" class="text-red-500 underline cursor-pointer">delete</span>
            </li>
            <li>
              <span @click="moveNode()" class="text-blue-500 underline cursor-pointer">move</span>
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>
  <div v-if="moving" v-click-outside="moveClickOutside">
    <div style="position: absolute; top: 100px; left: 50%;" class="p-4 bg-white border shadow-md rounded-md">
      <div style="position: relative;">
        moving {{ file.dat.title }} to {{ moveTo }}
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
import { sigShip } from '@/helpers'

// import vClickOutside from 'click-outside-vue3'
// const vdClickOutside = vClickOutside.directive

import 'vue3-treeview/dist/style.css';
import treeview from 'vue3-treeview';

import { deleteNode as troveDeleteNode } from '@/api/troveAPI'
import { moveNode as troveMoveNode } from '@/api/troveAPI'

interface Props {
  file: object;
  fileID: string;
  currentTrail: string;
}
const props = defineProps<Props>();

const store = useStore()
const currentSpace = computed(() => {
  return store.state.currentSpace
})

const menuOpen = ref(false)
const moving = ref(false)
const moveTo = ref('')

const deleteNode = () => {
  troveDeleteNode(currentSpace.value, props.currentTrail, props.fileID);
};

const moveNode = () => {
  buildNest()
  moving.value = true
};

const doMoveNode = () => {
  troveMoveNode(currentSpace.value, props.fileID, props.currentTrail, moveTo.value)
}

const moveClickOutside = () => {
  console.log('clicked outside move')
}
const menuClickOutside = () => {
  console.log('clicked outside menu')
}

////
const flatNest = ref({})
const buildNest = () => {
  flatNest.value = buildFlatnest()
}
// TODO: de-dupe
const buildFlatnest = () => {
  var fn = {};
  troveFolders.value.forEach((fullPath) => {

    const text = fullPath.split('/')[fullPath.split('/').length - 1]
    let displayText
    if (text === ''){
      displayText = '/'
    } else {
      displayText = text
    }

    let children
    if (fullPath === '/') {
      children = Array.from(
        new Set(
          troveFolders.value.map((fp) => {
            return fp.split('/')[1]
          }).filter((n) => n !== '')
        )
      )
    } else {
      children = troveFolders.value
        .filter((fp) => {
          const ourLength = fp.split('/').length
          return (
            fp.startsWith(fullPath) &&
            ourLength - fullPath.split('/').length == 1
          )

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
  return store.state.currentSpace
})
// TODO: de-dupe
const theSelectedSpace = computed(() => {
  if (!selectedSpace.value) {
    return {};
  }
  return troves.value[selectedSpace.value];
});
const troves = computed(() => store.state.troves);

const gotFocus = (node) => {
  console.log('focused ', node)
  moveTo.value = node.id
}
</script>
