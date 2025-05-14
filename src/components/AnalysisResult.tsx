import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title 
} from 'chart.js';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  BarChart4,
  Link
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

interface AnalysisResultProps {
  result: {
    score: number;
    verdict: string;
    confidence: number;
    categories: {
      name: string;
      score: number;
    }[];
    explanation: string;
    sources: {
      url: string;
      credibility: string;
      match: number;
    }[];
    suggestions: string[];
  };
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusColor = (score: number) => {
    if (score < 0.33) return 'text-red-500';
    if (score < 0.66) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusIcon = (score: number) => {
    if (score < 0.33) return <XCircle className="h-6 w-6 text-red-500" />;
    if (score < 0.66) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    return <CheckCircle className="h-6 w-6 text-green-500" />;
  };

  const getVerdictClass = (score: number) => {
    if (score < 0.33) return 'bg-red-50 text-red-800 border-red-200';
    if (score < 0.66) return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    return 'bg-green-50 text-green-800 border-green-200';
  };

  const chartData = {
    labels: ['Credible', 'Non-Credible'],
    datasets: [
      {
        data: [result.score * 100, (1 - result.score) * 100],
        backgroundColor: [
          result.score >= 0.66 ? '#10B981' : (result.score >= 0.33 ? '#FBBF24' : '#EF4444'),
          '#E5E7EB'
        ],
        borderWidth: 0,
        cutout: '70%'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8 my-8"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center justify-center">
          <div className="h-48 w-48 relative">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-3xl font-bold ${getStatusColor(result.score)}`}>
                {Math.round(result.score * 100)}%
              </span>
              <span className="text-gray-500 text-sm">credibility</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 md:pl-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full mb-4 ${getVerdictClass(result.score)}`}>
            {getStatusIcon(result.score)}
            <span className="ml-2 font-medium">{result.verdict}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Results</h2>
          
          <p className="text-gray-600 mb-4">
            {result.explanation}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-700 mb-2">
                <BarChart4 className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium">Confidence Level</span>
              </div>
              <div className="h-2 relative max-w-xl rounded-full overflow-hidden bg-gray-200">
                <div
                  className={`absolute h-full ${
                    result.confidence > 0.7 ? 'bg-green-500' : 
                    result.confidence > 0.4 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-600 mt-1">
                {Math.round(result.confidence * 100)}%
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-5 w-5 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 mr-1" />
                Show Details
              </>
            )}
          </button>
        </div>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Analysis</h3>
              <div className="space-y-4">
                {result.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700">{category.name}</span>
                      <span className={getStatusColor(category.score)}>
                        {Math.round(category.score * 100)}%
                      </span>
                    </div>
                    <div className="h-2 relative max-w-xl rounded-full overflow-hidden bg-gray-200">
                      <div
                        className={`absolute h-full ${
                          category.score > 0.66 ? 'bg-green-500' : 
                          category.score > 0.33 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${category.score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Source Verification</h3>
              {result.sources.length > 0 ? (
                <div className="space-y-3">
                  {result.sources.map((source, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-1">
                          <Link className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline line-clamp-1"
                          >
                            {source.url}
                          </a>
                          <div className="flex items-center mt-1">
                            <span
                              className={`inline-block h-2 w-2 rounded-full mr-2 ${
                                source.credibility === 'high' ? 'bg-green-500' :
                                source.credibility === 'medium' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                            ></span>
                            <span className="text-sm text-gray-600">
                              {source.credibility.charAt(0).toUpperCase() + source.credibility.slice(1)} credibility
                            </span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span className="text-sm text-gray-600">
                              {Math.round(source.match * 100)}% match
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No source verification available.</p>
              )}
              
              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-4">Recommendations</h3>
              <ul className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <Info className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalysisResult;