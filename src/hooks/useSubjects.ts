import { useState, useEffect } from 'react';
import { Subject } from '../types';
import { subjectService } from '../services/subjectService';
import { useAuth } from './useAuth';

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subjectService.subscribeToSubjects(
      user.id,
      (updatedSubjects) => {
        setSubjects(updatedSubjects);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addSubject = async (subject: Omit<Subject, 'id'>) => {
    try {
      await subjectService.addSubject(subject);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateSubject = async (subjectId: string, updates: Partial<Subject>) => {
    try {
      await subjectService.updateSubject(subjectId, updates);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteSubject = async (subjectId: string) => {
    try {
      await subjectService.deleteSubject(subjectId);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    subjects,
    loading,
    error,
    addSubject,
    updateSubject,
    deleteSubject
  };
}