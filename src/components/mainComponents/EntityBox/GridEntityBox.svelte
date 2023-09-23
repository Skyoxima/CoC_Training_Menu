<div class="entity-box-wrapper">
  <button id={entityID} class={`menu-entity-box entity-btn ${entityData.type}`} disabled={isDisabled} on:click>     <!-- on:click handler is coming from the parent, neat imo, don't need to pass down the handler function  -->
    <img src={entityData.iconSource} alt={entityID}>
    <div class="bottom-overlay" data-current-entity-level={entityData.maxLevel} style="--iconSrc: url({bottomOverlayIconSrc})">
      <span>{entityData.housingSpace}</span>
    </div>
  </button>
  <button class="info-btn top-right-btn" on:click={handleInfoBtnClick}></button>
</div>

<script lang="ts">
  import type { spellDataSubType, troopDataSubType } from '../../../../typeDeclarations';
  import { updateClickAudio } from '../../../functions';
  import { showEntityInfo } from '../../../svelte-stores';
  import './EntityBox.css';                                 // EntityBox because it will apply for an entity at both places, Grid and Queue

  export let entityID: string;
  export let entityData: troopDataSubType | spellDataSubType;     // neat feature, enables intellisense on the "sub-type"
  export let isDisabled = false;
  let bottomOverlayIconSrc = "/src/assets/icons";

  if(['elixir-troop', 'dark-elixir-troop', 'super-elixir-troop', 'super-dark-elixir-troop'].includes(entityData.type))
    bottomOverlayIconSrc += "/troop_capacity.png";
  else if(entityData.type === 'siege-machine')
    bottomOverlayIconSrc += "/siege_capacity.png";
  else
    bottomOverlayIconSrc += "/spell_capacity.png";

  function handleInfoBtnClick() {
    updateClickAudio();
    showEntityInfo.set(true);
  }

</script>

<style>
  .menu-entity-box {
    width: 100%; height: 100%;
    box-shadow: 2.5px 2.5px 5px 0 rgba(var(--pure-black-rgb), 0.5), 
                -2.5px -2.5px 5px 0 rgba(var(--pure-white-rgb), 0.8), 
                inset 5px 5px 10px 0 rgba(var(--pure-white-rgb), 0.2),
                inset -2px -2px 5px 0 rgba(var(--pure-white-rgb), 0.1);
    transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    user-select: none;
  }
  .menu-entity-box:active:not(:disabled) {
    scale: 0.95;
    box-shadow: inset 5px 5px 10px 0 rgba(var(--pure-black-rgb), 0.4),
                inset -2px -2px 5px 0 rgba(var(--pure-black-rgb), 0.2);
  }

  .menu-entity-box:disabled {
    filter: grayscale(1) brightness(0.75);
  }

  .entity-box-wrapper .info-btn {
    --blue-shade-1-rgb: rgb(67, 128, 226);
    position: absolute;
    top: 6%; right: 5%;
    width: 1.2rem; height: 1.2rem;
    
    background: 
    linear-gradient(
        to top,
        var(--blue-shade-1-rgb), 
        var(--blue-shade-1-rgb)
      ) padding-box, 
      linear-gradient(
        to bottom, 
        skyblue, 
        rgb(13, 0, 56)
      ) border-box;

    border: 2px solid transparent;
    border-radius: 0.25rem;
    box-shadow: 0 0 0px 1px skyblue;
    
    color: white;
    font-weight: bold;
    transition: scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);   
  } .entity-box-wrapper .info-btn:active {
    scale: 0.5;
  }
  .entity-box-wrapper .info-btn::before {
    content: 'i';
    font-family: 'Supercell-Magic';
    -webkit-text-stroke-width: 0.25px;
  }

  .menu-entity-box .bottom-overlay {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 1.2rem;
    background: rgba(var(--pure-black-rgb), 0.3);
    
    color: white;
    font-family: 'Supercell-Magic', 'Poppins';
  }

  .menu-entity-box .bottom-overlay::before {
    position: absolute;
    content: attr(data-current-entity-level);
    top: -1.1rem; left: 2px;
    width: 1.1rem;

    border-radius: 0.2rem;
    border: 1px solid rgba(var(--pure-white-rgb), 0.5);
    background: rgba(var(--troop-level-rgb));
    
    font-family: 'Supercell-Magic', 'Poppins';
    font-size: 0.85rem;
    color: white;
    text-align: center;
  }

  .menu-entity-box .bottom-overlay::after {
    content: '';
    position: absolute;
    bottom: 1%; right: 1%;
    width: 1.2rem; aspect-ratio: 1 / 1.2;
    background-image: var(--iconSrc);
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  .menu-entity-box .bottom-overlay span {
    position: absolute;
    top: 0; left: 0;
    top: 10%; left: 50%;
    transform: translateX(-50%);
    font-size: 1.05rem;
    -webkit-text-stroke-width: 1px;
  }
</style>

<!-->> NOTE: Never put an interactive element, such as input, anchor, buttons etc. inside an interactive element, goes against HTML5 standard and caused the event bubbling problem -->