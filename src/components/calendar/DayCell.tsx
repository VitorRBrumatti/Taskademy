import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../../types';

interface DayCellProps {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
  isSelected: boolean;
  tasks: Task[];
  onClick: () => void;
}

export const DayCell = ({
  date,
  isToday,
  isCurrentMonth,
  isSelected,
  tasks,
  onClick,
}: DayCellProps) => {
  const getTaskStatusCount = () => {
    return {
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
    };
  };

  const { completed, pending } = getTaskStatusCount();

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative h-32 p-2 bg-white cursor-pointer transition-colors
        ${!isCurrentMonth ? 'bg-gray-50' : ''}
        ${isSelected ? 'ring-2 ring-green-500' : ''}
      `}
    >
      <div className="flex justify-between items-start">
        <span
          className={`
            inline-flex items-center justify-center w-6 h-6 rounded-full text-sm
            ${isToday ? 'bg-green-500 text-white' : 'text-gray-700'}
            ${!isCurrentMonth ? 'text-gray-400' : ''}
          `}
        >
          {date.getDate()}
        </span>
        
        {(completed > 0 || pending > 0) && (
          <div className="flex space-x-1">
            {completed > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full text-xs text-green-800">
                {completed}
              </span>
            )}
            {pending > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-yellow-100 rounded-full text-xs text-yellow-800">
                {pending}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1">
        {tasks.slice(0, 2).map(task => (
          <div
            key={task.id}
            className={`
              text-xs truncate rounded px-1 py-0.5
              ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
            `}
          >
            {task.title}
          </div>
        ))}
        {tasks.length > 2 && (
          <div className="text-xs text-gray-500">
            +{tasks.length - 2} more
          </div>
        )}
      </div>
    </motion.div>
  );
};