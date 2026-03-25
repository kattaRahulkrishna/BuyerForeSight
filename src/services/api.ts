import { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.statusText}`);
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
