<template>
  <div>
  <b-badge variant="primary">Всего задач: {{finished + unfinished}}</b-badge>
  <b-badge variant="success">выполнено {{finished}},</b-badge>
  <b-badge variant="danger">не выполнено {{unfinished}} </b-badge>
  </div>
</template>

<script>
export default {
  props: {
    finished: Number,
    unfinished: Number,
  },
};
</script>
