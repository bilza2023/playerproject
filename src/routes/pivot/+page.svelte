<script>
  import { PivotPlayer } from "taleem-pivot-player";
  import { DeckBuilder } from "deckbuilderpivot";

  let deck = null;

  let deckBuilderInput = `// Example:
deckbuilder.setTheme("royalBlue");

deckbuilder.s.titleSlide([
  { name: "title", content: "Electric Vehicles 101" }
]);`;

  let jsonInput = "";

  function loadFromBuilder() {
    try {
      const deckbuilder = new DeckBuilder();
      const func = new Function("deckbuilder", `
        ${deckBuilderInput}
        return deckbuilder.build();
      `);
      deck = func(deckbuilder);
      jsonInput = JSON.stringify(deck, null, 2);
    } catch (e) {
      alert("DeckBuilder error:\\n" + e.message);
    }
  }

  function loadFromJson() {
    try {
      deck = JSON.parse(jsonInput);
    } catch (e) {
      alert("JSON error:\\n" + e.message);
    }
  }
</script>

<style>
  /* Don’t touch player */
  .player-zone {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  /* Editor section */
  .section {
    max-width: 960px;
    margin: 2rem auto;
    padding: 2rem;
    background: #1e1e1e;
    border-top: 4px solid #444;
  }

  textarea {
    width: 100%;
    height: 220px;
    font-family: monospace;
    font-size: 0.9rem;
    background: #0d1117;
    color: #c9f5d1;
    padding: 1rem;
    border: 1px solid #333;
    border-radius: 6px;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .button-row {
    margin-bottom: 3rem;
  }

  button {
    background-color: #0057b8;
    color: white;
    padding: 0.5rem 1.25rem;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    margin-right: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #003f8a;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
    font-size: 1.25rem;
    font-style: italic;
  }
</style>

<!-- === PivotPlayer always top, full screen === -->
<div class="player-zone">
  {#if deck}
    <PivotPlayer {deck} />
  {:else}
    <div class="empty-state">No deck loaded. Paste code below and click Load.</div>
  {/if}
</div>

<!-- === Editor Section Below === -->
<div class="section">
  <h2>DeckBuilder Format</h2>
  <textarea bind:value={deckBuilderInput}></textarea>
  <div class="button-row">
    <button on:click={loadFromBuilder}>Load Builder</button>
  </div>

  <h2>JSON Format</h2>
  <textarea bind:value={jsonInput}></textarea>
  <div class="button-row">
    <button on:click={loadFromJson}>Load JSON</button>
  </div>
</div>
