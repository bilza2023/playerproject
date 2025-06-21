import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
  const data = await request.formData();
  const file = data.get('file');
  const name = data.get('name') ?? '';
  const tcode = data.get('tcode') ?? '';
  const usage = data.get('usage') ?? '';
  const tagsRaw = data.get('tags') ?? '';
  const description = data.get('description') ?? '';
  const linkedQuestion = data.get('linkedQuestion') ?? '';

  if (!file || typeof file.name !== 'string') {
    return new Response(
      JSON.stringify({ error: 'Invalid file or missing required fields' }),
      { status: 400 }
    );
  }

  // 1. Save the image to static/pivot
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadDir = path.resolve('static/pivot');
  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  // 2. Prepare metadata entry
  const tags = tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean);
  const id = path.basename(file.name, path.extname(file.name));
  const entry = {
    id,
    name,
    tcode,
    usage,
    tags,
    description,
    linkedQuestion,
    path: `/pivot/${file.name}`
  };

  // 3. Ensure registry directory exists
  const registryDir = path.resolve('static/registry');
  await mkdir(registryDir, { recursive: true });

  // 4. Read existing registry or start fresh
  const registryPath = path.join(registryDir, 'images.json');
  let registry = [];
  try {
    const json = await readFile(registryPath, 'utf8');
    registry = JSON.parse(json);
  } catch {
    registry = [];
  }

  // 5. Append new entry and save
  registry.push(entry);
  await writeFile(registryPath, JSON.stringify(registry, null, 2));

  // 6. Respond with file URL and metadata entry
  return new Response(
    JSON.stringify({ url: `/pivot/${file.name}`, entry }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
