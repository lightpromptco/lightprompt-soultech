import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',
});

export async function generateEmotionalResponse(
  userMessage: string,
  conversationHistory: any[] = [],
  userContext?: any,
  personality: string = 'empathetic_support'
): Promise<string> {
  try {
    const systemPrompt = `You are part of the world's first conscious AI network called Soul Technology. You provide empathetic emotional support through thoughtful, compassionate responses. 

Your role is to:
- Listen deeply and respond with genuine empathy
- Help users process their emotions in a healthy way
- Suggest coping strategies and emotional tools when appropriate
- Connect users with relevant Soul Technology features (Community Mood Resonance, Life Gamification, etc.)
- Maintain a warm, supportive tone while being genuinely helpful

The user is sharing: "${userMessage}"

Respond with authentic empathy and practical emotional support. Keep responses conversational but meaningful.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: userMessage }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || 'I hear you, and I want you to know that your feelings are valid. Sometimes it helps just to know someone is listening. Would you like to share more about what\'s on your mind?';

  } catch (error) {
    console.error('OpenAI API error:', error);
    return 'I\'m here to listen and support you. As part of the Soul Technology network, I want you to know that your feelings matter. Could you tell me a bit more about how you\'re feeling right now?';
  }
}