<template>
  <div class="grid grid-cols-3 gap-4">

    <div class="px-2 py-2 my-2 bg-white border col-start-2 col-span-2 border-stone-300 rounded-md"> <!-- path tray -->
      <div class="flex flex-row" v-if="selectedSpace">
        <div>
          <span
            @click="goToRoot()"
            class="p-2 mr-2 rounded-lg cursor-pointer bg-stone-100 text-stone-700"
          >
          {{ selectedSpace.split('/')[1] }}
          </span>
        </div>

        <div v-if="selectedTrail !== '/'" v-for="(t, i) in selectedTrail.split('/')" :key="i">
          <div v-if="t === ''">
          </div>
          <div v-else>
            <span class="mx-1 text-stone-400">/</span>
            <span
            @click="changeTrail(selectedTrail, i)"
            class="p-2 mr-2 rounded-lg cursor-pointer bg-stone-100 text-stone-700">
              {{ t === '' ? '<root>' : t }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="grid grid-cols-3 gap-4">
    <div class="pr-4 bg-white border border-stone-300 col-span-1 rounded-md h-[90vh]">
      <div class="pl-2 mt-2 mb-24">

        <div class="px-1 mb-4 bg-white" :class="changingSpace ? 'rounded-lg shadow-md' : ''" style="position: absolute" >
          <div class="flex flex-row items-center p-1 cursor-pointer rounded-md hover:outline hover:outline-sky-100" :class="changingSpace ? 'opacity-30' : ''" @click="changingSpace = true">
            <div class="w-12 h-12 border rounded-md">
              <div class="my-auto text-center">
                <span class="text-xl">~</span>
              </div>
            </div>
            <div class="flex flex-col py-1 ml-2">
              <div class="text-stone-500">
              {{ trimShip(shipInSpat(selectedSpace)) }}
              </div>
              <div class="text-lg">
              {{ spaceInSpat(selectedSpace) }}
              </div>
            </div>
          </div>

          <Transition>
            <div v-if="changingSpace" class="mb-4 bg-white" style="position: relative; z-index: 50;" >
              <div v-for="spat in Object.keys(troves)" :key="spat">

              <div class="flex flex-row items-center px-2 mb-2 rounded-md hover:outline hover:outline-sky-100" :class="spat === selectedSpace ? 'outline outline-sky-500' : ''">

                  <div class="w-12 h-12 border rounded-md">
                    <div class="my-auto text-center">
                      <span class="text-xl">~</span>
                    </div>
                  </div>
                  <div class="flex flex-col py-1 mb-2 ml-2 cursor-pointer rounded-md" @click="changeSpace(spat)">
                    <div class="text-stone-500">
                    {{ trimShip(shipInSpat(spat)) }}
                    </div>
                    <div class="text-lg">
                    {{ spaceInSpat(spat) }}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </Transition>
        </div>

      </div>

      <div class="flex flex-row px-4">
        <button
          @click="menuShown = !menuShown"
          class="p-1 bg-sky-100 rounded-md hover:shadow-md opacity-70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-sky-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

        </button>
      </div>

      <div
        v-if="menuShown"
        class="absolute p-4 bg-white shadow-md"
        style="width: 200px; height: 100px; z-index: 100"
      >
        <div>
          <span
            class="text-blue-500 underline cursor-pointer"
            @click="doAddFolder"
            >New Folder</span
          >
        </div>
        <div>
          <span class="text-blue-500 underline cursor-pointer" @click="doAddNode"
            >New File</span
          >
        </div>
      </div>

      <div
        v-if="addFolderMenu"
        class="absolute p-4 bg-white shadow-md w-34 h-34"
        style="z-index: 100"
      >
        <div>
          <div class="mb-2">
            <input
              hidden
              type="text"
              disabled
              placeholder="/"
              v-model="newFolder.trail"
            />
            <span class="pr-1 opacity-50">{{ newFolder.trail }}/</span
            ><input
              class="p-2 rounded-sm bg-stone-100"
              type="text"
              placeholder="folder name"
              v-model="newFolder.name"
            />
            <button
              @click="addFolder"
              class="px-4 py-2 text-white bg-blue-500 shadow-md hover:shadow-lg hover:opacity-80 rounded-md"
            >
              Add Folder
            </button>
          </div>

          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <div>
                <span
                  class="text-green-500 underline cursor-pointer"
                  @click="somewhereElse = !somewhereElse"
                  >Change path...</span
                >
              </div>
              <div>
                <button
                  class="px-4 py-2 text-white shadow-md bg-stone-400 hover:shadlow-lg hover:opacity-80 rounded-md"
                  @click="addFolderMenu = false"
                >
                  cancel
                </button>
              </div>
            </div>

            <div v-if="somewhereElse">
              <treeview
                @nodeFocus="gotFocus($event)"
                :nodes="flatNest"
                :config="treeConfig"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="addNodeMenu"
        class="absolute p-4 bg-white shadow-md w-34 h-34"
        style="z-index: 100"
      >
        <div>
          <div class="mb-2 grid grid-cols-2 gap-4">
            <div>
              <span
                class="text-green-500 underline cursor-pointer"
                @click="somewhereElse = !somewhereElse"
                >Change path...</span
              >
            </div>
            <div v-if="somewhereElse">
              <treeview
                @nodeFocus="gotFocus($event)"
                :nodes="flatNest"
                :config="treeConfig"
              />
            </div>
          </div>

          <div class="flex flex-col">
            <input
              hidden
              type="text"
              class="p-2 rounded-sm bg-stone-100"
              placeholder="path"
              v-model="newFile.trail"
            />
            <div class="flex flex-row items-center">
              <span class="pr-1 opacity-50">{{ newFile.trail }}/</span>
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                  <input
                    type="text"
                    class="p-2 mr-1 rounded-sm bg-stone-100"
                    placeholder="filename"
                    v-model="newFile.name"
                  />
                  <input
                    type="text"
                    class="p-2 rounded-sm bg-stone-100"
                    placeholder="extension"
                    v-model="newFile.extension"
                  />
                </div>
              </div>
            </div>

            <div class="mt-2">
              <input
                type="text"
                class="p-2 rounded-sm bg-stone-100"
                placeholder="url"
                v-model="newFile.url"
              />
            </div>
          </div>
          <div class="flex flex-row justify-end">
            <button
              @click="addNode"
              class="px-4 py-2 text-white bg-blue-500 shadow-md hover:shadow-lg hover:opacity-80 rounded-md"
            >
              Add File
            </button>
            <button
              class="px-4 py-2 text-white shadow-md bg-stone-400 hover:shadlow-lg hover:opacity-80 rounded-md"
              @click="addNodeMenu = false"
            >
              cancel
            </button>
          </div>
        </div>
      </div>

      <div class="px-3 mt-6">
        <treeview
          class="cursor-pointer"
          @nodeFocus="gotFocus($event)"
          :nodes="flatNest"
          :config="treeConfig"
        />
      </div>
    </div>

    <div class="pl-4 bg-white border col-span-2 rounded-md border-stone-300">
      <div
        v-if="
          (
          filesInFolder === undefined ||
          filesInFolder.length === 0 ||
          Object.keys(filesInFolder).length === 0
          ) && foldersInFolder.length === 0
        "
      >
        This folder is empty
      </div>
      <div v-else>
        <table class="w-full">
          <thead>
            <th>Name</th>
            <th>Size</th>
            <th>Date</th>
            <th>Kind</th>
            <th></th>
          </thead>
          <tbody>
            <FolderRow v-for="f in foldersInFolder" :key="f" :folder="f" />
            <FileRow v-for="(f, id) in filesInFolder" :key="id" :file="f" :fileID="id" :currentTrail="selectedTrail" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useStore } from '@/store/store';
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';
import { sigShip, trimShip, shipInSpat, spaceInSpat } from '@/helpers'

