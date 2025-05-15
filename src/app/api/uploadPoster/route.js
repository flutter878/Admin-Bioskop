import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  await writeFile(filePath, buffer);

  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
}
