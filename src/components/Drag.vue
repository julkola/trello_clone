<script setup lang="ts">
    const props = defineProps(['dragData']);
    function setDragData (e: DragEvent, data: [string, string][] ) {
        data.forEach(dataEntry => {
            e.dataTransfer!.setData(dataEntry[0], dataEntry[1])
        });
    }
</script>
<template>
    <div @dragstart.self="(e)=>setDragData(e, props.dragData)" draggable="true">
        <slot/>
    </div>
</template>