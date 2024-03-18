<script setup lang="ts">
import {Job} from "@/types";
import JobCard from "@/components/JobCard.vue";
import {computed, onMounted, ref, watch} from "vue";
import {getTags} from "@/utils/getTags";
import TagsList from "@/components/TagsList.vue";

const ITEMS_NUMBER = 4;

const props = defineProps<{
  jobs: Job[]
}>()

const currentPage = ref<number>(1);

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
  return  modifiedJobs.value.filter((job) => {
    return [...selectedTags.value].every(selectedTag => {
      return job.tags.includes(selectedTag as string)
    })
  });

})

const endIndex = computed(() => {
  return currentPage.value * ITEMS_NUMBER;
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * ITEMS_NUMBER;
})

const hasNextPage = computed(() => {
  return filteredJobs.value.length > endIndex.value;
})

const paginatedJobs = computed(() => {
  return filteredJobs.value.slice(startIndex.value, endIndex.value);
})

const pageStateOptions = computed(() => {
  return {
    filter: [...selectedTags.value].join(","),
    page: currentPage.value
  }
})

const onSelect = (clickedTag: string) => {
  if(!selectedTags.value.has(clickedTag)){
    selectedTags.value.add(clickedTag);
  } else {
    selectedTags.value.delete(clickedTag);
  }
}

const handlePageClick = (event: Event) => {
  const buttonId = (event?.target as HTMLElement)?.id;
  if(buttonId === "prev"){
    currentPage.value =  currentPage.value - 1
  } else {
    currentPage.value = currentPage.value + 1
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

  if(windowData?.page){
    currentPage.value = Number(windowData?.page);
  }




})

watch(() => selectedTags.value.size, () => {
  currentPage.value = 1;


  // if(selectedTags.value.size > 0) {
  //   window.history.pushState(null, document.title, `${window.location.pathname}?filter=${[...selectedTags.value].join(",")}`)
  // } else {
  //   window.history.pushState(null, document.title, `${window.location.pathname}`)
  // }
})



watch(() => pageStateOptions.value, (value) => {
  const searchURL = new URL(window.location.href);
  if(value.filter.length > 0) {
    searchURL.searchParams.set("filter", value.filter);
  } else {
    searchURL.searchParams.delete("filter");
  }
  if(value.page > 0){
    searchURL.searchParams.set("page", String(value.page));
  } else {
    searchURL.searchParams.delete("page");
  }

  window.history.pushState({}, '', searchURL);
})

</script>

<template>
  <div>
    <button
        id="prev"
        @click="handlePageClick"
        v-if="currentPage > 1"
    >
      Prev
    </button>
    <button
        id="next"
        @click="handlePageClick"
        v-if="hasNextPage"
    >
      Next
    </button>
  </div>

  <section v-if="selectedTags?.size > 0">
    <tags-list :tags="[...selectedTags.values()]" @on-tag-click="onSelect" />
    <button @click="onClear()">Clear</button>
  </section>
  <section v-if="paginatedJobs?.length">
    <ul class="jobs-list">
      <job-card v-for="job in paginatedJobs" :key="job.id" :job="job" @on-tag-select="onSelect" />
    </ul>
  </section>
</template>

<style lang="scss">
.jobs-list {
  display: grid;
  gap: 36px;
}
</style>