// Simple API client for Next.js
export async function apiRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Chat API functions
export function useChatMessages(sessionId: string) {
  return {
    data: [],
    isLoading: false,
    refetch: () => Promise.resolve()
  };
}

export function useSendMessage() {
  return {
    mutateAsync: async (data: { content: string; sessionId: string }) => {
      return apiRequest('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    isPending: false
  };
}

export function useClearConversation() {
  return {
    mutateAsync: async (sessionId: string) => {
      return apiRequest(`/api/messages/${sessionId}`, {
        method: 'DELETE',
      });
    },
    isPending: false
  };
}