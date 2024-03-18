<script setup lang="ts">
import {Job} from "@/types";

const props = defineProps<{
  job: Job & {tags: string[]}
}>();

const emit = defineEmits<{
  (e: "on-tag-select", tag: string): void
}>()

const selectTag = (tag: string) => {
  emit("on-tag-select", tag);
}


</script>

<template>
  <li class="card">
    <img
        class="card__image"
        :alt="props.job.company"
        :src="`/companies/${props.job.company.toLowerCase().replace(/ /g, '-')}.svg`">
    <div class="card__content">
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
            @click="selectTag(tag)"
            v-for="tag in props.job.tags">
          {{tag}}
        </button>
      </section>
    </div>
  </li>
</template>

<style lang="scss">
.card {
  display: grid;
  width: 100%;
  grid-template: 24px 24px 1fr / 24px 24px 1fr;
}
.card__image {
  width: 48px;
  height: 48px;
  grid-area: 1/2/1/2;
  z-index: 1;
}
.card__content {
  background: #fff;
  grid-column: 1/span1;
  grid-row: 2/span1;
  border-radius: 8px;
}
</style>