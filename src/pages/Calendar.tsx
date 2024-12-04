import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { TaskModal } from '../components/calendar/TaskModal';
import { DayCell } from '../components/calendar/DayCell';
import { TaskList } from '../components/calendar/TaskList';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { tasks, addTask, updateTask } = useTasks(user?.id || '');

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-md transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <button
              onClick={handleAddTask}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
            {/* Week days header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div
                key={day}
                className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {daysInMonth.map(date => (
              <DayCell
                key={date.toString()}
                date={date}
                isToday={isToday(date)}
                isCurrentMonth={isSameMonth(date, currentDate)}
                isSelected={selectedDate ? isSameMonth(date, selectedDate) && date.getDate() === selectedDate.getDate() : false}
                tasks={tasks.filter(task => 
                  isSameMonth(new Date(task.dueDate), date) && 
                  new Date(task.dueDate).getDate() === date.getDate()
                )}
                onClick={() => handleDayClick(date)}
              />
            ))}
          </div>
        </div>

        {/* Selected Day Tasks */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Tasks for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <TaskList
              date={selectedDate}
              tasks={tasks.filter(task => 
                isSameMonth(new Date(task.dueDate), selectedDate) && 
                new Date(task.dueDate).getDate() === selectedDate.getDate()
              )}
              onUpdateTask={updateTask}
            />
          </motion.div>
        )}

        {/* Task Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <TaskModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={addTask}
              initialDate={selectedDate || new Date()}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};