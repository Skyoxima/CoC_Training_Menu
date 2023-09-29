<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { queueStateType } from "../../../scripts/typeDeclarations";
  import TextSmallInfo from "./TextSmallInfo.svelte";
  export let iconSource: string, 
            queueState: Writable<queueStateType>,
            full_capacity: number;

</script>


<div id="capacity">
  <TextSmallInfo displayText={`${$queueState.currentCapacity}/${full_capacity}`} iconSource={iconSource}/>
</div>