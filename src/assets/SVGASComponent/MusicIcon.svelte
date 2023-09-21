<script lang="ts">
  export let audioIconToggler: boolean;
</script>


<svg
  xmlns="http://www.w3.org/2000/svg"
  width="2.5rem"
  height="2.5rem"
  class={audioIconToggler ? "animated" : ""}
  viewBox="0 0 24 24"
  ><circle cx="10" cy="17" r="2" fill="white" opacity={audioIconToggler ? "1" : ".3"} />
  <path
    fill={audioIconToggler ? "rgb(238, 114, 114)" : "white"}
    d="M10 21c2.21 0 4-1.79 4-4V7h4V3h-6v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2z"
  /></svg
>

<style>
  @keyframes pulse {
    from {
      scale: 1;
    } to {
      scale: 1.15;
    }
  }

  svg.animated {
    animation: pulse 0.5s cubic-bezier(0.19, 1, 0.22, 1) infinite alternate;
  }

  @media (prefers-reduced-motion) {
    svg.animated {
      animation: pulse 2s cubic-bezier(0.19, 1, 0.22, 1) infinite alternate;
    }
  }
</style>