import { addNode as troveAddNode } from '@/api/troveAPI';
import { addFolder as troveAddFolder } from '@/api/troveAPI';

import FileRow from '@/components/FileRow.vue';
import FolderRow from '@/components/FolderRow.vue';

import 'vue3-treeview/dist/style.css';
import treeview from 'vue3-treeview';

const store = useStore();

const selectedSpace = computed(() => {
  return store.state.currentSpace
})
const selectedTrail = computed(() => {
  return store.state.currentTrail
})

const newFile = ref({});
const newFolder = ref({});
const flatNest = ref({});
const menuShown = ref(false);
const changingSpace = ref(false);

const addFolderMenu = ref(false);
const somewhereElse = ref(false);

const addNodeMenu = ref(false);
const firstLoad = ref(false);

const treeConfig = computed(() => {
  const manyRoots = new Set();
  console.log('tf ', troveFolders.value)
  troveFolders.value.forEach((fullPath) => {
    console.log('fp ', fullPath)
    manyRoots.add(`/${fullPath.split('/')[1]}`);
  });
  const roots = Array.from(manyRoots).filter((fp) => fp !== '/');
  return {
    disabled: false,
    roots,
    padding: 25,
    closedIcon: {
      type: "shape",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "rgb(120 113 108)",
      className: "w-6 h-6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      draw: "M8.25 4.5l7.5 7.5-7.5 7.5",
    },
    openedIcon: {
      type: "shape",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "rgb(120 113 108)",
      className: "w-6 h-6",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      draw: "M19.5 8.25l-7.5 7.5-7.5-7.5",
    }
  };
});

const troves = computed(() => store.state.troves);

onMounted(() => {
  const deskname = 'trove';
  startAirlock(deskname);
});

