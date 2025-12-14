import React from 'react';

export interface ChatState {
  query: string;
  response: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  colSpan?: string; // Tailwind class for grid column span
}