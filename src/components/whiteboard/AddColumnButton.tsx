import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddColumnButtonProps {
  onAdd: (title: string) => void;
}

export const AddColumnButton = ({ onAdd }: AddColumnButtonProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter column title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="flex-shrink-0 w-80 h-[100px] rounded-lg border-2 border-dashed border-gray-300 hover:border-green-500 flex items-center justify-center text-gray-500 hover:text-green-500 transition-colors"
    >
      <Plus className="w-6 h-6 mr-2" />
      Add Column
    </button>
  );
};