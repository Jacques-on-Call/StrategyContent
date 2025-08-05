import os
import requests

def analyze_pagespeed(url: str) -> dict:
    """
    Analyzes the PageSpeed of a given URL using Google PageSpeed Insights API.
    """
    api_key = os.environ.get("PAGESPEED_API_KEY", "YOUR_API_KEY_HERE")
    if api_key == "YOUR_API_KEY_HERE":
        return {"error": "PageSpeed API key is not set."}

    endpoint = f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&key={api_key}&strategy=mobile"

    try:
        response = requests.get(endpoint)
        response.raise_for_status()  # Raises an HTTPError for bad responses (4xx or 5xx)
        data = response.json()

        # Extracting relevant metrics
        lighthouse_result = data.get('lighthouseResult', {})
        categories = lighthouse_result.get('categories', {})
        performance_score = categories.get('performance', {}).get('score', 0) * 100

        audits = lighthouse_result.get('audits', {})
        lcp = audits.get('largest-contentful-paint', {}).get('displayValue', 'N/A')
        fid = audits.get('max-potential-fid', {}).get('displayValue', 'N/A') # Note: FID is not directly available, max-potential-fid is a proxy
        cls = audits.get('cumulative-layout-shift', {}).get('displayValue', 'N/A')

        return {
            "performance_score": f"{performance_score:.0f}",
            "largest_contentful_paint": lcp,
            "first_input_delay": fid,
            "cumulative_layout_shift": cls,
            "recommendations": [
                audit.get('title') for audit_id, audit in audits.items()
                if audit.get('score', 1) is not None and audit.get('score', 1) < 0.9 and audit.get('details', {}).get('type') == 'opportunity'
            ][:5] # Top 5 recommendations
        }

    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to connect to PageSpeed API: {e}"}
    except KeyError:
        return {"error": "Invalid response from PageSpeed API. The domain might be invalid or the API key is wrong."}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {e}"}
