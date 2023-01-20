<template>
  <div>
    <ul>
      <li v-for="space in Object.keys(troves)">
        <div @click="selectSpace(space)" class="text-blue-400 underline cursor-pointer">
          {{ space }}
        </div>
      </li>
    </ul>

    <div>
      <input type="text" placeholder="filename" v-model="newFile.name">
      <input type="text" placeholder="extension" v-model="newFile.extension">
      <input type="text" placeholder="url" v-model="newFile.url">
      <button @click="addNode">Add Node</button>

      <pre>
        {{ theSelectedSpace.trove }}
      </pre>
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue';
import { useStore } from '@/store/store'
import { ActionTypes } from '@/store/action-types';
import { GetterTypes } from '@/store/getter-types';

import { addNode  as troveAddNode } from '@/api/troveAPI'

const store = useStore()

const selectedSpace = ref('')
const newFile = ref({})

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

const addNode = () => {
  troveAddNode(selectedSpace.value, newFile.value)
}

const selectSpace = (spat) => {
  selectedSpace.value = spat
}

const theSelectedSpace = computed(() => {
  if (!selectedSpace.value) {
    return {}
  }
  console.log('sel ', selectedSpace.value)
  return troves.value[selectedSpace.value]
})

const troves = computed(() => store.state.troves)
const fromGetters = computed(() => {
  return store.getters[GetterTypes.EXAMPLE_WITH_ARG]('arg here');
})

const startAirlock = (deskname: string) => {
  store.dispatch(ActionTypes.AIRLOCK_OPEN, deskname)
}

const closeAirlock = () => {
  // Maybe you want this.
}
</script>


