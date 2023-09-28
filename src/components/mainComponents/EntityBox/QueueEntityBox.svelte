<div class="entity-box-wrapper queue-entity-box-wrapper">
  <div id="{entityID}-q" class={`entity-box queue-entity-box ${entityType}`} data-count={`${count}x`}> <!--slightly different ID is for styling purposes only -->
    <img src={iconSource} alt={entityID}>
    <div class="training-progress">
      <span class="progress-made"></span>
      <p class="time-left">42s</p>
    </div>
  </div>
  <button class="unqueue-troop top-right-btn" on:click></button>      <!-- It is red but not a RedButton -->
</div>

<script lang="ts">
  import './EntityBox.css';
  export let entityID: string;    // not used, but good to have
  export let entityType: string;  // used for applying type-specific styles to queueEntityboxes
  export let iconSource: string;
  export let count: number;
  
</script>

<style>
  /* 2 classes to have it be more specific */ 
  .entity-box-wrapper.queue-entity-box-wrapper {
    width: auto;
    height: 85%; aspect-ratio: 1 / 1;
  }
  
  .queue-entity-box {
    width: 100%; height: 100%;
    display: flex; justify-content: center; align-items: center;
    overflow: hidden;
  }

  .queue-entity-box.siege-machine img {
    width: 85%; height: auto;
  }

  .queue-entity-box::before {
    content: attr(data-count);
    position: absolute;
    top: 7.5%; left: 2px;
    margin-top: -3px;

    font-size: 1rem;
    text-shadow: 0 2px 2px black;
    -webkit-text-stroke-width: 0;
  }

  .entity-box-wrapper .unqueue-troop {
    --red-shade-1-rgb: rgb(135, 2, 0);
    all: unset;
    position: absolute;
    top: 0.15rem; right: 0.15rem;
    width: 1rem; height: 1rem;

    background: linear-gradient(
        to top,
        var(--red-shade-1-rgb), 
        var(--red-shade-1-rgb)
      ) padding-box, 
      linear-gradient(
        to bottom, 
        tomato, 
        rgb(56, 0, 0)
      ) border-box;
    
    border: 2px solid transparent;
    border-radius: 0.25rem;
    box-shadow: 0 0 0px 1px tomato;
    color: white;
  }

  .unqueue-troop:active {
    scale: 0.9;
  }

  .entity-box-wrapper .unqueue-troop::before {
    content: '-';
    -webkit-text-stroke-width: 0;
  }

  .training-progress {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 20%;
    background: rgba(0, 0, 0, 0.3);
  }

  .training-progress .time-left {
    position: absolute;
    top: 20%; left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    text-shadow: 0 0.5px 2px rgba(var(--pure-black-rgb), 0.9);
  }

  .progress-made {
    position: absolute;
    top: 0; left: 0;
    width: 80%; height: 100%;
    background: rgb(70, 190, 0);
  }
</style>