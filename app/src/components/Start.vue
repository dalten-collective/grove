<template>
  <div class="flex flex-row">
    <div class="flex-1">
      <ul>
        <li v-for="space in Object.keys(troves)">
          <div @click="selectSpace(space)" class="text-blue-400 underline cursor-pointer">
            {{ space }}
          </div>
        </li>
      </ul>

      <div>
        <div>
        <input type="text" placeholder="path" v-model="newFile.trail">
        <input type="text" placeholder="filename" v-model="newFile.name">
        <input type="text" placeholder="extension" v-model="newFile.extension">
        <input type="text" placeholder="url" v-model="newFile.url">
        <button @click="addNode">Add Node</button>
        </div>

        <div>
          <input type="text" placeholder="folder name" v-model="newFolder.name">
          <input type="text" disabled placeholder="/" v-model="newFolder.trail">
          <button @click="addFolder">Add Folder</button>
        </div>

        <treeview
          @nodeFocus="gotFocus($event)"
          :nodes="flatNest"
          :config="treeConfig"
        />

        <pre>
        selectedTrail: {{ selectedTrail }}
        flatNest: 
          {{ flatNest }}
        </pre>

        <pre>
          {{ troveFolders }}
          ---
          {{ theSelectedSpace.trove }}
        </pre>
      </div>
    </div>

    <div class="flex-1">
      <div>
        <table>
          <thead>
            <th>
              Name
            </th>
            <th>
              Size
            </th>
            <th>
              Date
            </th>
            <th>
              Kind
            </th>
          </thead>
          <tbody>
            <tr v-for="f in filesInFolder">
              <td>
                <a :href="f.url" target="_blank" class="text-blue-400 underline">{{ f.dat.title }}</a>
              </td>
              <td>
                0
              </td>
              <td>
                {{ new Date(f.dat.from * 1000).toLocaleString() }}
              </td>
              <td>
                {{ f.dat.extension }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue';
import { useStore } from '@/store/store'
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';

import { addNode  as troveAddNode } from '@/api/troveAPI'
import { addFolder  as troveAddFolder } from '@/api/troveAPI'

import "vue3-treeview/dist/style.css";
import treeview from "vue3-treeview";

const store = useStore()

const selectedSpace = ref('')
const selectedTrail = ref('/')
const newFile = ref({})
const newFolder = ref({})
const flatNest = ref({})

const treeConfig = computed(() => {
  const manyRoots = new Set()
   troveFolders.value.forEach((fullPath) => {
     manyRoots.add(`/${fullPath.split('/')[1]}`)
  })
  const roots = Array.from(manyRoots).filter((fp) => fp !== "/")
  console.log('roots ', roots)
  return {
    disabled: false,
    roots,
    padding: 25,
  }
})

const troves = computed(() => store.state.troves)

onMounted(() => {
  // TODO:
  const deskname = 'trove'
  // TODO:
  startAirlock(deskname)
})

onUnmounted(() => {
  // Maybe:
  // closeAirlock()
})

const gotFocus = (node) => {
  const path = node.id
  console.log('focused path ', path)
  selectedTrail.value = node.id
}

const addNode = () => {
  troveAddNode(selectedSpace.value, newFile.value)
}
const addFolder = () => {
  troveAddFolder(selectedSpace.value, newFolder.value)
}

const selectSpace = (spat) => {
  selectedSpace.value = spat
}

const buildFlatnest = () => {
  var fn = {}
  troveFolders.value.forEach((fullPath) => {
    const children = troveFolders.value.filter((fp) => {
      return fp.startsWith(fullPath)
    }).filter((fp) => fp !== fullPath)
    fn[fullPath] = {
      text: fullPath.split('/')[fullPath.split('/').length - 1],
      children,
      state: {}
    }
  })
  return fn
}

watch(selectedSpace, (newSpat) => {
  flatNest.value = {} // TODO:
  flatNest.value = buildFlatnest()
})
watch(selectedTrail, (newTrail) => {
  newFolder.value.trail = newTrail
  newFile.value.trail = newTrail
})
watch(troves, (newTroves) => {
  flatNest.value = {} // TODO:
  flatNest.value = buildFlatnest()
})

const theSelectedSpace = computed(() => {
  if (!selectedSpace.value) {
    return {}
  }
  console.log('sel ', selectedSpace.value)
  return troves.value[selectedSpace.value]
})

const troveFolders = computed(() => {
  if (!selectedSpace.value) {
    return []
  }
  return Object.keys(theSelectedSpace.value.trove)
})

const filesInFolder = computed(() => {
  if (!selectedSpace.value) {
    return []
  }
  return theSelectedSpace.value.trove[selectedTrail.value]
})

const theFile = (troveNode) => {
  console.log('tn ', troveNode)
  const id = Object.keys(troveNode)[0]
  return troveNode[id]
}

const nest = computed(() => {
  var nes = {}
  troveFolders.value.forEach((path) => {
    path.split('/').reduce((r, e) => {
      // id: path, label: 'last name', nodes: object
      if (r[e]) {
        return r[e].nodes
      } else {
        return r[e] = {
          id: path,
          label: e,
          nodes: {}
        }
        // return r[e] = {}
      }
    }, nes)
  })
  return nes
})

const startAirlock = (deskname: string) => {
  store.dispatch(ActionTypes.AIRLOCK_OPEN, deskname)
}

const closeAirlock = () => {
  // Maybe you want this.
}
</script>


