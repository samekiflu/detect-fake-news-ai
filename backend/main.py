from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Union
import uvicorn
import json
import datetime
import uuid
from fastapi.responses import JSONResponse

app = FastAPI(title="Fake News Detector API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request and response models
class AnalysisRequest(BaseModel):
    content: str
    type: str  # 'url' or 'text'

class CategoryScore(BaseModel):
    name: str
    score: float

class Source(BaseModel):
    url: str
    credibility: str
    match: float

class AnalysisResponse(BaseModel):
    id: str
    score: float
    verdict: str
    confidence: float
    categories: List[CategoryScore]
    explanation: str
    sources: List[Source]
    suggestions: List[str]
    timestamp: str
    title: Optional[str] = None
    url: Optional[str] = None
    text_snippet: Optional[str] = None

# In-memory storage for demo purposes
analysis_history = []

# Mock data for demonstration
def generate_mock_analysis(content: str, content_type: str) -> AnalysisResponse:
    """Generate mock analysis results based on input content."""
    
    # Determine credibility score based on keywords in the content
    if any(keyword in content.lower() for keyword in ['fake', 'miracle', 'shocking', 'unbelievable']):
        credibility_score = 0.25
        verdict = "Likely Fake News"
    elif any(keyword in content.lower() for keyword in ['study', 'research', 'science', 'report']):
        credibility_score = 0.85
        verdict = "Likely Credible"
    else:
        credibility_score = 0.55
        verdict = "Potentially Misleading"
    
    # Mock categories
    categories = [
        CategoryScore(name="Clickbait Language", score=0.8 if credibility_score < 0.4 else 0.2),
        CategoryScore(name="Source Credibility", score=0.3 if credibility_score < 0.4 else 0.85),
        CategoryScore(name="Factual Content", score=0.4 if credibility_score < 0.4 else 0.9),
        CategoryScore(name="Emotional Manipulation", score=0.75 if credibility_score < 0.4 else 0.15),
        CategoryScore(name="Bias", score=0.6 if credibility_score < 0.4 else 0.4),
    ]
    
    # Mock sources
    if credibility_score < 0.4:
        sources = [
            Source(url="https://example.com/article1", credibility="low", match=0.85),
            Source(url="https://example.com/article2", credibility="medium", match=0.65)
        ]
        explanation = "This article contains several characteristics of potential misinformation, including exaggerated claims, emotional language, and limited credible sources."
        suggestions = [
            "Verify this information with more established news sources",
            "Look for articles that cite specific studies or experts",
            "Check if other reputable outlets are reporting the same information",
            "Be cautious of claims that seem too dramatic or emotional"
        ]
    elif credibility_score > 0.7:
        sources = [
            Source(url="https://example.com/credible1", credibility="high", match=0.92),
            Source(url="https://example.com/credible2", credibility="high", match=0.88)
        ]
        explanation = "This article appears to be credible based on our analysis. It cites reputable sources, presents balanced information, and avoids sensationalist language."
        suggestions = [
            "Always cross-reference information with multiple sources",
            "Continue to evaluate the credibility of sources",
            "Consider the context and timing of the information",
            "Be aware that even credible sources can contain biases"
        ]
    else:
        sources = [
            Source(url="https://example.com/mixed1", credibility="medium", match=0.75),
            Source(url="https://example.com/mixed2", credibility="high", match=0.45)
        ]
        explanation = "This article contains a mix of credible and questionable elements. While some information appears accurate, there are instances of misleading presentation."
        suggestions = [
            "Look for more comprehensive coverage of this topic",
            "Pay attention to potential biases in presentation",
            "Consider whether important context might be missing",
            "Check if the article distinguishes clearly between facts and opinions"
        ]
    
    # Create title from the first few words
    title = " ".join(content.split()[:7]) + "..."
    
    # Create analysis response
    analysis = AnalysisResponse(
        id=str(uuid.uuid4()),
        score=credibility_score,
        verdict=verdict,
        confidence=0.85,
        categories=categories,
        explanation=explanation,
        sources=sources,
        suggestions=suggestions,
        timestamp=datetime.datetime.now().isoformat(),
        title=title,
        url=content if content_type == "url" else None,
        text_snippet=content[:150] + "..." if content_type == "text" else None
    )
    
    # Add to history for demo purposes
    analysis_dict = analysis.dict()
    analysis_history.append({
        "id": analysis_dict["id"],
        "title": analysis_dict["title"],
        "date": analysis_dict["timestamp"],
        "score": analysis_dict["score"],
        "url": analysis_dict["url"],
        "textSnippet": analysis_dict["text_snippet"],
        "fullResult": analysis_dict
    })
    
    return analysis

@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_content(request: AnalysisRequest):
    """Analyze content for credibility and fake news detection."""
    try:
      
        
    
        analysis = generate_mock_analysis(request.content, request.type)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analyses/recent")
async def get_recent_analyses():
    """Get the most recent analyses."""
    return analysis_history[:3]

@app.get("/api/analyses/history")
async def get_analysis_history():
    """Get the full analysis history."""
    return analysis_history

@app.get("/")
async def root():
    return {"message": "Welcome to the Fake News Detector API. Use /api/analyze to analyze content."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
