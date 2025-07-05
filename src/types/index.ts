export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string; // Only for mock, don't expose this in real scenarios
}

export interface Dustbin {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}
