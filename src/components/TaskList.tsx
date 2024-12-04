import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Calendar, Flag } from 'lucide-react';
import { Task } from '../types';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const priorityColors = {
  low: 'text-blue-500',
  medium: 'text-yellow-500',
  high: 'text-red-500'
};

export const TaskList = ({ tasks, onToggleTask }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onToggleTask(task.id)}
                className="mt-1 focus:outline-none"
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </button>
              
              <div>
                <h4 className={`text-lg font-medium ${
                  task.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                }`}>
                  {task.title}
                </h4>
                <p className="text-gray-600 mt-1">{task.description}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(task.dueDate, 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center text-sm">
                    <Flag className={`h-4 w-4 mr-1 ${priorityColors[task.priority]}`} />
                    {task.priority}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};