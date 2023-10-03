<div id="upper-info-div">
  <Capacity queueState={queueState} full_capacity={entityFullCapacity} iconSource={topIconSource} />
  <TimeLeft queueState={queueState} />
</div>
<TrainingQueue queueStore={queueState} Data={Data} queueManager={queueManager} />
<div id="mid-btns-div">
  <DeleteButton queueState={queueState} queueManager={queueManager} />
  <BoostButton boostAvailable={boostAvailable} />
  <FinishButton queueState={queueState} queueManager={queueManager} />
</div>
<EntityGrid Data={Data} queueState={queueState} entityFullCapacity={entityFullCapacity} />
<Currencies />


<script lang="ts">
  import Capacity from "../auxiliaryComponents/TextComponents/Capacity.svelte";
  import TimeLeft from "../auxiliaryComponents/TextComponents/TimeLeft.svelte";
  import TrainingQueue from "./TrainingQueue.svelte";
  import DeleteButton from "../auxiliaryComponents/FunctionalButtons/RedButtons/DeleteButton.svelte";
  import BoostButton from "../auxiliaryComponents/FunctionalButtons/GreenButtons/BoostButton.svelte";
  import FinishButton from "../auxiliaryComponents/FunctionalButtons/GreenButtons/FinishButton.svelte";
  import EntityGrid from "./EntityGrid.svelte";
  import Currencies from "../auxiliaryComponents/TextComponents/Currencies.svelte";
  import { type Writable } from "svelte/store";
  import type { queueManagerType, queueStateType, siegeDataType, spellDataType, troopDataType } from "../../scripts/typeDeclarations";
  import { isSpellData, isTroopData } from "../../scripts/functions";

  export let queueState: Writable<queueStateType>;
  export let queueManager: Writable<queueManagerType>;
  export let Data: troopDataType | spellDataType | siegeDataType;
  export let entityFullCapacity:  number;
  export let boostAvailable: boolean;
  let topIconSource = `/src/assets/icons/${isTroopData(Data) ? "troop" : isSpellData(Data) ? "spell" : "siege"}_capacity.png`;
</script>

<style>
  #upper-info-div {
    height: 7.5%;
    padding: 0 0.5rem;
    display: flex; justify-content: space-between; align-items: flex-end;
  }

  #mid-btns-div {
    height: 25%;
    padding: 0.75rem 0;
    display: flex; justify-content: end; align-items: flex-end;
    gap: 1.75rem;
  }
</style>