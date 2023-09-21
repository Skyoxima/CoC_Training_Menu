<script lang="ts">
  import MusicIcon from '../../../assets/SVGASComponent/MusicIcon.svelte';
  import { infoPopUp } from '../../../svelte-stores';
  let musicPlayStatus = false;
  let audioBind: HTMLAudioElement;
  let currentMusic: string;
  const highlightStyle = "font-weight: bold;"
  let timeout: number;

  function setMusic() {
    if(timeout) clearInterval(timeout);
    musicPlayStatus = !musicPlayStatus;
    
    if(musicPlayStatus) {
      audioBind.play();   // imperative way, declarative way of using stores could not be used
      
      infoPopUp.update(state => {
        state.infoPopUpClass = "active";
        state.infoTxt = `Now playing: <i style="${highlightStyle}">${currentMusic}</i>`;      // a bit hacky, but trying out the @html directive in the popup component
        state.infoPopUpWidth = "medium";
        return state;
      })

      // should cancel the timeout if button is clicked within time limit to have a consistent 3 secs delay
      timeout = setTimeout(() => {
        infoPopUp.update(state => {
          state.infoPopUpClass = "inactive";
          return state;
        });
      }, 3000);
    } else {
      if($infoPopUp.infoPopUpClass == 'active') {
        infoPopUp.update(state => {
          state.infoPopUpClass = "inactive";
          return state;
        });
      }
      audioBind.pause();
    }
  }

  function setPopUpText(e: Event & { currentTarget: HTMLAudioElement }) {
    const currentAddress = e.currentTarget.currentSrc.split('/');
    const currentMusicExtn = currentAddress[currentAddress.length - 1];
    currentMusic = currentMusicExtn.slice(0, -4);
  }
  
</script>

<div id="ambient-music">
  <button id="audio-switch" on:click={() => setMusic()}>
    <MusicIcon audioIconToggler={musicPlayStatus} />
  </button>
  <audio bind:this={audioBind} on:loadedmetadata={setPopUpText}>
    <source src="/src/assets/sound/Ambience_1.ogg" type="audio/ogg">
    <source src="/src/assets/sound/Ambience_2.ogg" type="audio/ogg">
    <source src="/src/assets/sound/Ambience_3.ogg" type="audio/ogg">
  </audio>
</div>

<style>
  #ambient-music {
    position: absolute;
    top: 2%; right: 1%;
    width: 3rem;
    aspect-ratio: 1 / 1;
    display: flex; justify-content: center; align-items: center;
    
    background: rgba(24, 24, 24, 0.95);
    border-radius: 50%;
  }

  #audio-switch {
    background: transparent;
    border: none;
    width: 80%; aspect-ratio: 1 / 1;
    display: flex; justify-content: center; align-items: center;
    border-radius: 50%;
    transition: scale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  #audio-switch:active {
    scale: 0.9;
  }

</style>