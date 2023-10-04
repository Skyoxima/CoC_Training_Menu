<audio bind:this={buttonClickBind} src="/src/assets/sound/button_click.ogg" preload="auto"></audio>
<audio bind:this={troopAndSiegeMadeBind} src="/src/assets/sound/Troop_Trained.ogg" preload="auto"></audio>
<audio bind:this={spellBrewedBind} src="/src/assets/sound/Spell_Brewed.ogg" preload="auto"></audio>
<audio bind:this={boostBind} src="/src/assets/sound/boost_activated.ogg" preload="auto"></audio>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { playButtonAudio, playNonSpellAudio, playSpellAudio, playBoostAudio } from '../../scripts/svelte-stores'
  import type { Unsubscriber } from 'svelte/store';
  
  let buttonClickBind: HTMLAudioElement;
  let troopAndSiegeMadeBind: HTMLAudioElement;
  let spellBrewedBind: HTMLAudioElement;
  let boostBind: HTMLAudioElement;
  let playButtonAudioUnsubscriber: Unsubscriber;      // cause the unsubscriber is in the onMount closure
  let playNonSpellAudioUnsubscriber: Unsubscriber;      
  let playSpellAudioUnsubscriber: Unsubscriber;      
  let playBoostAudioUnsubscriber: Unsubscriber;
  
  onMount(() => {
    buttonClickBind.volume = 0.31;
    playButtonAudioUnsubscriber = playButtonAudio.subscribe(value => {
      if(value > 0)                // to not click on this onMount
        buttonClickBind.play();
    });

    troopAndSiegeMadeBind.volume = 0.31;
    playNonSpellAudioUnsubscriber = playNonSpellAudio.subscribe(value => {
      if(value > 0)
      troopAndSiegeMadeBind.play();
  });
  
  spellBrewedBind.volume = 0.31;
  playSpellAudioUnsubscriber = playSpellAudio.subscribe(value => {
    if(value > 0)
      spellBrewedBind.play();
    });

  boostBind.volume = 0.31;
  playBoostAudioUnsubscriber = playBoostAudio.subscribe(value => {
    if(value > 0)
      boostBind.play();
    });
  })

  onDestroy(() => {
      playButtonAudioUnsubscriber();
      playNonSpellAudioUnsubscriber();
      playSpellAudioUnsubscriber();
      playBoostAudioUnsubscriber();
    }
  )
</script>