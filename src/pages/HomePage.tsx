import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, Shield, Newspaper } from 'lucide-react';
import NewsAnalyzer from '../components/NewsAnalyzer';
import RecentAnalyses from '../components/RecentAnalyses';
import AnalysisResult from '../components/AnalysisResult';
import { getRecentAnalyses } from '../services/api';

const HomePage: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  useEffect(() => {
    const fetchRecentAnalyses = async () => {
      try {
        const analyses = await getRecentAnalyses();
        setRecentAnalyses(analyses);
      } catch (error) {
        console.error('Failed to fetch recent analyses:', error);
      }
    };

    fetchRecentAnalyses();
  }, [analysisResult]); // Refresh when we get new results

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecentAnalysisClick = async (id: string) => {
    // In a real app, we would fetch the specific analysis by ID
    // For now, we'll just simulate it by finding it in our recent analyses
    const analysis = recentAnalyses.find((a: any) => a.id === id);
    if (analysis && analysis.fullResult) {
      setAnalysisResult(analysis.fullResult);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Detect Fake News with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our advanced AI analyzes news articles to determine their credibility and help you identify misinformation.
          </p>
        </motion.div>

        {analysisResult && <AnalysisResult result={analysisResult} />}

        <NewsAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      </section>

      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RecentAnalyses 
            analyses={recentAnalyses}
            onAnalysisClick={handleRecentAnalysisClick}
          />
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Newspaper className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Input News</h3>
                  <p className="mt-1 text-gray-600">
                    Enter a URL to a news article or paste the article text directly.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">AI Analysis</h3>
                  <p className="mt-1 text-gray-600">
                    Our advanced AI model analyzes the content using natural language processing.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Credibility Score</h3>
                  <p className="mt-1 text-gray-600">
                    Get a detailed credibility score with analysis of language, sources, and content.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Warning Signs</h3>
                  <p className="mt-1 text-gray-600">
                    Identify specific warning signs and problematic elements in the article.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;