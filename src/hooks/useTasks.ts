import { useState, useEffect } from 'react';
import { Task } from '../types';
import { taskService } from '../services/taskService';
import { useAuth } from './useAuth';

export function useTasks(subjectId: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !subjectId) return;

    const unsubscribe = taskService.subscribeToTasks(
      user.id,
      subjectId,
      (updatedTasks) => {
        setTasks(updatedTasks);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, subjectId]);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      await taskService.addTask(task);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await taskService.updateTask(taskId, updates);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask
  };
}