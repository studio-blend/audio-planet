import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('CMS API GET Error:', error);
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Authenticate POST requests
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== 'Bearer audioplanet1999_session_token') {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }

    const body = await request.json();
    
    // Quick validation to make sure we don't write corrupted structure
    if (!body.products || !body.blogs || !body.faqs || !body.testimonials || !body.geoPages) {
      return NextResponse.json({ error: 'Invalid database structure' }, { status: 400 });
    }
    
    await fs.writeFile(dbPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: 'Database saved successfully' });
  } catch (error) {
    console.error('CMS API POST Error:', error);
    return NextResponse.json({ error: 'Failed to write database' }, { status: 500 });
  }
}
