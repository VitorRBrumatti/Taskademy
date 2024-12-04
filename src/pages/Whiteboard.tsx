import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Column } from '../components/whiteboard/Column';
import { TaskCard } from '../components/whiteboard/TaskCard';
import { AddColumnButton } from '../components/whiteboard/AddColumnButton';
import { Task } from '../types';

export const Whiteboard = () => {
  const { subjectId } = useParams();
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const task = columns
      .find(col => col.tasks.some(t => t.id === active.id))
      ?.tasks.find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeColId = active.data.current.sortable.containerId;
    const overColId = over.data.current?.sortable.containerId || over.id;

    if (activeColId !== overColId) {
      setColumns(columns => {
        const activeCol = columns.find(col => col.id === activeColId);
        const overCol = columns.find(col => col.id === overColId);

        if (!activeCol || !overCol) return columns;

        const activeTask = activeCol.tasks.find(task => task.id === active.id);
        if (!activeTask) return columns;

        return columns.map(col => {
          if (col.id === activeColId) {
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== active.id),
            };
          }
          if (col.id === overColId) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask],
            };
          }
          return col;
        });
      });
    }
    setActiveTask(null);
  };

  const addColumn = (title: string) => {
    const newColumn = {
      id: `column-${Date.now()}`,
      title,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-[1920px] mx-auto">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2">
            {columns.map(column => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={column.tasks}
              />
            ))}
            <AddColumnButton onAdd={addColumn} />
          </div>
          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={activeTask}
                isDragging
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};