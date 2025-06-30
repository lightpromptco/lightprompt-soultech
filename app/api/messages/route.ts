import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../storage'
import { z } from 'zod'

const messageSchema = z.object({
  content: z.string().min(1).max(500),
  sessionId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, sessionId } = messageSchema.parse(body)

    // Save user message
    const userMessage = await storage.createMessage({
      content,
      isBot: false,
      sessionId,
    })

    // Generate AI response
    const messages = await storage.getMessagesBySession(sessionId)
    const { generateEmotionalResponse } = await import('../openai')
    const aiResponse = await generateEmotionalResponse(
      content,
      messages,
      undefined,
      'empathetic_support'
    )

    // Save AI response
    const botMessage = await storage.createMessage({
      content: aiResponse,
      isBot: true,
      sessionId,
    })

    return NextResponse.json([userMessage, botMessage])
  } catch (error) {
    console.error('Error processing message:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}