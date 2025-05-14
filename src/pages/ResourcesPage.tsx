import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, ExternalLink, Youtube, GraduationCap, Award } from 'lucide-react';

const ResourcesPage: React.FC = () => {
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
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Educational Resources</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our curated collection of resources to improve your critical thinking skills and learn how to identify misinformation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-3 bg-blue-600"></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Guides</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Step-by-step guides to help you verify information and identify fake news.
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start text-blue-600 hover:text-blue-800 transition-colors">
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Fact-Checking 101: A Beginner's Guide</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-blue-600 hover:text-blue-800 transition-colors">
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>How to Verify Images and Videos</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-blue-600 hover:text-blue-800 transition-colors">
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Spotting Clickbait and Sensationalism</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-blue-600 hover:text-blue-800 transition-colors">
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Understanding Media Bias</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-blue-600 hover:text-blue-800 transition-colors">
                  <FileText className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Evaluating Source Credibility</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-3 bg-green-600"></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Youtube className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Videos</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Educational videos explaining concepts related to misinformation and media literacy.
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start text-green-600 hover:text-green-800 transition-colors">
                  <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>The Psychology of Fake News</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-green-600 hover:text-green-800 transition-colors">
                  <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>How AI Detects Misinformation</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-green-600 hover:text-green-800 transition-colors">
                  <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Deep Fakes Explained</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-green-600 hover:text-green-800 transition-colors">
                  <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>The History of Propaganda</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-green-600 hover:text-green-800 transition-colors">
                  <ExternalLink className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Misinformation in Social Media</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-3 bg-purple-600"></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Courses</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Comprehensive courses to develop your media literacy and critical thinking skills.
            </p>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-start text-purple-600 hover:text-purple-800 transition-colors">
                  <Award className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Media Literacy Certification</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-purple-600 hover:text-purple-800 transition-colors">
                  <Award className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Introduction to Fact-Checking</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-purple-600 hover:text-purple-800 transition-colors">
                  <Award className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Digital Forensics Basics</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-purple-600 hover:text-purple-800 transition-colors">
                  <Award className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Critical Thinking in the Digital Age</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-purple-600 hover:text-purple-800 transition-colors">
                  <Award className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced Fact-Checking Techniques</span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Trusted Fact-Checking Organizations</h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">International Fact-Checking Network</h3>
            <p className="text-gray-600 text-sm mb-3">
              A global alliance of fact-checkers promoting excellence in fact-checking.
            </p>
            <a href="https://www.poynter.org/ifcn/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
              Visit Website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </motion.div>
          
          <motion.div variants={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">Full Fact</h3>
            <p className="text-gray-600 text-sm mb-3">
              UK's independent fact-checking charity, tackling bad information across media.
            </p>
            <a href="https://fullfact.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
              Visit Website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </motion.div>
          
          <motion.div variants={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">PolitiFact</h3>
            <p className="text-gray-600 text-sm mb-3">
              Fact-checking website focused on claims made by politicians and elected officials.
            </p>
            <a href="https://www.politifact.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
              Visit Website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </motion.div>
          
          <motion.div variants={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">Snopes</h3>
            <p className="text-gray-600 text-sm mb-3">
              One of the internet's oldest fact-checking websites, focusing on urban legends and misinformation.
            </p>
            <a href="https://www.snopes.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
              Visit Website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </motion.div>
          
          <motion.div variants={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">FactCheck.org</h3>
            <p className="text-gray-600 text-sm mb-3">
              Nonpartisan, nonprofit project that monitors factual accuracy in U.S. politics.
            </p>
            <a href="https://www.factcheck.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
              Visit Website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </motion.div>
          
          <motion.div variants={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium text-gray-800 mb-2">Media Bias/Fact Check</h3>
            <p className="text-gray-600 text-sm mb-3">
              Comprehensive resource for media bias ratings and factual accuracy assessments.
            </p>
            <a href="https://mediabiasfactcheck.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
              Visit Website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gray-50 rounded-xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Informed</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates on new resources, tools, and insights about combating misinformation.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-l-lg border-y border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;