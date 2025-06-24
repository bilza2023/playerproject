
<svelte:head>
  <title>Taleem.help Editor</title>
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-green-700 px-6 py-12">
  <h1 class="text-4xl font-bold text-gray-800 mb-12">Taleem.help Editor</h1>

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl text-center">
    <a href="/editor" class="block bg-white border border-gray-200 shadow-md rounded-2xl p-8 hover:shadow-xl transition">
      <div class="text-5xl mb-4">📝</div>
      <div class="text-xl font-semibold text-gray-700">Editor</div>
    </a>

    <a href="/upload" class="block bg-white border border-gray-200 shadow-md rounded-2xl p-8 hover:shadow-xl transition">
      <div class="text-5xl mb-4">📤</div>
      <div class="text-xl font-semibold text-gray-700">Upload</div>
    </a>

    <a href="/paste" class="block bg-white border border-gray-200 shadow-md rounded-2xl p-8 hover:shadow-xl transition">
      <div class="text-5xl mb-4">📋</div>
      <div class="text-xl font-semibold text-gray-700">Paste</div>
    </a>
  </div>
</div>
