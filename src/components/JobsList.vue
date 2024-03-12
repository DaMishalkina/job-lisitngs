<script setup lang="ts">
import {Job} from "@/types";
import JobCard from "@/components/JobCard.vue";
import {computed, onMounted, ref, watch} from "vue";
import {getTags} from "@/utils/getTags";
import TagsList from "@/components/TagsList.vue";


const props = defineProps<{
  jobs: Job[]
}>()

const modifiedJobs = computed(() => {
  return props.jobs.map((job) => {
    const {id, company, logo, position, new: isNew, featured, postedAt, contract, location,  ...rest} = job;
    return {
      ...job,
      tags: getTags(rest)
    }
  })
})
const selectedTags = ref(new Set<string>());
const filteredJobs =  computed(() => {
  if(selectedTags.value.size === 0){
    return modifiedJobs.value;
  }
  return modifiedJobs.value.filter((job) => {
    return [...selectedTags.value].every(selectedTag => {
      return job.tags.includes(selectedTag as string)
    })
  });
})

const onSelect = (clickedTag: string) => {
  if(!selectedTags.value.has(clickedTag)){
    selectedTags.value.add(clickedTag);
  } else {
    selectedTags.value.delete(clickedTag);
  }
}

const onClear = () => {
  selectedTags.value.clear();
}

onMounted(() => {
  const windowData = Object.fromEntries(new URLSearchParams(window.location.search));
  windowData?.filter?.split(",").map((filter) => {
    selectedTags.value.add(filter)
  })

})

watch(() => selectedTags.value.size, () => {
  if(selectedTags.value.size > 0) {
    window.history.pushState(null, document.title, `${window.location.pathname}?filter=${[...selectedTags.value].join(",")}`)
  } else {
    window.history.pushState(null, document.title, `${window.location.pathname}`)
  }
})
</script>

<template>
  <section v-if="selectedTags?.size > 0">
    <tags-list :tags="[...selectedTags.values()]" @on-tag-click="onSelect" />
    <button @click="onClear()">Clear</button>
  </section>
  <section v-if="filteredJobs?.length">
    <ul>
      <job-card v-for="job in filteredJobs" :key="job.id" :job="job" @on-tag-select="onSelect" />
    </ul>
  </section>

</template>