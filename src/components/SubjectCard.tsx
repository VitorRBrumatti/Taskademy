import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  nextTask?: { title: string; dueDate: Date };
}

export const SubjectCard = ({ subject, nextTask }: SubjectCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
    >
      <Link to={`/subjects/${subject.id}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{subject.name}</h3>
            <p className="text-gray-600 mt-1">{subject.description}</p>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${subject.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Progress: {subject.progress}%
          </p>
        </div>

        {nextTask && (
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Next: {nextTask.title}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
};