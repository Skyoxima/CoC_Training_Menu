<video autoplay muted id="bg-video" on:loadeddata={() => { videoLoaded = true }}>
  <source src="/src/assets/video/Home_Base.mp4" type="video/mp4">
    <track src="" kind="captions">
</video>

{#if !videoLoaded}
  <img id="bg-img" src="/src/assets/video/Home_Base_Static.png" alt="Home Base">
{/if}

<script lang="ts">
  let videoLoaded = false;
</script>

<style>
  #bg-video {
    position: absolute;
    z-index: -1;
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.90);
  }

  #bg-img {
    position: absolute;
    z-index: -1;
    width: 100%; height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
  }
</style>
