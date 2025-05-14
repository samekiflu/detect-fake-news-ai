import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Book, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About TruthSeeker</h1>
        <p className="text-xl text-gray-600">
          Our mission is to combat misinformation and help people find the truth.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-12"
      >
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            TruthSeeker was founded in 2025 with a simple but powerful mission: to make fact-checking accessible to everyone. In an era of information overload and increasing misinformation, we believe that everyone deserves tools to verify what they read online.
          </p>
          <p className="text-gray-600">
            Our platform uses advanced artificial intelligence and machine learning algorithms to analyze news content and provide credibility assessments. We combine natural language processing with fact verification techniques to identify potentially misleading or false information.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Our Technology</h2>
          <p className="text-gray-600">
            TruthSeeker leverages state-of-the-art natural language processing models from Hugging Face to analyze news articles. Our system evaluates multiple dimensions of credibility:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6">
            <li>Language patterns associated with misinformation</li>
            <li>Source credibility verification</li>
            <li>Claim verification against known facts</li>
            <li>Emotional manipulation detection</li>
            <li>Bias and perspective analysis</li>
          </ul>
          <p className="text-gray-600">
            We continuously train and improve our models with feedback from journalism experts and fact-checking organizations. Our approach combines machine learning with human expertise to deliver the most accurate results possible.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Our Values</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
              <span><strong>Accuracy:</strong> We strive for the highest level of accuracy in our analyses and continuously improve our models.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
              <span><strong>Transparency:</strong> We're open about how our technology works and its limitations.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
              <span><strong>Accessibility:</strong> We believe fact-checking tools should be available to everyone.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
              <span><strong>Education:</strong> We aim to help people develop their own critical thinking skills.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-600 mt-2 mr-2"></span>
              <span><strong>Neutrality:</strong> We assess content based on factual accuracy, not political alignment.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Creator</h2>
          </div>
          <p className="text-gray-600 mb-4">
            TruthSeeker was created by a Software Engineer who is a Computer Science Student at Purdue University.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-2"></div>
              <h3 className="font-medium text-gray-800">Siem Kiflu</h3>
              <p className="text-sm text-gray-600">Software Engineer & AI Lead</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center justify-center mb-8 space-x-8">
          <div className="flex flex-col items-center">
            <Book className="h-12 w-12 text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-900">10M+</span>
            <span className="text-gray-600">Articles Analyzed</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-12 w-12 text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-900">500K+</span>
            <span className="text-gray-600">Active Users</span>
          </div>
          <div className="flex flex-col items-center">
            <Award className="h-12 w-12 text-blue-600 mb-2" />
            <span className="text-2xl font-bold text-gray-900">95%</span>
            <span className="text-gray-600">Accuracy Rate</span>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Join Our Mission</h3>
          <p className="text-gray-600 mb-4">
            Help us fight misinformation and build a more informed society.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Contact Us
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;