const TOOLS_CATALOG = {
    "Google Search_console": { name: "Google Search Console", cost: "Free", learning_curve: "Medium" },
    "google_keyword_planner": { name: "Google Keyword Planner", cost: "Free", learning_curve: "Medium" },
    "google_analytics": { name: "Google Analytics", cost: "Free", learning_curve: "High" },
    "semrush_seo": { name: "SEMrush (SEO & Content)", cost: "High (approx. $100+/month)", learning_curve: "High" }, // R2000+ -> ~$100+
    "ahrefs_seo": { name: "Ahrefs (SEO Platform)", cost: "High (approx. $100+/month)", learning_curve: "High" }, // R2000+ -> ~$100+
    "buffer_social": { name: "Buffer (Social Media Management)", cost: "Free / Low (Premium option from ~$6/month)", learning_curve: "Low" }, // R100-R500 -> ~$6-30
    "hotjar_analytics": { name: "Hotjar (Analytics & Feedback)", cost: "Free / Medium (Premium option from ~$39/month)", learning_curve: "Medium" }, // R500-R2000 -> ~$30-100
    "grammarly_writing": { name: "Grammarly (Writing Assistant)", cost: "Free / Low (Premium option from ~$12/month)", learning_curve: "Low" },
    "yoast_seo_wordpress": { name: "Yoast SEO (WordPress Plugin)", cost: "Free / Low (Premium option from ~$49/year)", learning_curve: "Low" },
    "rank_math_wordpress": { name: "Rank Math SEO (WordPress Plugin)", cost: "Free / Low (Premium option from ~$59/year)", learning_curve: "Medium" },
    "screaming_frog_seo": { name: "Screaming Frog SEO Spider", cost: "Free / Medium (Paid license ~$200/year)", learning_curve: "High" }, // Cost for paid version
    "canva_design": { name: "Canva (Graphic Design)", cost: "Free / Low (Premium option from ~$12/month)", learning_curve: "Low" },
    "linkedin_analytics": { name: "LinkedIn Analytics", cost: "Free", learning_curve: "Medium" }, // Built-in
    "mailchimp_email": { name: "Mailchimp (Email Marketing)", cost: "Free / Medium (Premium option from ~$20/month)", learning_curve: "Medium" }, // Adjusted based on tiers
    "answer_the_public": { name: "AnswerThePublic (Keyword Ideas)", cost: "Free / Low (Premium option from ~$99/month)", learning_curve: "Low"}, // Premium is higher
    "brightlocal_local_seo": { name: "BrightLocal (Local SEO)", cost: "Medium (approx. $40-100+/month)", learning_curve: "Medium"}, // R500-R2000 -> ~$30-100
    "whitespark_local_seo": { name: "Whitespark (Local SEO Tools)", cost: "Medium (approx. $30-70+/month)", learning_curve: "Medium"}, // R500-R2000 -> ~$30-100
    "moz_local": { name: "Moz Local (Local SEO Management)", cost: "Medium (approx. $100+/month)", learning_curve: "Medium"}, // R500-R2000 -> ~$30-100, but Moz is typically higher end
    "google_structured_data_helper": { name: "Google Structured Data Markup Helper", cost: "Free", learning_curve: "Medium"},
    "schema_org": { name: "Schema.org (Documentation)", cost: "Free", learning_curve: "High"}, // For learning
    "surfer_seo": { name: "SurferSEO (Content Optimization)", cost: "Medium (approx. $49-199+/month)", learning_curve: "Medium"}, // R500-R2000 -> ~$30-100, adjusted for common tiers
    "marketmuse_content_strategy": { name: "MarketMuse (AI Content Planning)", cost: "High (approx. $1500+/month)", learning_curve: "High"}, // R2000+ -> ~$100+, but MarketMuse is very high
    "google_trends": { name: "Google Trends", cost: "Free", learning_curve: "Low"},
    "ubersuggest_seo": { name: "Ubersuggest (SEO Tool)", cost: "Free / Low (Premium option from ~$29/month)", learning_curve: "Medium"},
    "google_nlp_api": { name: "Google Cloud Natural Language API", cost: "Medium (Usage-based)", learning_curve: "High"},
    "textrazor_nlp": { name: "TextRazor (NLP API)", cost: "Free / Medium (Premium option, usage-based)", learning_curve: "High"},
    "wordlift_semantic_seo": { name: "WordLift (AI Semantic SEO)", cost: "Medium (approx. $50-200+/month)", learning_curve: "High"}, // R500-R2000 -> ~$30-100, adjusted
    "frase_io_content_optimization": { name: "Frase.io (AI Content Optimization)", cost: "Medium (approx. $15-100+/month)", learning_curve: "Medium"}, // R500-R2000 -> ~$30-100, adjusted
    "hootsuite_social": { name: "Hootsuite (Social Media Management)", cost: "Medium (approx. $49-200+/month)", learning_curve: "Medium"}, // R500-R2000 -> ~$30-100, adjusted
    "google_alerts": { name: "Google Alerts", cost: "Free", learning_curve: "Low" }
};

