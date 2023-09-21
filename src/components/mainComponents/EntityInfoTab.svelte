<script lang="ts">
  import { showEntityInfo } from "../../svelte-stores";
  import ExitButton from "../auxiliaryComponents/FunctionalButtons/RedButtons/ExitButton.svelte";
  import StdTroopStatsGrid from "../auxiliaryComponents/StatsGrids/StdTroopStatsGrid.svelte";

</script>

<div id="information">
  <div id="top-container">
    <h2 id="entity-title" style="text-align: center;">Troop Name</h2>
    <ExitButton addnID="info-exit-btn" storeOfClosingMenu={showEntityInfo} />
  </div>  
  <div id="inner-info-container">
    <div id="entity-portrait-container">
      <img src="/src/assets/images/troops/models/Super_Archer.png" alt="Troop">
    </div>
    <div id="entity-stats-container">
      <div id="stats-grid">
        <StdTroopStatsGrid dph="198" dps="132" hp="510" trainTime="72" movementSpeed="24"/>
      </div>
    </div>
  </div>
</div>

<style>
  #information {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 65%; height: 80%;

    border: 5px solid transparent;
    background: linear-gradient(rgba(var(--pure-dark-grey-rgb)), rgba(var(--pure-dark-grey-rgb))) padding-box, 
                linear-gradient(to top, rgba(var(--pure-dark-grey-rgb)) 0% 95%, rgba(var(--off-white-rgb), 0.7) 98.5%) border-box;
    border-radius: 1rem;
    z-index: 1001;
    overflow: hidden;
  }

  #top-container {
    position: relative;
    height: 8%;
    padding: 0.5rem;
    overflow: hidden;
  }
  #top-container::before {
    content: '';
    position: absolute;
    width: 100%; height: 40%;
    top: 0; left: 0;
    background: rgba(var(--pure-grey-rgb));
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    z-index: -1;
  }

  #inner-info-container {
    position: relative;
    width: 100%; height: 92%;      /* to compensate for the in-place top translation */
    padding: 0.5rem;
    display: flex;  gap: 1rem;

    background: var(--off-white-hex);
    border-radius: 10px;
  }

  #inner-info-container #entity-portrait-container {
    position: relative;
    width: 40%; height: 100%;
    
    border-radius: 1rem;
    background: rgba(var(--off-grey-rgb), 0.5);
    box-shadow: inset 2px 2px 0 0 rgba(var(--pure-black-rgb), 0.2), inset -2px -2px 0 0 rgba(var(--pure-white-rgb), 0.5);
  }

  #inner-info-container #entity-portrait-container img {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-55%, -50%);     /* Some troops will need custom translations */
    width: 80%;
  }

  #inner-info-container #entity-stats-container {
    width: 60%; height: 100%;
    padding: 0.5rem;

    border-radius: 1rem;
    box-shadow: inset 2px 2px 0 0 rgba(var(--pure-black-rgb), 0.1), inset -2px -2px 0 0 rgba(var(--pure-white-rgb), 0.75);
  }

  #stats-grid {
    width: 100%; height: 50%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1rem;
  }
</style>