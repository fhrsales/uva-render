<script>
    export let label = '';
    export let options = [];
    export let value = '';
    export let onChange = () => {};
  
    function handleChange(event) {
      onChange(event);
    }
  
    $: {
      const option = options.find(o => o.value === value);
      if (option) {
        option.selected = true;
      }
    }
  </script>
  
  <select on:change={handleChange}>
    <option value=''>{label}</option>
    {#each options as option}
      <option value={option} selected={option === value}>{option}</option>
    {/each}
  </select>

  <style>
        select {
        width: fit-content;
        margin-left: 1rem;
        padding: 18px 45px 18px 22px;
        color: var(--cor-texto);
        background-color: var(--cor-terciaria);
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z' fill='%23333'/%3E%3C/svg%3E%0A");
        background-size: 12px;
        background-repeat: no-repeat;
        background-position: right 20px center;
        border: none;
        border-radius: 30px; 
        font: 500 normal calc(var(--corpo-mobile) * 0.8) / 1.5 var(--condensed);
        letter-spacing: 0.03rem;
        text-transform: uppercase;
        cursor: pointer;
        outline:none;
        apperance: none;
        -webkit-appearance: none;
        -moz-appearance: none;        
    }
  </style>