const SEO_TYPES_DATA = [
    {
        id: "featured_snippet_seo",
        name: "Featured Snippet SEO",
        description: "Optimizing content to appear as the direct answer box (featured snippet) on Search Engine Results Pages (SERPs). This often involves structuring content with clear questions and concise answers, lists, or tables.",
        estimated_effort_hours_per_month: { diy: "5-10 hours", tool_assisted: "3-7 hours" },
        skill_required: "Intermediate",
        primary_benefits: ["Trust & Authority", "Brand Awareness", "Thought Leadership"],
        relevance_startup: "Medium",
        relevance_growth: "High",
        relevance_scale: "High",
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        dependencies: ["content_seo"],
        tools_recommended: ["Google Search_console", "ahrefs_seo", "semrush_seo", "answer_the_public"],
        recommended_tool_ids: ["Google Search_console", "ahrefs_seo", "semrush_seo", "answer_the_public"],
        zero_click_impact: "High"
    },
    {
        id: "local_seo",
        name: "Local SEO",
        description: "Optimizing your online presence to attract more business from relevant local searches. This primarily involves Google Business Profile optimization, local citations, and managing online reviews.",
        estimated_effort_hours_per_month: { diy: "6-12 hours", tool_assisted: "3-7 hours" },
        skill_required: "Beginner",
        primary_benefits: ["Attract New Clients/Leads", "Brand Awareness", "Customer Engagement"],
        relevance_startup: "High",
        relevance_growth: "High",
        relevance_scale: "Medium",
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        dependencies: [],
        tools_recommended: ["Google Business Profile", "BrightLocal", "Whitespark", "Moz Local"],
        recommended_tool_ids: ["Google Search_console", "brightlocal_local_seo", "whitespark_local_seo", "moz_local"],
        zero_click_impact: "High"
    },
    {
        id: "schema_markup_seo",
        name: "Schema Markup SEO (Structured Data)",
        description: "Adding specific code (schema markup) to your website to help search engines understand the context of your content better, leading to rich snippets and enhanced visibility in SERPs.",
        estimated_effort_hours_per_month: { diy: "4-8 hours", tool_assisted: "2-5 hours" },
        skill_required: "Intermediate",
        primary_benefits: ["Enhanced SERP Visibility", "Trust & Authority", "Improved Click-Through Rates"],
        relevance_startup: "Medium",
        relevance_growth: "High",
        relevance_scale: "High",
        industry_priority: { "healthcare": "High", "legal": "Medium", "financial": "Medium" },
        dependencies: [],
        tools_recommended: ["Google Structured Data Markup Helper", "Schema.org", "RankRanger Schema Markup Generator"],
        recommended_tool_ids: ["google_structured_data_helper", "schema_org", "rank_math_wordpress", "yoast_seo_wordpress"],
        zero_click_impact: "Medium"
    },
    {
        id: "content_seo",
        name: "Content SEO",
        description: "Creating and optimizing high-quality, relevant content that answers user queries and targets specific keywords. This forms the foundation for many other SEO activities.",
        estimated_effort_hours_per_month: { diy: "12-25 hours", tool_assisted: "8-18 hours" }, // Higher base effort
        skill_required: "Beginner",
        primary_benefits: ["Attract New Clients/Leads", "Trust & Authority", "Brand Awareness", "Thought Leadership"],
        relevance_startup: "High",
        relevance_growth: "High",
        relevance_scale: "High",
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        dependencies: [],
        tools_recommended: ["Google Keyword Planner", "SurferSEO", "MarketMuse", "Grammarly"],
        recommended_tool_ids: ["google_keyword_planner", "semrush_seo", "grammarly_writing", "surfer_seo"],
        zero_click_impact: "Medium"
    },
    {
        id: "voice_search_seo",
        name: "Voice Search SEO",
        description: "Optimizing content and website structure to be found through voice assistants like Siri, Alexa, and Google Assistant. Often involves focusing on conversational keywords and FAQ-style content.",
        estimated_effort_hours_per_month: { diy: "3-6 hours", tool_assisted: "2-4 hours" },
        skill_required: "Intermediate",
        primary_benefits: ["Attract New Clients/Leads", "Brand Awareness", "Accessibility"],
        relevance_startup: "Medium",
        relevance_growth: "Medium",
        relevance_scale: "High",
        industry_priority: { "healthcare": "Medium", "legal": "Medium", "financial": "Low" },
        dependencies: ["content_seo", "local_seo", "featured_snippet_seo"],
        tools_recommended: ["AnswerThePublic", "Google Trends", "UberSuggest"],
        recommended_tool_ids: ["answer_the_public", "google_trends", "ubersuggest_seo"],
        zero_click_impact: "High"
    },
    {
        id: "semantic_seo",
        name: "Semantic SEO",
        description: "Focusing on the meaning and intent behind search queries, rather than just keywords. Involves creating comprehensive content around topics and entities, and building relationships between them.",
        estimated_effort_hours_per_month: { diy: "6-12 hours", tool_assisted: "4-9 hours" },
        skill_required: "Advanced",
        primary_benefits: ["Trust & Authority", "Thought Leadership", "Improved Rankings for Broad Topics"],
        relevance_startup: "Low",
        relevance_growth: "Medium",
        relevance_scale: "High",
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        dependencies: ["content_seo"],
        tools_recommended: ["Google NLP API", "TextRazor", "WordLift", "Frase.io"],
        recommended_tool_ids: ["google_nlp_api", "textrazor_nlp", "wordlift_semantic_seo", "frase_io_content_optimization"],
        zero_click_impact: "Medium"
    },
    {
        id: "user_intent_seo",
        name: "User Intent SEO",
        description: "Aligning content with the user's primary goal when they perform a search (informational, navigational, transactional, commercial). This is crucial for satisfying users and ranking well.",
        estimated_effort_hours_per_month: { diy: "4-8 hours", tool_assisted: "2-5 hours" }, // Primarily analysis
        skill_required: "Intermediate",
        primary_benefits: ["Attract New Clients/Leads", "Improved Conversion Rates", "Reduced Bounce Rates"],
        relevance_startup: "High",
        relevance_growth: "High",
        relevance_scale: "High",
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        dependencies: ["content_seo"],
        tools_recommended: ["Google Search Results Analysis", "Ahrefs Content Explorer", "User Surveys/Feedback"],
        recommended_tool_ids: ["Google Search_console", "hotjar_analytics", "ahrefs_seo"],
        zero_click_impact: "Low"
    }
];

