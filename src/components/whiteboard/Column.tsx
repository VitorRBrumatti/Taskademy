import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Task } from '../../types';
import { Plus } from 'lucide-react';

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export const Column = ({ id, title, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div
        ref={setNodeRef}
        className="p-4 space-y-4 min-h-[200px]"
      >
        <SortableContext
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        <button className="w-full py-2 px-4 rounded-md border-2 border-dashed border-gray-300 text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>
    </div>
  );
};