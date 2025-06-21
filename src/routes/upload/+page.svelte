<script>
  let file = null;
  let name = '';
  let tcode = '';
  let usage = '';
  let tags = '';
  let description = '';
  let linkedQuestion = '';
  let uploadUrl = '';
  let status = '';

  async function handleUpload() {
    if (!file) {
      status = '❌ Please select a file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('tcode', tcode);
    formData.append('usage', usage);
    formData.append('tags', tags);
    formData.append('description', description);
    formData.append('linkedQuestion', linkedQuestion);

    const response = await fetch('/', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.url) {
      uploadUrl = result.url;
      status = `✅ Uploaded to ${result.url}`;
    } else {
      status = `❌ ${result.error}`;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900">
  <div class="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg text-white space-y-6">
    <h2 class="text-3xl font-bold text-center">Upload Teaching Image</h2>
    <p class="text-sm text-gray-400 text-center">
      Please upload an educational image (diagram, background, illustration). Provide metadata to help organize and reuse across lessons.
    </p>

    <div class="flex justify-center">
      <input
        type="file"
        on:change="{e => file = e.target.files[0]}"
        class="text-white file:bg-gray-700 file:border file:border-gray-600 file:rounded file:px-4 file:py-2 file:text-sm file:font-semibold"
      />
    </div>

    <div class="grid grid-cols-1 gap-4">
      <input
        type="text"
        placeholder="Name (e.g. Scope Diagram)"
        bind:value="{name}"
        class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Tcode (e.g. fbise9physics)"
        bind:value="{tcode}"
        class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Usage (e.g. diagram, background)"
        bind:value="{usage}"
        class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        bind:value="{tags}"
        class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        bind:value="{description}"
        class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Linked Question (optional)"
        bind:value="{linkedQuestion}"
        class="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white placeholder-gray-400"
      />
    </div>

    <button
      on:click="{handleUpload}"
      class="w-full bg-blue-600 hover:bg-blue-500 rounded p-3 font-semibold"
    >
      Upload
    </button>

    {#if status}
      <p class="text-center text-sm">{status}</p>
    {/if}

    {#if uploadUrl}
      <div class="flex justify-center">
        <img src="{uploadUrl}" alt="Uploaded Image" class="max-w-full rounded border border-gray-600" />
      </div>
    {/if}
  </div>
</div>
