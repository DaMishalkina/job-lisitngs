<script setup lang="ts">
import {Job} from "@/types";

const props = defineProps<{
  job: Job & {tags: string[]}
}>();

const emit = defineEmits(["on-tag-select"])


</script>

<template>
  <li>
    <img :alt="props.job.company" :src="`/companies/${props.job.company.toLowerCase().replace(/ /g, '-')}.svg`">
    <section>
      <div>
        <p><strong>{{props.job.company}}</strong></p>
        <p v-if="props.job.new">NEW</p>
        <p v-if="props.job.featured">FEATURED</p>
      </div>
      <p><strong>{{props.job.position}}</strong></p>
      <div>
        <p
            v-for="value in [props.job.postedAt, props.job.contract, props.job.location]"
            :key="value"
        >
          {{value}}
        </p>
      </div>
      <hr />
    </section>
    <section>
      <button
          @click="emit('on-tag-select', tag)"
          v-for="tag in props.job.tags">
        {{tag}}
      </button>
    </section>
  </li>
</template>