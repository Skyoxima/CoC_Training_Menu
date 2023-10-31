<script lang="ts">
  export let entityType: string;
  export let entityImgSrc: string;
  export let entityCount: number;
  export let entityLvl = 1;
  const bgSrcs: Record<string, string> = {'spell': '/src/assets/icons/army_tab_spell.png', 'troop': '/src/assets/icons/army_tab_troop.png', 'siege': '/src/assets/icons/army_tab_troop.png', 'super-troop': '/src/assets/icons/army_tab_super_troop.png'}
</script>
  
{#if entityType === 'hero'}
  <div class="a-card">
    <img class="card-bg" src="/src/assets/icons/army_tab_hero.png" alt="">
    <img class="entity-face hero" src={entityImgSrc} alt="" />
    <p class="entity-lvl">{entityLvl}</p>
  </div>
{:else}
  <div class="a-card {entityType}">
    <p class="entity-count">x{entityCount}</p>
    <img class="card-bg" src={bgSrcs[entityType]} alt="">
    <img class="entity-face {entityType}" src={entityImgSrc} alt="" />
    {#if entityType === 'super-troop'} <div class="gold-frame"></div> {/if}
    <p class="entity-lvl">{entityLvl}</p>
  </div>
{/if}

<style>
  .a-card {
    position: relative;
    height: 100%;
  }
  
  .a-card .card-bg {
    height: 100%;
  }

  .a-card.super-troop .gold-frame {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: 0.7rem;
    box-shadow: inset 0 -4px 0px 0 var(--gold-dark-alternate),
                inset 0 2px 0 0 var(--gold-dark-alternate),
                inset 2px 0 0 var(--gold-dark-alternate),
                inset -2px -0 0 var(--gold-dark-alternate);
  }

  .a-card .entity-face {
    position: absolute;
    bottom: 2.5%; left: 50%;
    translate: -50% 0;
    width: 95%;
  } .entity-face.hero{
    height: 100%;
  } .entity-face.troop, .entity-face.siege, .entity-face.spell {
    height: 75%;
    border-radius: 0 0 1rem 1rem;
  }

  .a-card .entity-count {
    position: absolute;
    left: 50%; top: 5%;
    translate: -50% 0;
    font-size: 1.25rem;
  }

  .a-card .entity-lvl {
    position: absolute;
    bottom: 4%; left: 5%;
    padding: 0.2rem;
    background: rgba(30, 30, 30);
    font-size: 0.8rem;
    text-align: center;
    border: 2px solid grey;
    border-radius: 0.25rem;
  }
</style>