<script lang="ts">
  import { showMenu } from "../../svelte-stores";
  import Tab from "../auxiliaryComponents/Tab.svelte";
  import ExitButton from "../auxiliaryComponents/FunctionalButtons/RedButtons/ExitButton.svelte";
</script>

<div id="toolbar">
  <Tab tabID="army-tab" />
  <Tab tabID="training-tab" />
  <Tab tabID="spells-tab" />
  <Tab tabID="siege-tab" />
  <Tab tabID="quick-tab" />
  <div class="psn-wrapper">
    <ExitButton addnID="menu-exit-btn" storeOfClosingMenu={showMenu} />
  </div>
</div>

<style>
  #toolbar {
    position: relative;
    height: 10%;
    padding: 0 1rem;

    display: flex; align-items: flex-end; gap: 1rem;
  }

  #toolbar::before {
    content: '';
    position: absolute;
    width: 100%; height: 40%;
    top: 0; left: 0;
    background: rgba(var(--pure-grey-rgb));
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  #toolbar .psn-wrapper {
    position: relative;
    height: 90%;
    aspect-ratio: 1 / 1;
  }
</style>