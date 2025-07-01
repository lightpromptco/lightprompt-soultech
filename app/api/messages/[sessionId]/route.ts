import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../storage'; // adjust path if needed

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.pathname.split('/').pop();

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  try {
    const messages = await storage.getMessagesBySession(sessionId);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const sessionId = request.nextUrl.pathname.split('/').pop();

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  try {
    await storage.clearSession(sessionId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing session:', error);
    return NextResponse.json({ error: 'Failed to clear session' }, { status: 500 });
  }
}