const MEDIA_TYPES_DATA = [
    {
        id: "blog_posts",
        name: "Blog Posts / Articles",
        description: "In-depth written content addressing specific user questions, topics, or keywords. Excellent for demonstrating expertise and driving organic traffic.",
        estimated_effort_hours_per_item: { diy: "8-15 hours", tool_assisted: "5-10 hours" },
        skill_required: "Beginner",
        primary_benefits: ["Trust & Authority", "Attract New Clients/Leads", "Thought Leadership"],
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        supports_seo_types: ["content_seo", "featured_snippet_seo", "semantic_seo", "user_intent_seo"],
        recommended_tool_ids: ["grammarly_writing", "semrush_seo", "google_keyword_planner", "canva_design"]
    },
    {
        id: "short_videos",
        name: "Short Explainer Videos (e.g., for Social Media, FAQs)",
        description: "Concise video content (typically 1-3 minutes) explaining a concept, answering a question, or showcasing a service. Good for engagement.",
        estimated_effort_hours_per_item: { diy: "10-20 hours", tool_assisted: "6-12 hours" },
        skill_required: "Intermediate",
        primary_benefits: ["Brand Awareness", "Customer Engagement", "Attract New Clients/Leads"],
        industry_priority: { "healthcare": "Medium", "legal": "Medium", "financial": "Medium" },
        supports_seo_types: ["content_seo"],
        recommended_tool_ids: ["canva_design", "buffer_social"] // Simplified tools for creation/distribution
    },
    {
        id: "case_studies",
        name: "Case Studies / Success Stories",
        description: "Detailed analysis of a specific project, client success, or problem-solving scenario, demonstrating capabilities and results.",
        estimated_effort_hours_per_item: { diy: "15-25 hours", tool_assisted: "10-18 hours" },
        skill_required: "Intermediate",
        primary_benefits: ["Trust & Authority", "Attract New Clients/Leads", "Social Proof"],
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        supports_seo_types: ["content_seo"],
        recommended_tool_ids: ["grammarly_writing", "canva_design"] // Tools for writing and presentation
    }
];

