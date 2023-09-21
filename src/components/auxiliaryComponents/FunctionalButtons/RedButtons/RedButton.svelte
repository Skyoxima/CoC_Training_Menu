<script lang="ts">
  export let whichButton: string;
  export let addnID: string;    
  // both taken for mostly styling
</script>

<button class="red-btn {whichButton}" id={addnID} on:click>
  <slot></slot>
</button>

<style>
  .red-btn {
    --custom-red: rgb(110, 0, 28);
    position: relative;

    border: none;
    border-radius: 0.5rem;
    background: linear-gradient(to top, var(--custom-red), var(--custom-red)) padding-box,
                linear-gradient(to bottom, rgba(255, 68, 0, 0.8), rgba(218, 165, 32, 0.8)) border-box;
    transition: scale 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
  } .red-btn:active {
    scale: 0.9;
  }
  /* Can use a delete-btn class just like exit-btn but I wanted to check how :not works */
  .red-btn:not(.exit-btn) {
    width: 3.33rem; height: 3.33rem;
    border: 2px solid transparent;
    box-shadow: 5px 5px 7.5px 0 rgba(var(--pure-black-rgb), 0.5), 
                -5px -5px 7.5px 0 rgba(var(--pure-white-rgb), 1);
  }
  
  /* using has was convenient but less maintainble for 2 separate exit buttons hence using IDs */
  .red-btn.exit-btn {
    border: 1px solid rgb(159, 0, 53);
    box-shadow: 2.5px 2.5px 5px 0 rgba(0, 0, 0, 0.6), -2.5px -2.5px 5px rgba(240, 240, 240, 0.25);    
  }
  .red-btn.exit-btn#menu-exit-btn {
    position: absolute;
    width: 85%; height: 85%;
    top: -2px; left: 25%;
    
  }
  .red-btn.exit-btn#info-exit-btn {
    position: absolute;
    top: 5%; right: 1%;
    width: 4.25%; aspect-ratio: 1 / 1;
  }

  .red-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 45%;
    background: rgba(var(--pure-white-rgb), 0.2);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
</style>
