import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Task } from '../types';

export const taskService = {
  async getTasks(userId: string, subjectId: string): Promise<Task[]> {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      where('subjectId', '==', subjectId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Task));
  },

  subscribeToTasks(userId: string, subjectId: string, callback: (tasks: Task[]) => void) {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      where('subjectId', '==', subjectId)
    );
    
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
      callback(tasks);
    });
  },

  async addTask(task: Omit<Task, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    return docRef.id;
  },

  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, updates);
  },

  async deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
  }
};