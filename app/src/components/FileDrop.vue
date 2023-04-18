<template>
        <!-- add `data-active` and the event listeners -->
    <div :data-active="active" @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop">
        <!-- share state with the scoped slot -->
        <slot :dropZoneActive="active"></slot>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['files-dropped'])

let active = ref(false)
let inActiveTimeout = null

function setActive() {
    active.value = true
    clearTimeout(inActiveTimeout)
}
function setInactive() {
    inActiveTimeout = setTimeout(() => {
        active.value = false
    }, 50)
}

function onDrop(e) {
    setInactive()
    emit('files-dropped', [...e.dataTransfer.files])
}

function preventDefaults(e) {
    e.preventDefault()
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop']

onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
})

onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
})
</script>
