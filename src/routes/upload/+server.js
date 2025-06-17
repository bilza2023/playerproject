import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file || typeof file.name !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid file' }), { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadDir = path.resolve('static/pivot');
  const filePath = path.join(uploadDir, file.name);

  await writeFile(filePath, buffer);

  return new Response(JSON.stringify({ url: `/pivot/${file.name}` }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
