// app/api/messages/[sessionId]/route.ts
import { storage } from '../../../../storage';

interface Params {
  sessionId: string;
}

/**
 * GET /api/messages/[sessionId]
 */
export async function GET(
  request: Request,
  { params }: { params: Params }
) {
  const { sessionId } = params;
  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: 'Missing session ID' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const messages = await storage.getMessagesBySession(sessionId);
    return new Response(
      JSON.stringify(messages),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch messages' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * DELETE /api/messages/[sessionId]
 */
export async function DELETE(
  request: Request,
  { params }: { params: Params }
) {
  const { sessionId } = params;
  if (!sessionId) {
    return new Response(
      JSON.stringify({ error: 'Missing session ID' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await storage.clearSession(sessionId);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error clearing session:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to clear session' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
