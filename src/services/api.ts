import axios from 'axios';

// Mock data for development - in a real app, this would be replaced with actual API calls
const mockAnalysisResult = {
  score: 0.32,
  verdict: "Likely Fake News",
  confidence: 0.87,
  categories: [
    { name: "Clickbait Language", score: 0.78 },
    { name: "Source Credibility", score: 0.21 },
    { name: "Factual Content", score: 0.35 },
    { name: "Emotional Manipulation", score: 0.64 },
    { name: "Bias", score: 0.72 }
  ],
  explanation: "This article contains several characteristics of potential misinformation, including exaggerated claims, emotional language, and limited credible sources. The content makes assertions without proper evidence and uses sensationalist headlines.",
  sources: [
    { url: "https://example.com/article1", credibility: "low", match: 0.85 },
    { url: "https://example.com/article2", credibility: "medium", match: 0.65 }
  ],
  suggestions: [
    "Verify this information with more established news sources",
    "Look for articles that cite specific studies or experts",
    "Check if other reputable outlets are reporting the same information",
    "Be cautious of claims that seem too dramatic or emotional"
  ]
};

const mockHighCredibilityResult = {
  score: 0.89,
  verdict: "Likely Credible",
  confidence: 0.92,
  categories: [
    { name: "Clickbait Language", score: 0.15 },
    { name: "Source Credibility", score: 0.91 },
    { name: "Factual Content", score: 0.87 },
    { name: "Emotional Manipulation", score: 0.12 },
    { name: "Bias", score: 0.32 }
  ],
  explanation: "This article appears to be credible based on our analysis. It cites reputable sources, presents balanced information, and avoids sensationalist language. The claims made are supported by evidence and expert opinions.",
  sources: [
    { url: "https://example.com/credible1", credibility: "high", match: 0.92 },
    { url: "https://example.com/credible2", credibility: "high", match: 0.88 }
  ],
  suggestions: [
    "Always cross-reference information with multiple sources",
    "Continue to evaluate the credibility of sources",
    "Consider the context and timing of the information",
    "Be aware that even credible sources can contain biases"
  ]
};

const mockMediumCredibilityResult = {
  score: 0.58,
  verdict: "Potentially Misleading",
  confidence: 0.76,
  categories: [
    { name: "Clickbait Language", score: 0.45 },
    { name: "Source Credibility", score: 0.62 },
    { name: "Factual Content", score: 0.57 },
    { name: "Emotional Manipulation", score: 0.41 },
    { name: "Bias", score: 0.65 }
  ],
  explanation: "This article contains a mix of credible and questionable elements. While some information appears accurate, there are instances of misleading presentation, selective facts, or exaggeration. Exercise caution when sharing or acting on this information.",
  sources: [
    { url: "https://example.com/mixed1", credibility: "medium", match: 0.75 },
    { url: "https://example.com/mixed2", credibility: "high", match: 0.45 }
  ],
  suggestions: [
    "Look for more comprehensive coverage of this topic",
    "Pay attention to potential biases in presentation",
    "Consider whether important context might be missing",
    "Check if the article distinguishes clearly between facts and opinions"
  ]
};

const mockHistory = [
  { 
    id: "1", 
    title: "Scientists Discover Miracle Cure for All Diseases",
    date: "2023-05-15T14:23:00Z",
    score: 0.21,
    url: "https://example.com/miracle-cure",
    textSnippet: "Scientists have made an incredible breakthrough that will eliminate all diseases forever with this one simple treatment..."
  },
  { 
    id: "2", 
    title: "New Study Shows Link Between Exercise and Longevity",
    date: "2023-05-12T09:45:00Z",
    score: 0.89,
    url: "https://example.com/exercise-study",
    textSnippet: "A comprehensive study by Harvard researchers indicates that regular exercise of at least 30 minutes daily can significantly extend lifespan by up to 5 years..."
  },
  { 
    id: "3", 
    title: "Government Announces New Economic Policy",
    date: "2023-05-10T16:30:00Z",
    score: 0.67,
    url: "https://example.com/economic-policy",
    textSnippet: "The administration today unveiled its new economic framework aimed at reducing inflation while promoting job growth in key sectors..."
  },
  { 
    id: "4", 
    title: "Global Temperatures Rise for Fifth Consecutive Year",
    date: "2023-05-08T11:15:00Z",
    score: 0.92,
    url: "https://example.com/climate-report",
    textSnippet: "According to data released by NOAA and NASA, global temperatures have increased for the fifth year in a row, marking the warmest decade on record..."
  },
  { 
    id: "5", 
    title: "Celebrity Reveals Shocking Secret About Hollywood",
    date: "2023-05-05T20:00:00Z",
    score: 0.28,
    url: "https://example.com/celebrity-secret",
    textSnippet: "A major Hollywood star has come forward with explosive revelations about the entertainment industry that will shock fans worldwide..."
  }
];

// In a real application, this would make an API call to a Python backend
export const analyzeNews = async (input: string, type: 'url' | 'text'): Promise<any> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demonstration purposes, we're returning mock data based on input
    // In a real app, this would call the backend API
    if (input.includes('fake') || input.includes('miracle') || input.includes('shocking')) {
      return mockAnalysisResult;
    } else if (input.includes('study') || input.includes('research') || input.includes('science')) {
      return mockHighCredibilityResult;
    } else {
      return mockMediumCredibilityResult;
    }

    // Real implementation would look something like:
    // const response = await axios.post('/api/analyze', { input, type });
    // return response.data;
  } catch (error) {
    console.error('Error analyzing news:', error);
    throw error;
  }
};

export const getRecentAnalyses = async (): Promise<any[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data
    // In a real app, this would call the backend API
    return mockHistory.slice(0, 3);

    // Real implementation would look something like:
    // const response = await axios.get('/api/analyses/recent');
    // return response.data;
  } catch (error) {
    console.error('Error fetching recent analyses:', error);
    throw error;
  }
};

export const getAnalysisHistory = async (): Promise<any[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock data
    // In a real app, this would call the backend API
    return mockHistory;

    // Real implementation would look something like:
    // const response = await axios.get('/api/analyses/history');
    // return response.data;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    throw error;
  }
};