import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export const TaskCard = ({ task, isDragging = false }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h4 className="text-lg font-medium text-gray-800">{task.title}</h4>
      <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
      
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {format(task.dueDate, 'MMM dd')}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
    </div>
  );
};