watch(troves, async (newTroves) => {
  // Set 'our' space on first load.
  if (newTroves && !firstLoad.value) {
    const defaultSpat = `${ sigShip(window.ship) }/our`
    store.dispatch(ActionTypes.CURRENT_SPACE_SET, defaultSpat)
    firstLoad.value = true
  }
  // TODO: when using Realm, update the above to use the currently-selected space
})

onUnmounted(() => {
  // Maybe:
  // closeAirlock()
});

const gotFocus = (node) => {
  const path = node.id;
  console.log('focused path ', path);
  store.dispatch(ActionTypes.CURRENT_TRAIL_SET, node.id)
};

const openFolder = (trail) => {
  store.dispatch(ActionTypes.CURRENT_TRAIL_SET, trail)
}

const changeSpace = (spat) => {
  store.dispatch(ActionTypes.CURRENT_SPACE_SET, spat)
  changingSpace.value = false
  // When using select:
  // const spat = evt.target.value
  // store.dispatch(ActionTypes.CURRENT_SPACE_SET, spat)
  // changingSpace.value = false
}

const goToRoot = () => {
  store.dispatch(ActionTypes.CURRENT_TRAIL_SET, "/")
}

const changeTrail = (wholeTrail, index) => {
  console.log('wholeTrail ', wholeTrail)
  console.log('i ', index)
  if (index === 0) {
    store.dispatch(ActionTypes.CURRENT_TRAIL_SET, "/")
  } else {
    const newTrail = wholeTrail.split('/').slice(0, index+1).join('/')
    store.dispatch(ActionTypes.CURRENT_TRAIL_SET, newTrail)
  }
  Object.keys(flatNest.value).forEach((key) => {
    flatNest.value[key].state.opened = false
  })
  // const parent = flatNest.value[newTrail].parent
  // TODO: fix.
  // console.log('parent ', parent)
  // parent.state.opened = true
}

const doAddFolder = () => {
  menuShown.value = false;
  addFolderMenu.value = true;
};

const doAddNode = () => {
  menuShown.value = false;
  addNodeMenu.value = true;
};

const addNode = () => {
  troveAddNode(selectedSpace.value, newFile.value);
  addNodeMenu.value = false;
  somewhereElse.value = false;
};
const addFolder = () => {
  troveAddFolder(selectedSpace.value, newFolder.value);
  addFolderMenu.value = false;
  somewhereElse.value = false;
};

const selectSpace = (spat) => {
  store.dispatch(ActionTypes.CURRENT_SPACE_SET, spat)
};

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

watch(selectedSpace, (newSpat) => {
  newFolder.value.trail = '/';
  newFile.value.trail = '/';
  flatNest.value = {}; // TODO:
  flatNest.value = buildFlatnest();
});

watch(selectedTrail, (newTrail) => {
  newFolder.value.trail = newTrail;
  newFile.value.trail = newTrail;
});

watch(troves, (newTroves) => {
  flatNest.value = {}; // TODO:
  flatNest.value = buildFlatnest();
});

const theSelectedSpace = computed(() => {
  if (!selectedSpace.value) {
    return {};
  }
  return troves.value[selectedSpace.value];
});

const troveFolders = computed(() => {
  if (!selectedSpace.value) {
    return [];
  }
  return Object.keys(theSelectedSpace.value.trove);
});

const filesInFolder = computed(() => {
  if (!selectedSpace.value) {
    return [];
  }
  return theSelectedSpace.value.trove[selectedTrail.value];
});

const foldersInFolder = computed(() => {
  if (!selectedSpace.value) {
    return []
  }
  return directChildrenOfTrail(selectedTrail.value)
})

const directChildrenOfTrail = (trail) => {
  if (!selectedSpace.value) {
    return []
  }
  if (!flatNest.value) {
    return []
  }

  if (trail === '/') {
    const children = Array.from(
      new Set(
        Object.keys(flatNest.value).map(k => k.split('/')[1])
      )
    )
    console.log('chil ', children)
    return children.map((c) => {
      return {
        display: c,
        trail: `/${c}`,
        ctrail: `/${c}`,
      }
    })
  }

  if (!flatNest.value[trail]) {
    return [{
      display: 'something went wrong with the tree',
      trail: '/',
      ctrail: '/',
    }]
  }
  return flatNest.value[trail].children.map((ctrail) => {
    let name;
    if (trail === '/') {
      name = ctrail
      ctrail = `${ trail }${ ctrail }`
    } else {
      name = ctrail.substring(trail.length, ctrail.length)
    }
    return {
      display: name,
      trail: trail,
      ctrail
    }
  })
}

const trimLeadingSlash = (name) => {
  if (name[0] === '/') {
    return name.substring(1, name.length)
  }
  return name
}

const theFile = (troveNode) => {
  console.log('tn ', troveNode);
  const id = Object.keys(troveNode)[0];
  return troveNode[id];
};

const startAirlock = (deskname: string) => {
  store.dispatch(ActionTypes.AIRLOCK_OPEN, deskname);
};

const closeAirlock = () => {
  // Maybe you want this.
};
</script>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.25s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
