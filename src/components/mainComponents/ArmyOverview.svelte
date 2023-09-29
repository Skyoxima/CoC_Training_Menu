<div id="army-overview">
  <div id="row-1" class="row">
    <div id="troops-overview" class="row-content"></div>
    <div id="spells-overview" class="row-content"></div>
    <div id="siege-overview" class="row-content"></div>
  </div>
  <div id="row-2" class="row">
    <div id="heroes-overview" class="row-content">
      <div class="hero" id="barbarian-king"></div>
      <div class="hero" id="archer-queen"></div>
      <div class="hero" id="grand-warden"></div>
      <div class="hero" id="royal-champion"></div>
    </div>
    <div id="clan-overview-container" class="row-content">
      <div id="cc-troops"></div>
      <div id="cc-spells"></div>
      <div id="cc-siege"></div>
    </div>
  </div>
  <div id="buttons-row" class="row">
    <button class="special-btn">Boost Army</button>
    <button class="special-btn">Boost Heroes</button>
    <button class="special-btn">Edit Army</button>
    <button class="special-btn">Request</button>
  </div>
</div>

<script lang="ts">

</script>

<style>
  #army-overview {
    position: relative;
    width: 100%; height: 100%;
    outline: 1px solid black;
  }

  .row {
    height: calc(40% - 0.5rem - (2 * 0.5rem)); width: 100%;
    padding: 0.5rem;
    outline: 1px solid red;
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

  .row-content {
    width: 25%;
    outline: 1px solid green;
  }
  #troops-overview {
    flex-grow: 2;
  }
  
  .special-btn {
    border: none;
    background: none;
    outline: 1px solid slateblue;
    width: 20%; height: 65%;

    border-radius: 0.5rem;
    color: white;
    font-family: 'Supercell-Magic';
    font-size: 1.25rem;
    -webkit-text-stroke-color: rgba(30, 30, 30, 0.85);
    -webkit-text-stroke-width: 2px;
    transition: scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  } .special-btn:active {
    scale: 0.9;
  }
</style>