const CHANNELS_DATA = [
    {
        id: "linkedin",
        name: "LinkedIn",
        description: "Professional networking platform ideal for B2B engagement, thought leadership, and connecting with industry peers.",
        estimated_effort_hours_per_month: { diy: "12-20 hours", tool_assisted: "8-15 hours" },
        skill_required: "Intermediate",
        primary_benefits: ["Trust & Authority", "Attract New Clients/Leads", "Networking", "Thought Leadership"],
        industry_priority: { "healthcare": "Medium", "legal": "High", "financial": "High" },
        best_for_media_types: ["blog_posts", "case_studies"],
        recommended_tool_ids: ["linkedin_analytics", "buffer_social", "semrush_seo"] // Semrush for content ideas for LinkedIn
    },
    {
        id: "professional_blog",
        name: "Own Professional Blog (on website)",
        description: "A dedicated section on your website for publishing articles, insights, and updates. Central to content SEO and establishing authority.",
        estimated_effort_hours_per_month: { diy: "6-10 hours", tool_assisted: "4-8 hours" }, // Effort for platform mgmt & promotion
        skill_required: "Beginner",
        primary_benefits: ["Trust & Authority", "Attract New Clients/Leads", "Brand Awareness", "Thought Leadership"],
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        best_for_media_types: ["blog_posts", "case_studies"],
        recommended_tool_ids: ["Google Search_console", "google_analytics", "yoast_seo_wordpress", "rank_math_wordpress"]
    },
    {
        id: "google_business_profile",
        name: "Google Business Profile (GBP)",
        description: "Essential for local SEO, allowing businesses to manage their appearance on Google Search and Maps. Key for local client acquisition.",
        estimated_effort_hours_per_month: { diy: "5-8 hours", tool_assisted: "3-6 hours" },
        skill_required: "Beginner",
        primary_benefits: ["Attract New Clients/Leads", "Local Visibility", "Customer Engagement"],
        industry_priority: { "healthcare": "High", "legal": "High", "financial": "High" },
        best_for_media_types: [],
        recommended_tool_ids: ["Google Search_console", "brightlocal_local_seo", "whitespark_local_seo", "google_alerts"] // Alerts for brand mentions
    }
];

// --- Define MAPPING Objects ---
const PHASE_MAPPING = {
    "startup": "relevance_startup",
    "growth": "relevance_growth",
    "scale": "relevance_scale"
};

const GOAL_MAPPING = {
    // Values from q3-goals checkboxes map to benefit strings used in the data objects
    "Trust & Authority": "Trust & Authority",
    "Brand Awareness": "Brand Awareness",
    "Attract New Clients/Leads": "Attract New Clients/Leads"
    // Add "Thought Leadership", "Customer Engagement" if they become selectable goals
};

const RESOURCE_MAPPING = {
    // User input values from q4-time and q5-budget
    // Map to effort requirement categories or score modifiers
    // This is a simplified example; can be more granular
    time: {
        "low": "low_effort_compatible",       // <10 hours
        "medium": "medium_effort_compatible",   // 10-20 hours
        "high": "high_effort_compatible",     // 20-40 hours
        "veryhigh": "very_high_effort_compatible" // 40+ hours
    },
    budget: {
        "none": "skill_beginner_preferred",  // ~$0 / DIY focus might imply preference for beginner-friendly, low-cost tools
        "low": "skill_beginner_intermediate_ok",    // <$100
        "medium": "skill_intermediate_advanced_ok", // $100-$500
        "high": "skill_advanced_ok"           // $500+
    },
    // We can also map skill_required from data to a numeric value for comparison
    skill_numeric: {
        "Beginner": 1,
        "Intermediate": 2,
        "Advanced": 3
    }
};
