import { useState, useEffect } from 'react';
import { ref, push, update, remove, onValue } from 'firebase/database';
import { database } from '../config/firebase';

export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  userId: string;
}

export const useFirebaseTasks = (userId: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    setLoading(true);
    try {
      const tasksRef = ref(database, `tasks/${userId}`);
      const unsubscribe = onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const taskList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTasks(taskList);
        } else {
          setTasks([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [userId]);

  const addTask = async (title: string, description: string) => {
    if (!userId) return;
    try {
      const tasksRef = ref(database, `tasks/${userId}`);
      await push(tasksRef, {
        title,
        description,
        done: false,
        userId,
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!userId) return;
    try {
      const taskRef = ref(database, `tasks/${userId}/${taskId}`);
      await update(taskRef, updates);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!userId) return;
    try {
      const taskRef = ref(database, `tasks/${userId}/${taskId}`);
      await remove(taskRef);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const toggleTask = async (taskId: string, done: boolean) => {
    await updateTask(taskId, { done: !done });
  };

  return { tasks, loading, error, addTask, updateTask, deleteTask, toggleTask };
};
