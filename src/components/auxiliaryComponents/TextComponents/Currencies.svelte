<script lang="ts">
  import { currencies } from "../../../scripts/svelte-stores";
  import TextSmallInfo from "./TextSmallInfo.svelte";
</script>

<!-->> l-currency -> Long Currency [DEPRECATED, but may be revisited in the future for handling magic items?]-->

<div id="currencies">
  <TextSmallInfo displayText={`${$currencies.gems}`} iconSource="/src/assets/icons/gem.png"  addnClass="currency"/>
</div>

<style>
  #currencies {
    margin: 0.6rem 0;
    display: flex; justify-content: flex-end; align-items: center; gap: 2rem;
  }
</style>

