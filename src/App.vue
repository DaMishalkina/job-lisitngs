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
    <JobsList :jobs="jobs" />
</template>

<style scoped>

</style>
