<script lang="ts">
  export let test = "1536px";
</script>

<div class="Template" style:--test={test}>
  <slot><div>no content</div></slot>
</div>

<style lang="scss">
  @use "$lib/global.scss" as *;
  .Template {
    margin: 0 auto 0;
    padding: 0 16px;
    width: 100%;
    max-width: calc(var(--Header-max-w) - 256px);
    color: var(--text);
    @include media(md) {
      margin: 16px auto;
      padding: 0 64px;
    }
  }
</style>
