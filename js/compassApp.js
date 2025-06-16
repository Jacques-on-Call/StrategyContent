// js/compassApp.js

// Function to download the blueprint content as an HTML file
function downloadBlueprint() {
    const blueprintContentDiv = document.getElementById('blueprint-content');
    if (!blueprintContentDiv) {
        console.error("Blueprint content div not found for download.");
        alert("Sorry, there was an error generating the download file.");
        return;
    }

    // Clone the node to modify it for download without affecting the displayed version.
    const contentToDownload = blueprintContentDiv.cloneNode(true);

    // Remove the download button from the cloned content.
    const downloadButtonInClone = contentToDownload.querySelector('#download-blueprint-btn');
    if (downloadButtonInClone) {
        downloadButtonInClone.parentNode.removeChild(downloadButtonInClone);
    }

    // Get the HTML content from the cloned and modified div.
    const htmlContent = contentToDownload.innerHTML;

    // Add a basic HTML structure and some inline CSS for the standalone file.
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Impact Blueprint</title>
    <style>
        body { font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; margin: 20px; padding: 15px; line-height: 1.6; background-color: #f4f7f6; color: #333; }
        .strategies-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .strategy-card { border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.05); transition: box-shadow 0.3s ease; }
        .strategy-card:hover { box-shadow: 0 6px 12px rgba(0,0,0,0.1); }
        .strategy-card h2 { font-size: 1.8em; color: #003971; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #003971; padding-bottom: 10px;}
        .strategy-card h3 { font-size: 1.4em; color: #00509e; margin-top: 0; margin-bottom: 10px; }
        .strategy-card h4 { font-size: 1.1em; color: #006300; margin-top: 15px; margin-bottom: 8px; }
        .why-it-matters { font-style: italic; margin-bottom: 15px; color: #454545; background-color: #e6f3ff; padding: 10px; border-left: 4px solid #00509e; border-radius: 4px;}
        .effort-skill-row { display: flex; justify-content: space-between; flex-wrap: wrap; gap:10px; margin:15px 0; padding: 10px; background-color: #f9f9f9; border-radius: 6px; font-size: 0.95em; }
        .effort-skill-row p { margin: 5px 0; }
        .recommended-tools { margin-top: 15px; font-size: 0.95em; }
        .recommended-tools ul { list-style-position: outside; padding-left: 20px; margin:0; }
        .recommended-tools li { margin-bottom: 6px; }
        /* Ensure the main H2 (blueprint title) from the original div is styled */
        #blueprint-content > div > h2 { text-align: center; font-size: 2em; color: #003971; margin-bottom: 10px; }
        #blueprint-content > div > p { text-align: center; font-size: 1.1em; margin-bottom: 20px; color: #333; }
        #blueprint-content > div > h3 { text-align: center; font-size: 1.5em; color: #00509e; margin-bottom: 15px; }
        /* Styles for key actions list */
        .strategy-card ul { list-style-type: disc; padding-left: 20px; margin-top: 5px;}
        .strategy-card ul li { margin-bottom: 8px; }

    </style>
</head>
<body>
    <!-- The h1 here is for the downloaded file's own title, distinct from quiz page titles -->
    <header style="text-align:center; margin-bottom:30px;">
      <h1 style="color:#003971; font-size:2.5em;">Your Digital Impact Blueprint</h1>
    </header>
    ${htmlContent}
</body>
</html>`;

        const filename = 'Digital_Impact_Blueprint.html';
        const blob = new Blob([fullHtml], { type: 'text/html;charset=UTF-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    if (!appContainer) {
        console.error("Compass App: app-container not found. Exiting.");
        return;
    }
    const screens = appContainer.querySelectorAll('.app-screen');

    // Navigation Buttons
    const startCompassBtn = document.getElementById('start-compass-btn');
    const nextButtons = appContainer.querySelectorAll('.next-btn');
    const backButtons = appContainer.querySelectorAll('.back-btn');
    const generateCompassBtn = document.getElementById('generate-compass-btn');
    const startOverBtn = document.getElementById('start-over-btn');

    // Store user selections
    const userSelections = {
        industry: null,
        journey: null,
        goals: [],
        time: null,
        budget: null,
        format: null
    };

    let currentScreenIndex = 0; // 0: opt-in, 1: q1, 2: q2, etc.

    // Function to show a specific screen
    function showScreen(index) {
        screens.forEach((screen, i) => {
            screen.classList.toggle('active', i === index);
            screen.classList.toggle('hidden', i !== index);
        });
        currentScreenIndex = index;
    }

    // Initialize by showing the opt-in screen (screen 0)
    if (screens.length > 0) {
        showScreen(0);
    }


    // Event Listeners for navigation
    if (startCompassBtn) {
        startCompassBtn.addEventListener('click', () => {
            showScreen(1); // Go to Q1
        });
    }


    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentScreenIndex >= screens.length -1) return;
            const currentScreenElement = screens[currentScreenIndex];
            if (!currentScreenElement) return;
            const currentScreenId = currentScreenElement.id;


            // Save user selection and validate before moving next
            let isValid = true;
            if (currentScreenId === 'q1-industry') {
                userSelections.industry = document.querySelector('input[name="industry"]:checked')?.value;
                if (!userSelections.industry) { alert('Please select your industry to continue.'); isValid = false; }
            } else if (currentScreenId === 'q2-journey') {
                userSelections.journey = document.querySelector('input[name="journey"]:checked')?.value;
                if (!userSelections.journey) { alert('Please select your business stage to continue.'); isValid = false; }
            } else if (currentScreenId === 'q3-goals') {
                userSelections.goals = Array.from(document.querySelectorAll('input[name="goals"]:checked')).map(cb => cb.value);
                if (userSelections.goals.length === 0) { alert('Please select at least one primary goal to continue.'); isValid = false; }
                if (userSelections.goals.length > 2) { alert('You can select up to 2 goals. Please deselect one.'); isValid = false; }
            } else if (currentScreenId === 'q4-time') {
                userSelections.time = document.querySelector('input[name="time"]:checked')?.value;
                if (!userSelections.time) { alert('Please select your monthly time dedication to continue.'); isValid = false; }
            } else if (currentScreenId === 'q5-budget') {
                userSelections.budget = document.querySelector('input[name="budget"]:checked')?.value;
                if (!userSelections.budget) { alert('Please select your approximate monthly budget to continue.'); isValid = false; }
            }

            if (isValid) {
                showScreen(currentScreenIndex + 1);
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'start-over-btn') {
                resetQuiz();
                showScreen(0); // Go back to opt-in screen
            } else if (currentScreenIndex > 0) {
                showScreen(currentScreenIndex - 1);
            }
        });
    });

    if (generateCompassBtn) {
        generateCompassBtn.addEventListener('click', () => {
            const currentScreenElement = screens[currentScreenIndex];
             if (!currentScreenElement) return;
            const currentScreenId = currentScreenElement.id;

            let isValid = true;
            if (currentScreenId === 'q6-format') {
                userSelections.format = document.querySelector('input[name="format"]:checked')?.value;
                if (!userSelections.format) { alert('Please select a preferred content format to generate your compass.'); isValid = false; }
            }

            if (isValid) {
                generateCompassBlueprint(userSelections);
                showScreen(screens.length - 1); // Show results screen (last screen)
            }
        });
    }


    // Function to generate the compass blueprint with recommendations
    function generateCompassBlueprint(selections) {
        const blueprintContentDiv = document.getElementById('blueprint-content');
        if (!blueprintContentDiv) {
            console.error("Blueprint content div not found!");
            return;
        }
        blueprintContentDiv.innerHTML = '';

        // Add Main Title and Summary
        let summaryHtml = `
            <h2>Your Personalized Compass Blueprint</h2>
            <p>Based on your journey as a <strong>${selections.industry || "N/A"}</strong> business, your goal to <strong>${selections.goals.join(' and ') || "N/A"}</strong>, and considering your available time ('${selections.time || "Not specified"}') and budget ('${selections.budget || "Not specified"}'), here's a prioritized roadmap designed to maximize your impact.</p>
            <h3>Your Top Recommended Strategies:</h3>
        `;
        const summaryDiv = document.createElement('div');
        summaryDiv.innerHTML = summaryHtml;
        blueprintContentDiv.appendChild(summaryDiv);

        const strategiesContainer = document.createElement('div');
        strategiesContainer.className = 'strategies-container';

        const local_SEO_TYPES_DATA = typeof SEO_TYPES_DATA !== 'undefined' ? SEO_TYPES_DATA : [];
        const local_MEDIA_TYPES_DATA = typeof MEDIA_TYPES_DATA !== 'undefined' ? MEDIA_TYPES_DATA : [];
        const local_CHANNELS_DATA = typeof CHANNELS_DATA !== 'undefined' ? CHANNELS_DATA : [];
        const local_TOOLS_CATALOG = typeof TOOLS_CATALOG !== 'undefined' ? TOOLS_CATALOG : {};
        const local_PHASE_MAPPING = typeof PHASE_MAPPING !== 'undefined' ? PHASE_MAPPING : {};


        const relevantSeoTypes = local_SEO_TYPES_DATA.filter(seo => {
            if (!selections.industry || !selections.journey) return false;
            const industryPriority = seo.industry_priority[selections.industry];
            const journeyRelevanceKey = local_PHASE_MAPPING[selections.journey];
            if (!journeyRelevanceKey) return false;
            const journeyRelevance = seo[journeyRelevanceKey];
            return (industryPriority === "High" || industryPriority === "Medium") &&
                   (journeyRelevance === "High" || journeyRelevance === "Medium");
        });

        const relevantMediaTypes = local_MEDIA_TYPES_DATA.filter(media => {
            if (!selections.format || !selections.goals) return false;
            return media.id === selections.format || media.primary_benefits.some(pb => selections.goals.includes(pb));
        });

        const relevantChannels = local_CHANNELS_DATA.filter(channel => {
            if (!selections.industry || !selections.format) return false;
            const industryPriority = channel.industry_priority[selections.industry];
            const supportsPreferredFormat = channel.best_for_media_types.includes(selections.format);
            return industryPriority === "High" || supportsPreferredFormat;
        });

        let recommendedStrategies = [];

        if (relevantSeoTypes.length > 0) {
            recommendedStrategies.push({ id: relevantSeoTypes[0].id, type: 'seo', name: relevantSeoTypes[0].name });
            if (relevantSeoTypes.length > 1) {
                recommendedStrategies.push({ id: relevantSeoTypes[1].id, type: 'seo', name: relevantSeoTypes[1].name });
            }
        }
        if (relevantMediaTypes.length > 0) {
            recommendedStrategies.push({ id: relevantMediaTypes[0].id, type: 'media', name: relevantMediaTypes[0].name });
        }
        if (relevantChannels.length > 0) {
            recommendedStrategies.push({ id: relevantChannels[0].id, type: 'channel', name: relevantChannels[0].name });
        }

        recommendedStrategies = recommendedStrategies.slice(0, 4);

        if (recommendedStrategies.length === 0) {
            console.warn("Filters yielded no specific strategies, using general recommendations.");
            recommendedStrategies = [
                {id: 'content_seo', type: 'seo', name: 'Content SEO'},
                {id: 'blog_posts', type: 'media', name: 'Blog Posts / Articles'},
                {id: 'linkedin', type: 'channel', name: 'LinkedIn'}
            ];
        }

        recommendedStrategies.forEach(strategy => {
            let strategyData;
            const dataType = strategy.type;

            if (dataType === 'seo') {
                strategyData = local_SEO_TYPES_DATA.find(s => s.id === strategy.id);
            } else if (dataType === 'media') {
                strategyData = local_MEDIA_TYPES_DATA.find(s => s.id === strategy.id);
            } else if (dataType === 'channel') {
                strategyData = local_CHANNELS_DATA.find(s => s.id === strategy.id);
            }

            if (!strategyData) {
                console.warn(`Strategy data not found for ID: ${strategy.id} of type ${dataType}`);
                return;
            }

            let toolsHtml = '';
            if (strategyData.recommended_tool_ids && strategyData.recommended_tool_ids.length > 0) {
                toolsHtml += '<div class="recommended-tools">';
                toolsHtml += '<h4>Tools to Help You:</h4><ul>';
                strategyData.recommended_tool_ids.forEach(toolId => {
                    const tool = local_TOOLS_CATALOG[toolId];
                    if (tool) {
                        toolsHtml += `<li>${tool.name} (Cost: ${tool.cost}, Learning: ${tool.learning_curve})</li>`;
                    } else {
                        console.warn(`Tool data not found in TOOLS_CATALOG for ID: ${toolId}`);
                    }
                });
                toolsHtml += '</ul></div>';
            }

            let effortText = 'N/A';
            const effortData = (dataType === 'media') ? strategyData.estimated_effort_hours_per_item : strategyData.estimated_effort_hours_per_month;
            if (effortData && effortData.diy) {
                effortText = effortData.diy;
            } else if (effortData && typeof effortData === 'string') {
                effortText = effortData;
            }


            let keyActionsHtml = '<ul>';
            if (strategyData.description) {
                const actions = strategyData.description.split('. ').filter(s => s.trim().length > 0);
                const maxActions = 3;
                actions.slice(0, maxActions).forEach(action => keyActionsHtml += `<li>${action.trim()}.</li>`);
                if (actions.length === 0 && strategyData.description.length > 0) {
                     keyActionsHtml += `<li>${strategyData.description}</li>`;
                } else if (actions.length === 0) {
                    keyActionsHtml += `<li>Implement ${strategyData.name} by focusing on its core objectives.</li>`;
                }
            } else {
                keyActionsHtml += `<li>Key action 1 for ${strategyData.name}.</li><li>Key action 2 for ${strategyData.name}.</li>`;
            }
            keyActionsHtml += '</ul>';

            const whyItMattersText = `This strategy is pivotal for a ${selections.industry} business like yours, especially when aiming for ${selections.goals.join(' and ')}. ${strategyData.name} will help you build authority and connect with your target audience effectively.`;

            const card = document.createElement('div');
            card.className = 'strategy-card';
            card.innerHTML = `
                <h3>${strategyData.name}</h3>
                <p class="why-it-matters"><strong>Why This Matters for You:</strong> ${whyItMattersText}</p>
                <div class="effort-skill-row">
                    <p><strong>Time Commitment (DIY):</strong> ${effortText}</p>
                    <p><strong>Skill Level:</strong> ${strategyData.skill_required}</p>
                </div>
                <h4>Key Actions:</h4>
                ${keyActionsHtml}
                ${toolsHtml}
            `;
            strategiesContainer.appendChild(card);
        });

        blueprintContentDiv.appendChild(strategiesContainer);

        const downloadButton = document.createElement('button');
        downloadButton.id = 'download-blueprint-btn';
        downloadButton.className = 'btn compass-download-btn';
        downloadButton.textContent = 'Download My Blueprint (HTML)';
        blueprintContentDiv.appendChild(downloadButton);
        downloadButton.addEventListener('click', downloadBlueprint);
    }


    function resetQuiz() {
        document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
        document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);

        userSelections.industry = null;
        userSelections.journey = null;
        userSelections.goals = [];
        userSelections.time = null;
        userSelections.budget = null;
        userSelections.format = null;

        const blueprintContentDiv = document.getElementById('blueprint-content');
        if (blueprintContentDiv) {
            blueprintContentDiv.innerHTML = '';
        }
    }

    if (screens.length === 0) {
        console.error("Compass App: No screens found (elements with class 'app-screen').");
    }
    if (!startCompassBtn) console.warn("Compass App: Start button not found.");
    if (!generateCompassBtn) console.warn("Compass App: Generate button not found.");
    if (!startOverBtn && backButtons.length > 0 && (!backButtons[backButtons.length-1] || backButtons[backButtons.length-1].id !== 'start-over-btn')) {
        console.warn("Compass App: Start Over button ('start-over-btn') might be missing or not correctly identified.");
    }
});
