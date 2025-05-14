import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Link as LinkIcon, FileText, RefreshCw } from 'lucide-react';
import { useAlert } from '../context/AlertContext';
import { analyzeNews } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

interface NewsAnalyzerProps {
  onAnalysisComplete: (result: any) => void;
}

const NewsAnalyzer: React.FC<NewsAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [inputType, setInputType] = useState<'url' | 'text'>('url');
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      showAlert('Please enter a URL or text to analyze', 'warning');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await analyzeNews(input, inputType);
      onAnalysisComplete(result);
      showAlert('Analysis completed successfully', 'success');
    } catch (error) {
      console.error('Analysis error:', error);
      showAlert('Failed to analyze content. Please try again.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleInputType = () => {
    setInputType(inputType === 'url' ? 'text' : 'url');
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Detect Fake News</h2>
      <p className="text-gray-600 mb-6">
        Enter a news article URL or paste the text content to analyze its credibility.
      </p>

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              inputType === 'url'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
            onClick={() => setInputType('url')}
          >
            <div className="flex items-center">
              <LinkIcon className="h-4 w-4 mr-2" />
              URL
            </div>
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              inputType === 'text'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
            onClick={() => setInputType('text')}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Text
            </div>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {inputType === 'url' ? (
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              News Article URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="url"
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/news-article"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isAnalyzing}
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
              News Article Text
            </label>
            <textarea
              id="text"
              rows={6}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste the news article text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isAnalyzing}
            ></textarea>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            type="submit"
            disabled={isAnalyzing || !input.trim()}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <LoadingSpinner size="small" />
                <span className="ml-2">Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Analyze
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={toggleInputType}
            className="flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Switch to {inputType === 'url' ? 'Text' : 'URL'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewsAnalyzer;