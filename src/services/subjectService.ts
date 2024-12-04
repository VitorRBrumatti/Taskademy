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
import { Subject } from '../types';

export const subjectService = {
  async getSubjects(userId: string): Promise<Subject[]> {
    const q = query(
      collection(db, 'subjects'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Subject));
  },

  subscribeToSubjects(userId: string, callback: (subjects: Subject[]) => void) {
    const q = query(
      collection(db, 'subjects'),
      where('userId', '==', userId)
    );
    
    return onSnapshot(q, (snapshot) => {
      const subjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Subject));
      callback(subjects);
    });
  },

  async addSubject(subject: Omit<Subject, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'subjects'), subject);
    return docRef.id;
  },

  async updateSubject(subjectId: string, updates: Partial<Subject>): Promise<void> {
    const subjectRef = doc(db, 'subjects', subjectId);
    await updateDoc(subjectRef, updates);
  },

  async deleteSubject(subjectId: string): Promise<void> {
    const subjectRef = doc(db, 'subjects', subjectId);
    await deleteDoc(subjectRef);
  }
};