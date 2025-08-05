from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Lead(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    website_url: str
    project: Optional[str] = None
    budget_range: Optional[str] = None
    newsletter: Optional[str] = None
    service: Optional[str] = None
    contact_method: Optional[str] = None
    contact_other_text: Optional[str] = None

from src.analyzers.seo_analyzer import analyze_pagespeed

@app.post("/analyze")
async def analyze_lead(lead: Lead):
    print("Received lead:")
    print(lead.model_dump_json(indent=2))

    pagespeed_results = analyze_pagespeed(lead.website_url)

    print("PageSpeed Analysis Results:")
    print(pagespeed_results)

    return {"status": "success", "data": lead, "analysis": {"pagespeed": pagespeed_results}}

@app.get("/")
def read_root():
    return {"Hello": "World"}
