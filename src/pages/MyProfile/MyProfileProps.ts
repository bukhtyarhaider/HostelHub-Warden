export interface UserProfile {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// Expanded to include either user profile data or an error message
export type UserData = UserProfile | { error: string };
