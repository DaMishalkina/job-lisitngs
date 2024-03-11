<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()

const emit = defineEmits(["on-tag-click"]);
</script>

<template>
  <ul>
    <li v-for="tag in tags.values()" :key="tag">
      {{tag}}
      <button @click="emit('on-tag-click', tag)">x</button>
    </li>
  </ul>

</template>