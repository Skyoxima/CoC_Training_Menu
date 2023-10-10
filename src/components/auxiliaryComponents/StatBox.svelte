<script lang="ts">
  export let fillPercentage = 95;
  export let statIconSrc: string;
  export let statTitle: string;
  export let statValue: string;
  export let statColor = 'green';

  let addnStyle = "", addnStyle2 = "";
  if(statTitle.length > 13) {
    addnStyle = "font-size: 1.05rem;";
  }
  if(statValue.length > 10)
    addnStyle2 = "font-size: 1.05rem;";
</script>

<div class="stat {statColor}" style="--fill-width: {fillPercentage}%">
  <div class="top-filter"></div>
  <div class="stat-header">
    {#if statIconSrc !== 'no-icon'}
      <img height="24px" src={statIconSrc} alt="Stat" class="stat-icon">
    {/if}
    <h3 class="stat-title" style={addnStyle}>{statTitle}</h3>
  </div>
  <h2 class="stat-value" style={addnStyle2}>{statValue}</h2>
</div>

<style>
  .stat {
    position: relative;
    border-radius: 1rem;
    padding: 5px;
    background: rgba(var(--pure-grey-rgb));
    box-shadow: inset 0 2px 0 0 rgba(var(--pure-black-rgb), 0.2), 0 2px 0 0 rgba(var(--pure-white-rgb), 1);
  }
  .stat::before {
    content: '';
    position: absolute;
    top: 2%; left: 0;
    width: var(--fill-width); height: 98%;
    border-radius: 1rem;
  } .stat.green::before {
    background: rgba(var(--stat-dark-green-rgb));
  } .stat.blue::before {
    background: darkslategray;
  } .stat.white::before {
    background: rgba(220, 220, 200);
  }

  .stat .top-filter {
    position: absolute;
    top: 5%; left: 1%;
    width: 98%; height: 55%;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: rgba(var(--pure-white-rgb), 0.15);
  }

  .stat-header {
    position: relative;     /* without this the pseudoelement is coming on top, without this position is not found on the element... */
    display: flex;  gap: 0.5rem; justify-content: center; align-items: center;
    min-height: 55%;
    margin-bottom: 0.5rem;
  }
  
  .stat-value {
    position: relative;
    text-align: center;
  }
</style>