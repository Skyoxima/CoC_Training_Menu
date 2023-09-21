<script lang="ts">
  import StatBox from "../StatBox.svelte";
  export let dph: string;
  export let dps: string;
  export let hp: string;
  export let trainTime: string;
  export let movementSpeed: string

  function convertToMins(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - (minutes * 60)
    return `${minutes}m ${seconds}s`
  }
  
</script>

<StatBox statTitle="DPH" statIconSrc="/src/assets/icons/stat_icons/damage.png" statValue={dph} />
<StatBox statTitle="DPS" statIconSrc="/src/assets/icons/stat_icons/damage.png" statValue={dps}/>
<StatBox statTitle="HP" statIconSrc="/src/assets/icons/stat_icons/hp.png" statValue={hp} />
<StatBox statTitle="Training Time" statIconSrc="/src/assets/icons/stopwatch.png" statValue={convertToMins(parseInt(trainTime))} fillPercentage={100} />
<StatBox statTitle="Movement Speed" statIconSrc="/src/assets/icons/stat_icons/speed.png" statValue={movementSpeed} fillPercentage={0}/>