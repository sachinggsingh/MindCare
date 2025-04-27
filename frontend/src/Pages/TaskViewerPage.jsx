import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TaskViewer from '../components/TaskViewer';
import { ArrowLeft } from 'lucide-react';

const TaskViewerPage = () => {
  const { problemId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/services" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium"><b>Back to services</b></span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8 ">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Task Viewer</h2>
            <p className="text-gray-600 mb-2">View and manage tasks related to your problem.</p>
            <TaskViewer problemId={problemId} />
          </div>
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="mt-auto py-4 text-center text-sm text-gray-500 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} Your Application Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TaskViewerPage;
