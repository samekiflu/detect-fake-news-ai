import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Analysis {
  id: string;
  title: string;
  date: string;
  score: number;
  url?: string;
}

interface RecentAnalysesProps {
  analyses: Analysis[];
  onAnalysisClick: (id: string) => void;
}

const RecentAnalyses: React.FC<RecentAnalysesProps> = ({ analyses, onAnalysisClick }) => {
  const getStatusIcon = (score: number) => {
    if (score < 0.33) return <XCircle className="h-4 w-4 text-red-500" />;
    if (score < 0.66) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <Clock className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Recent Analyses</h2>
      </div>

      {analyses.length > 0 ? (
        <motion.div 
          className="space-y-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {analyses.map((analysis) => (
            <motion.div
              key={analysis.id}
              variants={item}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onAnalysisClick(analysis.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 line-clamp-1">{analysis.title}</h3>
                  {analysis.url && (
                    <p className="text-gray-500 text-sm line-clamp-1 mt-1">
                      {analysis.url}
                    </p>
                  )}
                </div>
                <div className="flex items-center ml-4">
                  {getStatusIcon(analysis.score)}
                  <span className="ml-1 text-sm font-medium">
                    {Math.round(analysis.score * 100)}%
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {new Date(analysis.date).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No recent analyses. Start analyzing news articles to see your history.</p>
        </div>
      )}
    </div>
  );
};

export default RecentAnalyses;