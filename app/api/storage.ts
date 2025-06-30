import { supabase } from '../../supabaseClient';

// Soul Technology message interface for Supabase integration
export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  sessionId: string;
  timestamp: Date;
}

export interface InsertMessage {
  content: string;
  isBot: boolean;
  sessionId: string;
}

// Supabase storage with fallback to memory for development
class SoulTechStorage {
  private messages: Map<string, Message> = new Map();
  private currentId = 0;

  async createMessage(data: InsertMessage): Promise<Message> {
    const message: Message = {
      id: (++this.currentId).toString(),
      ...data,
      timestamp: new Date(),
    };

    try {
      // Try to save to Supabase
      const { data: savedMessage, error } = await supabase
        .from('messages')
        .insert([{
          content: message.content,
          is_bot: message.isBot,
          session_id: message.sessionId,
          timestamp: message.timestamp.toISOString()
        }])
        .select()
        .single();

      if (savedMessage && !error) {
        return {
          id: savedMessage.id.toString(),
          content: savedMessage.content,
          isBot: savedMessage.is_bot,
          sessionId: savedMessage.session_id,
          timestamp: new Date(savedMessage.timestamp)
        };
      }
    } catch (error) {
      console.log('Supabase not available, using memory storage for development');
    }

    // Fallback to memory storage
    this.messages.set(message.id, message);
    return message;
  }

  async getMessagesBySession(sessionId: string): Promise<Message[]> {
    try {
      // Try to get from Supabase
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('timestamp', { ascending: true });

      if (data && !error) {
        return data.map(msg => ({
          id: msg.id.toString(),
          content: msg.content,
          isBot: msg.is_bot,
          sessionId: msg.session_id,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.log('Supabase not available, using memory storage for development');
    }

    // Fallback to memory storage
    const messages: Message[] = [];
    this.messages.forEach(message => {
      if (message.sessionId === sessionId) {
        messages.push(message);
      }
    });
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async clearSession(sessionId: string): Promise<void> {
    try {
      // Try to clear from Supabase
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('session_id', sessionId);

      if (!error) return;
    } catch (error) {
      console.log('Supabase not available, using memory storage for development');
    }

    // Fallback to memory storage
    const toDelete: string[] = [];
    this.messages.forEach((message, id) => {
      if (message.sessionId === sessionId) {
        toDelete.push(id);
      }
    });
    toDelete.forEach(id => this.messages.delete(id));
  }
}

export const storage = new SoulTechStorage();