<template>
  <div>
    <b-alert variant="success"
      :show = "showMsg"
      dismissible
      @dismissed="showMsg=false">{{ message }}</b-alert>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    showMsg: Boolean,
  },
};
</script>
