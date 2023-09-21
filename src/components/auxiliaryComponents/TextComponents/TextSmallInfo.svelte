<script lang="ts">
  export let displayText: string;
  export let addnClass = "";
  export let iconSource: string;

  // gems still uses this formatting
  function formatCurrency() {
    let separated: string[] = []
    let happenedOnce = false
    if(displayText.length > 3) {
      for(let j = displayText.length, i = j - 3; i >= 0; j -= 3) {
        separated.unshift(displayText.slice(i, j));
        if(i !== 0)
          i -= 3;
        else      // noofdigits % 3 = 0, don't reduce it to < 0 and make it follow the next condition, leading to an extra term
          break;
        if(i < 0 && !happenedOnce) {
          happenedOnce = !happenedOnce;
          i = 0;
        }
      }
    return separated.join(" ")
    }
  }
</script>

<div class={"text-small-info" + ` ${addnClass}`} style="--iconSrc: url({iconSource})">
  <p>{addnClass === 'currency' ? formatCurrency() : displayText}</p>
</div>

<style>

  .text-small-info {
    position: relative;
    min-width: 8rem;
    margin: 0.5rem;
    padding: 0.25rem 0.5rem;    
    background: grey;
    border-radius: 0.25rem;
    text-align: right;
  }

  .text-small-info.currency {
    min-height: 1.5rem;
  }

  .text-small-info.currency > p {
    position: absolute;
    top: 50%; right: 5%;
    transform: translateY(-50%);
  }
  
  .text-small-info::before {
    content: '';
    position: absolute;
    display: block;
    top: 50%; left: 0%;
    transform: translate(-50%, -50%);
    width: 32px; height: 32px;

    background-image: var(--iconSrc);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }

</style>
