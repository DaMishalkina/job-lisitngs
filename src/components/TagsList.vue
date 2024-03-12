<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>()

const emit = defineEmits<{
  (e: "on-tag-click", tag: string): void
}>();

const deleteTag = (tag: string) => {
  emit("on-tag-click", tag)
}
</script>

<template>
  <ul>
    <li v-for="tag in props.tags" :key="tag">
      {{tag}}
      <button @click="deleteTag(tag)">x</button>
    </li>
  </ul>

</template>