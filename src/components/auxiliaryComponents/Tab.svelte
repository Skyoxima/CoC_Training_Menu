<script lang="ts">
  import { updateClickAudio } from "../../scripts/functions";
  import { activeTab } from "../../scripts/svelte-stores";

  export let tabID: string;
  export let tabClass = "tab";
  const titles: Record<string, string> = {
    'army-tab': "Army", 
    'training-tab': "Train Troops", 
    'spells-tab': "Brew Spells", 
    'siege-tab': "Build Siege Machines", 
    'quick-tab': "Quick Train"
  }
  let tabTitle_ = titles[tabID];

  function handleTabClick() {
    updateClickAudio();
    activeTab.set(tabID);
  }

</script>

<button id={tabID} class={tabClass + ` ${tabID === $activeTab ? "active": ""}`} on:click={handleTabClick}>
  <p class="tab-title">{tabTitle_}</p>
</button>


<style>
  .tab {
    border: none;
    background: none;
    position: relative;
    width: 20%; height: 90%;
    display: flex; justify-content: center; align-items: center;
    
    background: rgba(var(--pure-dark-grey-rgb));
    box-shadow: -2px 0 2px 0 rgba(var(--pure-black-rgb), 0.5), 
                2px 0 2px rgba(var(--pure-black-rgb), 0.5), 
                inset 2px 2px 2px rgba(var(--pure-white-rgb), 0.4),
                inset -2px 2px 2px rgba(var(--pure-white-rgb), 0.4);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    font-family: 'Supercell-Magic';
    color: white;
    font-size: 1.25rem;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: rgba(45, 45, 45, 0.75);
  } #siege-tab {
    font-size: 0.9rem;
  }
  .tab.active {
    background-color: var(--off-white-hex);
    color: black;
    -webkit-text-stroke-color: white;
    -webkit-text-stroke-width: 0.5px;
  } .tab::before {
    content: '';
    position: absolute;
    top: 10%; left: 50%;
    width: 95%; height: 40%;
    transform: translateX(-50%);
    border-radius: 0.25rem;
    background: rgba(var(--pure-white-rgb), 0.1);
  }.tab.active::before {
    background: rgba(var(--pure-white-rgb), 0.4);
  }

  
  @media screen and (max-width: 1220px) {
    .tab > p {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 768px) {
    .tab > p {
      font-size: 0.5rem;
    }
  }

  @media screen and (max-width: 600px) {
    .tab > p {
      font-size: 0.35rem;
    }
  }
</style>

<!--IDEA: (In OLD Version of this comp's code) you can see above how tedious it becomes manually making a div act as a button. Surprising React didn't want about accessibility but Svelte did   -->
