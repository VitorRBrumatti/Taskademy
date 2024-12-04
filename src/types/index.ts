export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  userId: string;
}

export interface Task {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  userId: string;
}