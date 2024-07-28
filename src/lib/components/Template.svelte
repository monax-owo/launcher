<script lang="ts">
  export let test = "1536px";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="Template" style:--test={test} on:click|stopPropagation={() => {}}>
  <slot><div>no content</div></slot>
</div>

<style lang="scss">
  // @use "$lib/global.scss" as *;
  // .Template {
  //   display: block;
  // }
</style>
