import { API_BASE_URL } from '@/configs';
import { Post, Settings } from '../types';

export async function fetchSettings(): Promise<Settings> {
  const response = await fetch(`${API_BASE_URL}/settings`);
  if (!response.ok) {
    throw new Error('Failed to fetch settings');
  }
  return response.json();
}

export async function fetchPosts(page: number, limit: number): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const allPosts: Post[] = await response.json();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return allPosts.slice(startIndex, endIndex);
}

