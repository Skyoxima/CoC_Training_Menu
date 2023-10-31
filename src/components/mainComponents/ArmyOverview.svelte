<div id="army-overview">
  <div id="row-1" class="row">
    <div id="troops-overview" class="wrapper">
      <div  class="row-content"></div>
      <p class="section-title">Troops</p>
    </div>

    <div id="spells-overview" class="wrapper">
      <div  class="row-content"></div>
      <p class="section-title">Spells</p>
    </div>

    <div id="siege-overview" class="wrapper">
      <div class="row-content"></div>
      <p class="section-title">Sieges</p>
    </div>

  </div>
  <div id="row-2" class="row">
    <div id="heroes-overview" class="wrapper">
      <div class="row-content">
        <ArmyCard entityType='hero' entityCount={0} entityImgSrc='/src/assets/images/heros/icons/Barbarian_King.png'  entityLvl={90}/>
        <ArmyCard entityType='hero' entityCount={0} entityImgSrc='/src/assets/images/heros/icons/Archer_Queen.png' entityLvl={90}/>
        <ArmyCard entityType='hero' entityCount={0} entityImgSrc='/src/assets/images/heros/icons/Grand_Warden.png' entityLvl={50}/>
        <ArmyCard entityType='hero' entityCount={0} entityImgSrc='/src/assets/images/heros/icons/Royal_Champion.png' entityLvl={30}/>
      </div>
      <p class="section-title">Heroes</p>
    </div>
    <div id="cc-overview" class="wrapper">
      <div class="row-content">
        <ArmyCard entityType='super-troop' entityCount={4} entityImgSrc='/src/assets/images/troops/icons/super_archer.png' entityLvl={11}/>
        <ArmyCard entityType='troop' entityCount={1} entityImgSrc='/src/assets/images/troops/icons/wall_breaker.png' entityLvl={11}/>
        <ArmyCard entityType='spell' entityCount={1} entityImgSrc='/src/assets/images/troops/icons/clone_spell.png' entityLvl={8}/>
        <ArmyCard entityType='siege' entityCount={1} entityImgSrc='/src/assets/images/troops/icons/battle_blimp.png' entityLvl={4}/>
      </div>
      <p class="section-title">CC Reinforcements <span>[ T: 50/50,  S: 3/3,  Si: 1/1 ]</span></p>
    </div>
  </div>
  <div id="buttons-row" class="row">
    <button class="special-btn">Boost Army<img src="/src/assets/images/potions/army_boost.png" alt="Army Boost" /></button>
    <button class="special-btn">Boost Heroes<img src="/src/assets/images/potions/hero_boost.png" alt="Hero Boost" /></button>
    <button class="special-btn">Edit Army <img src="/src/assets/icons/edit.png" alt="Edit" /></button>
    <button class="special-btn">Request <img src="/src/assets/icons/troop_capacity.png" alt="Request" /></button>
  </div>
</div>

<script lang="ts">
  import ArmyCard from "../auxiliaryComponents/ArmyCard.svelte";
</script>

<style>
  #army-overview {
    position: relative;
    width: 100%; height: 100%;
    /* outline: 1px solid black; */
  }

  .row {
    height: calc(40% - 0.5rem - (2 * 0.5rem)); width: 100%;
    padding: 0.5rem;
    /* outline: 1px solid red; */
    margin-bottom: 2rem;
    display: flex; gap: 1rem;
  } 
  #buttons-row {
    position: absolute;
    bottom: 0; 
    height: 15%;
    margin-bottom: 0;
    justify-content: center; align-items: center; gap: 2rem;
  }

  .wrapper {
    position: relative;
    width: 25%;
  }
  #troops-overview {
    flex-grow: 2;
  }
  #heroes-overview {
    width: 45%;
  }
  #cc-overview {
    width: 55%;
  }

  .row-content {
    position: relative;
    width: 100%; height: 100%;
    padding: .2rem;
    /* outline: 1px solid green; */
    background: var(--off-grey-hex);
    box-shadow: inset -1px -1px 0px white, inset 1px 1px 0px rgba(var(--pure-black-rgb), .3);
    border-radius: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
    overflow-x: scroll;
  } .row-content::-webkit-scrollbar {
    display: none;
  }

  .wrapper .section-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
    white-space: nowrap;
  }
  .wrapper .section-title span {
    color: chartreuse;
  }
  
  .special-btn {
    border: none;
    position: relative;
    background: slateblue;
    width: 20%; height: 65%;

    border-radius: 0.5rem;
    box-shadow: 0 2px 5px 0 black, 0 -1px 0px grey;
    color: white;
    font-family: 'Supercell-Magic';
    font-size: 1.25rem;
    -webkit-text-stroke-color: rgba(30, 30, 30, 0.85);
    -webkit-text-stroke-width: 2px;
    transition: scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  } .special-btn:active {
    scale: 0.9;
  }
  .special-btn::before {
    content: '';
    position: absolute;
    top: 5%; left: 50%;
    transform: translateX(-50%);
    background: rgba(var(--pure-white-rgb), .15);
    width: 95%; height: 50%;
    border-radius: 4px;
  }

  .special-btn img {
    width: 20px; aspect-ratio: 1 / 1.25;
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%);
    margin-left: 5px;
  }
</style>