import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Search, Filter, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getAnalysisHistory } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface AnalysisItem {
  id: string;
  title: string;
  date: string;
  score: number;
  url?: string;
  textSnippet?: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<AnalysisItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<AnalysisItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await getAnalysisHistory();
        setHistory(data);
        setFilteredHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    filterHistory();
  }, [searchTerm, filterValue, history]);

  const filterHistory = () => {
    let filtered = [...history];
    
    // Apply search term filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.url && item.url.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.textSnippet && item.textSnippet.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply credibility filter
    if (filterValue === 'high') {
      filtered = filtered.filter(item => item.score >= 0.66);
    } else if (filterValue === 'medium') {
      filtered = filtered.filter(item => item.score >= 0.33 && item.score < 0.66);
    } else if (filterValue === 'low') {
      filtered = filtered.filter(item => item.score < 0.33);
    }
    
    setFilteredHistory(filtered);
  };

  const getStatusIcon = (score: number) => {
    if (score < 0.33) return <XCircle className="h-5 w-5 text-red-500" />;
    if (score < 0.66) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <CheckCircle className="h-5 w-5 text-green-500" />;
  };

  const clearHistory = () => {
    // In a real app, this would make an API call to delete history
    setHistory([]);
    setFilteredHistory([]);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-8"
      >
        <History className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Your Analysis History</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by title or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              >
                <option value="all">All Scores</option>
                <option value="high">High Credibility</option>
                <option value="medium">Medium Credibility</option>
                <option value="low">Low Credibility</option>
              </select>
            </div>
            
            <button
              onClick={clearHistory}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear History
            </button>
          </div>
          
          {isLoading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner size="large" />
            </div>
          ) : filteredHistory.length > 0 ? (
            <motion.div
              className="space-y-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredHistory.map((item) => (
                <motion.div
                  key={item.id}
                  variants={item}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-4">
                      {getStatusIcon(item.score)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.title}</h3>
                      
                      {item.url && (
                        <p className="text-blue-600 hover:underline text-sm mt-1">
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.url}
                          </a>
                        </p>
                      )}
                      
                      {item.textSnippet && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {item.textSnippet}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-gray-500 text-sm">
                          {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString()}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Score: {Math.round(item.score * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500">No analysis history found.</p>
              {searchTerm || filterValue !== 'all' ? (
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
              ) : (
                <p className="text-gray-500 mt-2">Start analyzing news articles to build your history.</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HistoryPage;