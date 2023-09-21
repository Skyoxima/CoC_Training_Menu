<script lang="ts">
  export let isDisabled = false;
</script>

<button class="green-btn" on:click disabled={isDisabled}>
  <slot></slot>
</button>

<style>
  .green-btn {
    font-family: 'Supercell-Magic', 'Poppins';
    --custom-green: rgb(0, 75, 50);

    position: relative;
    width: 10rem; height: 3.33rem;
    display: flex; justify-content: center; align-items: center;
    border: none;
    
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    text-shadow: 0 2px 3px black;
    background: linear-gradient(to top, var(--custom-green), var(--custom-green)) padding-box,
                linear-gradient(to top, chartreuse, lime) border-box;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    box-shadow: 5px 5px 7.5px 0 rgba(var(--pure-black-rgb), 0.5), -5px -5px 7.5px 0 rgba(var(--pure-white-rgb), 1);
    transition: scale 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  } .green-btn:active:not(:disabled) {
    scale: 0.9;
  }
  .green-btn::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 45%;
    background: rgba(var(--pure-white-rgb), 0.2);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .green-btn:disabled {
    filter: grayscale(100);
  }
</style>