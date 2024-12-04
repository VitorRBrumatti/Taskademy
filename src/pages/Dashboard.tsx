import React from 'react';
import { motion } from 'framer-motion';
import { ProgressChart } from '../components/ProgressChart';
import { TaskList } from '../components/TaskList';
import { Clock, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  // Sample data - replace with real data from your backend
  const progressData = [
    { date: 'Mon', completed: 5, total: 8 },
    { date: 'Tue', completed: 7, total: 10 },
    { date: 'Wed', completed: 6, total: 9 },
    { date: 'Thu', completed: 8, total: 12 },
    { date: 'Fri', completed: 10, total: 15 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Progress Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weekly Progress</h2>
            <ProgressChart data={progressData} />
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
            <div className="space-y-4">
              <div className="flex items-center text-yellow-500">
                <Clock className="h-5 w-5 mr-2" />
                <span>Due Soon (Next 48 hours)</span>
              </div>
              <TaskList
                tasks={[]}
                onToggleTask={() => {}}
              />
            </div>
          </div>

          {/* Overdue Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              <span className="flex items-center">
                <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                Overdue Tasks
              </span>
            </h2>
            <TaskList
              tasks={[]}
              onToggleTask={() => {}}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};