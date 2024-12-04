import { motion } from 'framer-motion';
import { ProgressChart } from '../components/ProgressChart';
import { TaskList } from '../components/TaskList';
import { Clock, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  // Sample data - replace with real data from your backend
  const progressData = [
    { date: 'Dom', completed: 5, total: 8 },
    { date: 'Seg', completed: 7, total: 10 },
    { date: 'Ter', completed: 6, total: 9 },
    { date: 'Qua', completed: 8, total: 12 },
    { date: 'Qui', completed: 10, total: 15 },
    { date: 'Sex', completed: 9, total: 13 },
    { date: 'Sab', completed: 11, total: 16 },
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progresso Semanal</h2>
            <ProgressChart data={progressData} />
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Próximos Prazos</h2>
            <div className="space-y-4">
              <div className="flex items-center text-yellow-500">
                <Clock className="h-5 w-5 mr-2" />
                <span>Vencimento em breve (próximas 48 horas)</span>
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
                Tasks Expiradas
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