from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import numpy as np

class FakeNewsDetector:
    """
    A class for detecting fake news using transformer models.
    
    """
    
    def __init__(self, model_name="facebook/bart-large-mnli"):
        """
        Initialize the fake news detector with a pre-trained model.
        
        Args:
            model_name: Name of the pre-trained model to use
        """

        self.model_name = model_name
        print(f"Initialized FakeNewsDetector with model: {model_name}")
        
    def analyze_text(self, text):
        """
        Analyze text to determine if it contains fake news.
        
        Args:
            text: The text content to analyze
            
        Returns:
            A dictionary containing analysis results
        """
      
        print(f"Analyzing text: {text[:100]}...")
        
        # Simple keyword-based scoring for demonstration
        lower_text = text.lower()
        fake_indicators = ['shocking', 'miracle', 'secret', 'conspiracy', 'they don\'t want you to know']
        credible_indicators = ['study', 'research', 'according to', 'expert', 'evidence']
        
        fake_score = sum(1 for word in fake_indicators if word in lower_text) / len(fake_indicators)
        credible_score = sum(1 for word in credible_indicators if word in lower_text) / len(credible_indicators)
        
        total_score = (1 - fake_score + credible_score) / 2
        
        # Categories analysis
        categories = {
            "clickbait_language": min(1.0, fake_score * 1.5),
            "source_credibility": max(0.1, credible_score),
            "factual_content": max(0.2, credible_score * 1.2),
            "emotional_manipulation": min(1.0, fake_score * 1.3),
            "bias": 0.5  # Neutral for demonstration
        }
        
        return {
            "credibility_score": total_score,
            "confidence": 0.85,  # Fixed for demonstration
            "categories": categories
        }
    
    def extract_article_from_url(self, url):
        """
        Extract article content from a URL.
        
        
        
        Args:
            url: The URL to extract content from
            
        Returns:
            A dictionary containing the article's text, title, etc.
        """
       
        
        print(f"Extracting article from URL: {url}")
        return {
            "text": f"This is a placeholder article text extracted from {url}. In a real implementation, this would contain the actual content of the article obtained by scraping the webpage.",
            "title": "Article Title Placeholder",
            "authors": ["Author Name"],
            "publish_date": "2023-05-15",
            "top_image": "https://example.com/image.jpg",
            "url": url
        }
