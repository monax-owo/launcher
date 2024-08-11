<script lang="ts">
  import { draggable } from "$lib/components/drag/drag";
</script>

<!-- TODO:サイズ変更等 -->
<div class="Widget">
  <div class="drag" role="button" tabindex="0" use:draggable>
    <slot></slot>
  </div>
</div>

<style lang="scss">
  .Widget {
    position: relative;
    width: 0;
    height: 0;
  }
  .drag {
    position: absolute;
    top: 0;
    left: 0;
    cursor: grab;
    background-color: var(--bg);
    padding: 1rem;
    color: var(--text);
  }
</style>
