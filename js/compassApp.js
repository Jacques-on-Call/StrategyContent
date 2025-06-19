// js/compassApp.js

// Function to download the blueprint content as an HTML file
function downloadBlueprint(blueprintHtml, brandName, website, contactEmail, cta) {
    const filename = 'Digital_Impact_Blueprint.html';

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Digital Impact Blueprint - ${brandName}</title>
    <style>
        body { font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; margin: 20px; padding: 15px; line-height: 1.6; background-color: #f4f7f6; color: #333; }
        .strategies-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .strategy-card { border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.05); transition: box-shadow 0.3s ease; }
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
    <header style="text-align:center; margin-bottom:30px;">
      <h1 style="color:#003971; font-size:2.5em;">Your Digital Impact Blueprint</h1>
      <p style="font-size:1.1em; color:#555;">Powered by ${brandName}</p>
    </header>
    ${blueprintHtml}
    <div style="text-align: center; margin-top: 40px; padding: 20px; background-color: #e6f3ff; border-radius: 10px; border: 1px solid #00509e;">
        <h3 style="color: #003971; font-size: 1.6em; margin-bottom: 15px;">Your Partner in Digital Impact: ${brandName}</h3>
        <p style="font-size: 1.1em; color: #333; margin-bottom: 20px;">${cta}</p>
        <p style="font-size: 1em; margin-bottom: 10px;">
            <a href="${website}" style="display: inline-block; background-color: #00509e; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">Visit Our Website</a>
            <a href="mailto:${contactEmail}" style="display: inline-block; background-color: #006300; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; margin-left: 15px;">Email Us</a>
        </p>
        <p style="font-size: 0.9em; color: #555;">&copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
    </div>
</body>
</html>
`;

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
    // const actionsBlueprintBtn = document.getElementById('actions-blueprint-btn'); // This ID is removed from HTML

    // Store user selections (globally within DOMContentLoaded scope)
    const userSelections = {
        industry: null,
        journey: null,
        goals: [],
        time: null,
        budget: null,
        format: null
    };

    // Branding details (globally within DOMContentLoaded scope, or get from a config)
    const yourBrandName = "Strategy Content Agency";
    const yourWebsite = "https://strategycontent.agency";
    const yourContactEmail = "jacques@strategycontent.agency";
    const yourCTA = "Ready to turn this blueprint into action? Let's connect for a personalized strategy session!";
    const yourLinkedIn = "https://www.linkedin.com/in/jacquesdamhuis/";


    let currentScreenIndex = 0;

    function showScreen(index) {
        screens.forEach((screen, i) => {
            screen.classList.toggle('active', i === index);
            screen.classList.toggle('hidden', i !== index);
        });
        currentScreenIndex = index;
    }

    if (screens.length > 0) {
        showScreen(0);
    }

    if (startCompassBtn) {
        startCompassBtn.addEventListener('click', () => {
            showScreen(1);
        });
    }

    nextButtons.forEach(button => {
        // Exclude special buttons that have their own dedicated handlers
        if (button.id === 'generate-compass-btn' /* || button.id === 'actions-blueprint-btn' - this ID is removed */) {
            return;
        }
        button.addEventListener('click', () => {
            const currentScreenElement = screens[currentScreenIndex];
            if (!currentScreenElement) return;
            const currentScreenId = currentScreenElement.id;

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
                if (currentScreenIndex < screens.length - 1) {
                    showScreen(currentScreenIndex + 1);
                }
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
                if (!userSelections.format) { alert('Please select a preferred content format to continue.'); isValid = false; }
            } else {
                console.warn("Generate button clicked on unexpected screen: " + currentScreenId);
            }

            if (isValid) {
                generateCompassBlueprint(userSelections);
                showScreen(screens.length - 1);
            }
        });
    }

    backButtons.forEach(button => {
        if (button.id === 'start-over-btn') {
            return;
        }
        button.addEventListener('click', () => {
            if (currentScreenIndex > 0) {
                showScreen(currentScreenIndex - 1);
            }
        });
    });

    if (startOverBtn) {
        startOverBtn.addEventListener('click', () => {
            resetQuiz();
            showScreen(0);
        });
    }

    // New Event Listener for #email-blueprint-form
    const emailBlueprintForm = document.getElementById('email-blueprint-form');
    if (emailBlueprintForm) {
        emailBlueprintForm.addEventListener('submit', handleEmailBlueprint);
    } else {
        console.warn("Compass App: Email blueprint form (#email-blueprint-form) not found.");
    }

    async function handleEmailBlueprint(event) {
        event.preventDefault();

        const userEmailInput = document.getElementById('user-email-input');
        const emailMessage = document.getElementById('email-message');
        const sendBtn = document.getElementById('send-blueprint-email-btn');
        const blueprintContentDiv = document.getElementById('blueprint-content');

        if (!userEmailInput || !emailMessage || !sendBtn || !blueprintContentDiv) {
            console.error('Email form elements or blueprint content not found.');
            if (emailMessage) {
                emailMessage.textContent = 'An unexpected error occurred. Please refresh and try again.';
                emailMessage.className = 'error'; // Ensure class is set for styling
                emailMessage.classList.remove('hidden');
            }
            return;
        }

        const userEmail = userEmailInput.value.trim();
        const blueprintHtml = blueprintContentDiv.innerHTML;

        if (!userEmail || !blueprintHtml) {
            emailMessage.textContent = 'Please enter a valid email address. If the blueprint is not visible, please generate it first.';
            emailMessage.className = 'error';
            emailMessage.classList.remove('hidden');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(userEmail)) {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.className = 'error';
            emailMessage.classList.remove('hidden');
            return;
        }

        emailMessage.textContent = 'Sending...';
        emailMessage.className = '';
        emailMessage.classList.remove('hidden');
        sendBtn.disabled = true;

        try {
            const payload = {
                email: userEmail,
                blueprintHtml: blueprintHtml,
            };
            if (typeof userSelections !== 'undefined') {
                payload.userSelections = userSelections; // userSelections is globally available
            }
            // Add brand_details if needed by the backend, similar to how it was done for download
            // For this example, assuming PHP script might use it or it's part of blueprintHtml already
            payload.brand_details = {
                brandName: yourBrandName,
                website: yourWebsite,
                contactEmail: yourContactEmail,
                cta: yourCTA,
                linkedIn: yourLinkedIn
            };


            const response = await fetch('send_blueprint_email.php', { // Path to your PHP script
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                emailMessage.textContent = result.message || 'Blueprint successfully sent to your inbox!';
                emailMessage.className = 'success';
                userEmailInput.value = '';
            } else {
                emailMessage.textContent = result.message || 'Failed to send blueprint. Please try again.';
                emailMessage.className = 'error';
            }
        } catch (error) {
            console.error('Email send error:', error);
            emailMessage.textContent = 'An unexpected error occurred. Please try again later.';
            emailMessage.className = 'error';
        } finally {
            emailMessage.classList.remove('hidden');
            sendBtn.disabled = false;
        }
    }


    function generateCompassBlueprint(selections) {
        const blueprintContentDiv = document.getElementById('blueprint-content');
        if (!blueprintContentDiv) {
            console.error("Blueprint content div not found!");
            return;
        }
        blueprintContentDiv.innerHTML = '';

        let summaryHtml = `
            <div class="blueprint-header" style="text-align: center; margin-bottom: 30px;">
                <img src="../img/logo.webp" alt="${yourBrandName} Logo" style="max-width: 150px; margin-bottom: 20px; border-radius: 8px;"> <h2>Your Personalized Digital Impact Blueprint</h2>
                <p style="font-size: 1.1em; color: #555;">Powered by <strong>${yourBrandName}</strong></p>
                <p>Based on your journey as a <strong>${(selections.industry || "N/A").replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</strong> business, your goal to <strong>${(selections.goals.length > 0 ? selections.goals.join(' and ') : "achieve your objectives")}</strong>, and considering your available time ('${selections.time || "Not specified"}') and budget ('${selections.budget || "Not specified"}'), here's a prioritized roadmap designed to maximize your impact.</p>
                <h3>Your Top Recommended Strategies:</h3>
            </div>
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
            if (!selections.format || !selections.goals || selections.goals.length === 0) return false;
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
        if (relevantChannels.length > 0 && relevantChannels[0]) {
             recommendedStrategies.push({ id: relevantChannels[0].id, type: 'channel', name: relevantChannels[0].name });
        }

        recommendedStrategies = recommendedStrategies.slice(0, 4);

        if (recommendedStrategies.length === 0) {
            console.warn("Filters yielded no specific strategies, using general recommendations.");
            recommendedStrategies = [
                local_SEO_TYPES_DATA.find(s => s.id === 'content_seo') ? {id: 'content_seo', type: 'seo', name: local_SEO_TYPES_DATA.find(s => s.id === 'content_seo').name} : {id: 'error', type:'error', name:'Data Error'},
                local_MEDIA_TYPES_DATA.find(s => s.id === 'blog_posts') ? {id: 'blog_posts', type: 'media', name: local_MEDIA_TYPES_DATA.find(s => s.id === 'blog_posts').name} : {id: 'error', type:'error', name:'Data Error'},
                local_CHANNELS_DATA.find(s => s.id === 'linkedin') ? {id: 'linkedin', type: 'channel', name: local_CHANNELS_DATA.find(s => s.id === 'linkedin').name} : {id: 'error', type:'error', name:'Data Error'}
            ].filter(s => s.id !== 'error');
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
                console.warn(\`Strategy data not found for ID: \${strategy.id} of type \${dataType}\`);
                return;
            }

            let toolsHtml = '';
            if (strategyData.recommended_tool_ids && strategyData.recommended_tool_ids.length > 0) {
                toolsHtml += '<div class="recommended-tools">';
                toolsHtml += '<h4>Tools to Help You:</h4><ul>';
                strategyData.recommended_tool_ids.forEach(toolId => {
                    const tool = local_TOOLS_CATALOG[toolId];
                    if (tool) {
                        toolsHtml += \`<li>\${tool.name} (Cost: \${tool.cost}, Learning: \${tool.learning_curve})</li>\`;
                    } else {
                        console.warn(\`Tool data not found in TOOLS_CATALOG for ID: \${toolId}\`);
                    }
                });
                toolsHtml += '</ul></div>';
            }

            let effortText = 'Not specified';
            const effortDataSource = (dataType === 'media') ? strategyData.estimated_effort_hours_per_item : strategyData.estimated_effort_hours_per_month;
            if (effortDataSource && typeof effortDataSource.diy === 'string') {
                effortText = effortDataSource.diy;
            } else if (effortDataSource && typeof effortDataSource === 'string') {
                effortText = effortDataSource;
            }

            let keyActionsHtml = '<ul>';
            const descriptionForActions = strategyData.description || \`Implement \${strategyData.name} by focusing on its core objectives.\`;
            const actions = descriptionForActions.split('. ').filter(s => s.trim().length > 0);
            const maxActions = 3;
            actions.slice(0, maxActions).forEach(action => keyActionsHtml += \`<li>\${action.trim()}.</li>\`);
            if (actions.length === 0 && descriptionForActions.length > 0) {
                keyActionsHtml += \`<li>\${descriptionForActions}</li>\`;
            } else if (actions.length === 0) {
                 keyActionsHtml += \`<li>Implement \${strategyData.name} by focusing on its core objectives.</li>\`;
            }
            keyActionsHtml += '</ul>';

            let primaryGoalsText = selections.goals.length > 0 ? selections.goals.join(' and ') : 'your digital objectives';
            let whyItMattersDefault = \`build authority and connect with your target audience effectively.\`;
            if(strategyData.primary_benefits && strategyData.primary_benefits.length > 0){
                whyItMattersDefault = \`achieve benefits like: \${strategyData.primary_benefits.join(', ')}.\`
            }
            const whyItMattersText = \`This strategy is pivotal for a business in the <strong>\${(selections.industry || 'your').replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</strong> sector, especially when aiming to <strong>\${primaryGoalsText}</strong>. Focusing on <strong>\${strategyData.name}</strong> will help you \${strategyData.why_it_matters || whyItMattersDefault}\`;

            const card = document.createElement('div');
            card.className = 'strategy-card';
            card.innerHTML = \`
                <h3>\${strategyData.name}</h3>
                <p class="why-it-matters"><strong>Why This Matters for You:</strong> \${whyItMattersText}</p>
                <div class="effort-skill-row">
                    <p><strong>Time Commitment (DIY):</strong> \${effortText}</p>
                    <p><strong>Skill Level:</strong> \${strategyData.skill_required || 'Not specified'}</p>
                </div>
                <h4>Key Actions:</h4>
                \${keyActionsHtml}
                \${toolsHtml}
            \`;
            strategiesContainer.appendChild(card);
        });

        blueprintContentDiv.appendChild(strategiesContainer);

        // The direct download button is added here, inside blueprintContentDiv
        const directDownloadButton = document.createElement('button');
        directDownloadButton.id = 'download-blueprint-btn';
        directDownloadButton.className = 'btn compass-download-btn';
        directDownloadButton.textContent = 'Download Blueprint (HTML)';
        directDownloadButton.addEventListener('click', () => {
            // Prepare HTML for direct download (remove on-screen CTAs etc.)
            const contentToDownload = blueprintContentDiv.cloneNode(true);
            const btnToRemove = contentToDownload.querySelector('#download-blueprint-btn');
            if(btnToRemove) btnToRemove.parentNode.removeChild(btnToRemove);
            const emailFormSection = contentToDownload.querySelector('.email-blueprint-section');
            if(emailFormSection) emailFormSection.parentNode.removeChild(emailFormSection);

            const coreHtml = contentToDownload.innerHTML;
            downloadBlueprint(coreHtml, yourBrandName, yourWebsite, yourContactEmail, yourCTA);
        });
        blueprintContentDiv.appendChild(directDownloadButton);


        // The on-screen specific CTA and info about email form is now part of HTML, not added here.
        // However, if you want to dynamically add other content *after* the form, it would go here.
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
        const emailMsg = document.getElementById('email-message');
        if(emailMsg) {
            emailMsg.classList.add('hidden');
            emailMsg.textContent = '';
        }
        const emailInput = document.getElementById('user-email-input');
        if(emailInput) emailInput.value = '';

    }

    if (screens.length === 0) {
        console.error("Compass App: No screens found (elements with class 'app-screen').");
    }
    if (!startCompassBtn) console.warn("Compass App: Start button not found.");
    if (!generateCompassBtn) console.warn("Compass App: Generate button not found.");
    // if (!actionsBlueprintBtn) console.warn("Compass App: Actions Blueprint button ('actions-blueprint-btn') not found."); // This button is removed
    if (!startOverBtn && backButtons.length > 0 && (!backButtons[backButtons.length-1] || backButtons[backButtons.length-1].id !== 'start-over-btn')) {
        console.warn("Compass App: Start Over button ('start-over-btn') might be missing or not correctly identified.");
    }
});
