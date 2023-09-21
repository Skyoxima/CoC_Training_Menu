<script lang="ts">
  import { updateClickAudio } from "../../functions";
  import { activeTab } from "../../svelte-stores";

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

  function handleClick(e: MouseEvent & {currentTarget: EventTarget & HTMLDivElement;} | KeyboardEvent & {currentTarget: EventTarget & HTMLDivElement}): void {
    updateClickAudio();
    const siblingTabs = e.currentTarget!.parentElement!.children;
    for(let i = 0; i < 5; i++) {
      siblingTabs.item(i)!.classList.remove('active');
    }

    e.currentTarget.classList.toggle('active');
    activeTab.set(tabID);
  }

</script>
<!-- you can see above how tedious it becomes manually making a div act as a button. Surprising React didn't want about accessibility but Svelte did   -->

<div id={tabID} class={tabID !== 'training-tab' ? tabClass : `${tabClass} active`} on:click={(e) => handleClick(e)} on:keydown={(e) => {
      if(e.key === 'Enter')
        handleClick(e)
    }
  } 
  role="button" tabindex="0">     <!-- that's how to make a div accessible! WOW --> <!--~ but it is preferred that we use buttons -->
  <p class="tab-title">{tabTitle_}</p>
</div>

<style>
  .tab {
    position: relative;
    padding: 0.5rem;
    width: 20%; height: 90%;
    display: flex; justify-content: center; align-items: center;
    
    border: 2px solid var(--off-white-hex);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;

    /* font-size: 1.2rem; */
  }
  
  .tab::before {
    content: '';
    position: absolute;
    top: 0; left: 2.5%;
    width: 95%; height: 1rem;
    border-radius: 0 0 0.33rem 0.33rem;
  } 

  .tab.active {
    background-color: var(--off-white-hex);
    color: black;
  } .tab.active::before {
    background: rgba(var(--pure-white-rgb), 0.5);
  }

  /* try inverted border radii at the bottom for the active one (chrome-like) */

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