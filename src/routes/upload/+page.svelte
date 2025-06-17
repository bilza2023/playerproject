<script>
    let file;
    let status = "";
  
    async function uploadFile() {
      if (!file) return;
      status = "Uploading...";
  
      const formData = new FormData();
      formData.append('file', file);
  
      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
  
      const result = await res.json();
      status = `✅ Uploaded to: ${result.url}`;
    }
  </script>
  
  <div class="upload-container">
    <h1>📦 Upload Image</h1>
  
    <input type="file" on:change="{e => file = e.target.files[0]}" />
    <button on:click="{uploadFile}">Upload</button>
  
    {#if status}
      <p class="status">{status}</p>
    {/if}
  </div>
  
  <style>
    .upload-container {
      max-width: 500px;
      margin: 100px auto;
      text-align: center;
      font-family: sans-serif;
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 0 12px rgba(0,0,0,0.1);
    }
  
    input[type="file"] {
      margin: 1rem 0;
    }
  
    button {
      padding: 0.6rem 1.2rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      font-size: 1rem;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  
    .status {
      margin-top: 1.5rem;
      font-weight: bold;
      color: #28a745;
    }
  </style>
  