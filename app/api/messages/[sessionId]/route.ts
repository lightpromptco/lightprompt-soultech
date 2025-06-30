import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const messages = await storage.getMessagesBySession(params.sessionId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    await storage.clearSession(params.sessionId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing session:', error)
    return NextResponse.json(
      { error: 'Failed to clear session' },
      { status: 500 }
    )
  }
}