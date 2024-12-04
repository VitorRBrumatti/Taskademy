import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../../types';

interface TaskListProps {
  date: Date;
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
}

export const TaskList = ({ tasks, onUpdateTask }: TaskListProps) => {
  const handleToggleTask = async (taskId: string, completed: boolean) => {
    try {
      await onUpdateTask(taskId, { completed: !completed });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhuma tarefa agendada para este dia
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <button
            onClick={() => handleToggleTask(task.id, task.completed)}
            className="mt-1 focus:outline-none"
          >
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <h4 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="text-xs text-gray-500 mt-2">
              Data em {format(new Date(task.dueDate), 'h:mm a')}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};