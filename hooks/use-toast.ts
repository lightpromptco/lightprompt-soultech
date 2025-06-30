// Simple toast hook for Next.js
export function useToast() {
  return {
    toast: (options: any) => {
      console.log('Toast:', options.title, options.description);
    }
  };
}