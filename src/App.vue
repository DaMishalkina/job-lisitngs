<script setup lang="ts">
import {onMounted, ref} from "vue";
import JobsList from "@/components/JobsList.vue";
import {Job} from "@/types";
import {getJobs} from "@/api";


const jobs = ref([] as Job[]);







 onMounted(() => {
   getJobs().then(jobsData => {
     if(jobsData){
       jobs.value = jobsData;
     }
   })

 })


</script>

<template>
  <main class="main">
    <jobs-list :jobs="jobs" />
  </main>

</template>

<style lang="scss">
@import "assets/global.scss";
.main {
  background: $bg;
}

</style>
