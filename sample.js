// Mock data for demo
const mockProjects = {
    'facebook/react': {
        name: 'React',
        description: 'A JavaScript library for building user interfaces with V DOM',
        stars: 219000,
        forks: 44800,
        functions: [
            {
                name: 'React.createElement()',
                description: 'Creates a new React element. Elements are the smallest building blocks of React apps.',
                params: ['type', 'props', '...children'],
                returns: 'React Element',
                example: 'React.createElement("div", null, "Hello");'
            },
            {
                name: 'useState()',
                description: 'Hook that lets you add state to functional components',
                params: ['initialState'],
                returns: '[state, setState]',
                example: 'const [count, setCount] = useState(0);'
            },
            {
                name: 'useEffect()',
                description: 'Hook that lets you perform side effects in functional components',
                params: ['callback', 'dependencies'],
                returns: 'undefined',
                example: 'useEffect(() => { document.title = count; }, [count]);'
            },
            {
                name: 'useContext()',
                description: 'Hook for consuming context values without nesting',
                params: ['Context'],
                returns: 'context value',
                example: 'const user = useContext(UserContext);'
            },
            {
                name: 'useReducer()',
                description: 'Hook for managing complex state logic with actions',
                params: ['reducer', 'initialState'],
                returns: '[state, dispatch]',
                example: 'const [state, dispatch] = useReducer(reducer, initialState);'
            }
        ]
    },
    'torvalds/linux': {
        name: 'Linux Kernel',
        description: 'The Linux kernel implementation - core of Linux operating system',
        stars: 173000,
        forks: 56800,
        functions: [
            {
                name: 'schedule()',
                description: 'Main CPU scheduler function that selects next process to run',
                params: [],
                returns: 'void',
                example: 'schedule();'
            },
            {
                name: 'do_page_fault()',
                description: 'Handles page fault interrupts and manages memory paging',
                params: ['regs', 'fault_code'],
                returns: 'void',
                example: 'do_page_fault(regs, fault_code);'
            },
            {
                name: 'do_fork()',
                description: 'Creates a new process with copy-on-write memory',
                params: ['clone_flags', 'stack_start', 'stack_size'],
                returns: 'pid_t (process ID)',
                example: 'pid_t pid = do_fork(CLONE_VM, stack, size);'
            }
        ]
    },
    'microsoft/vscode': {
        name: 'Visual Studio Code',
        description: 'Lightweight and powerful source code editor with rich ecosystem',
        stars: 163000,
        forks: 28000,
        functions: [
            {
                name: 'provideCodeActions()',
                description: 'Provides code actions (quick fixes and refactorings)',
                params: ['document', 'range', 'context'],
                returns: 'Command[]',
                example: 'provideCodeActions(doc, range, context);'
            },
            {
                name: 'registerCommand()',
                description: 'Registers a new command in VS Code',
                params: ['command', 'callback'],
                returns: 'Disposable',
                example: 'vscode.commands.registerCommand("ext.cmd", () => {});'
            },
            {
                name: 'showInputBox()',
                description: 'Shows an input dialog for user to enter text',
                params: ['options'],
                returns: 'Thenable<string>',
                example: 'const result = await vscode.window.showInputBox();'
            }
        ]
    }
};

// DOM Elements
const githubLinkInput = document.getElementById('github-link');
const generateBtn = document.getElementById('generate-btn');
const loadingState = document.getElementById('loading-state');
const resultsSection = document.getElementById('results-section');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const functionsList = document.getElementById('functions-list');
const functionGraphCanvas = document.getElementById('function-graph-canvas');
const featureFlowList = document.getElementById('feature-flow-list');
const copyAllBtn = document.getElementById('copy-all-btn');
const exportBtn = document.getElementById('export-btn');
const toastNotification = document.getElementById('toast-notification');

// Event Listeners
generateBtn.addEventListener('click', handleGenerateDocumentation);
githubLinkInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGenerateDocumentation();
});
copyAllBtn.addEventListener('click', handleCopyAll);
exportBtn.addEventListener('click', handleExport);

// Main Functions
async function handleGenerateDocumentation() {
    const link = githubLinkInput.value.trim();

    const fallbackOwner = 'sample';
    const fallbackRepo = 'project';
    const repoMatch = link.match(/github\.com[/:]+([^/\s]+)\/([^/\s]+?)(?:\.git)?\/?$/i);
    const owner = repoMatch?.[1] || fallbackOwner;
    const repo = repoMatch?.[2] || fallbackRepo;
    const repoKey = `${owner}/${repo}`.toLowerCase();
    
    // Show loading state
    showLoading();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Always generate sample documentation without validation.
    const projectData = mockProjects[repoKey] || generateMockData(owner, repo);
    displayResults(projectData);
    showToast(`✅ Documentation created for ${repoKey}`, 'success');
}

function generateMockData(owner, repo) {
    // Generate random mock data for any repository
    const adjectives = ['Fast', 'Simple', 'Powerful', 'Modern', 'Lightweight'];
    const types = ['library', 'framework', 'tool', 'engine', 'system'];
    
    const randomFunctions = [
        {
            name: `init()`,
            description: `Initialize the ${repo} ${types[Math.floor(Math.random() * types.length)]}`,
            params: ['options'],
            returns: 'void',
            example: `${repo}.init({ verbose: true });`
        },
        {
            name: `process()`,
            description: `Process input data and return results`,
            params: ['data', 'config'],
            returns: 'Promise<Result>',
            example: `const result = await ${repo}.process(data);`
        },
        {
            name: `render()`,
            description: `Render or output the processed data`,
            params: ['output', 'format'],
            returns: 'void',
            example: `${repo}.render(result, 'json');`
        }
    ];

    return {
        name: repo.charAt(0).toUpperCase() + repo.slice(1),
        description: `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${types[Math.floor(Math.random() * types.length)]} for ${owner}/${repo}`,
        stars: Math.floor(Math.random() * 100000) + 1000,
        forks: Math.floor(Math.random() * 50000) + 500,
        functions: randomFunctions
    };
}

function displayResults(projectData) {
    // Update repo info
    document.getElementById('repo-name').textContent = projectData.name;
    document.getElementById('repo-description').textContent = projectData.description;
    document.getElementById('stars').textContent = projectData.stars.toLocaleString();
    document.getElementById('forks').textContent = projectData.forks.toLocaleString();
    document.getElementById('functions-count').textContent = projectData.functions.length;

    // Render functions
    functionsList.innerHTML = projectData.functions
        .map((func, index) => createFunctionCard(func, index))
        .join('');

    const functionGraph = createFunctionGraphData(projectData.functions);
    renderFunctionGraph(functionGraph);

    const featureFlows = generateFeatureFlows(projectData);
    featureFlowList.innerHTML = featureFlows
        .map((flow) => createFeatureFlowCard(flow))
        .join('');

    // Add event listeners to copy buttons
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.function-card');
            const functionName = card.querySelector('.function-name').textContent;
            copyToClipboard(functionName);
            showToast('✅ Copied to clipboard', 'success');
        });
    });

    // Show results
    hideAllStates();
    resultsSection.style.display = 'block';
}

function createFunctionGraphData(functionItems) {
    const names = functionItems.map((item) => typeof item === 'string' ? item : item.name);
    const nodes = names.map((name, index) => ({ id: index, label: name }));
    const edges = [];

    for (let i = 0; i < nodes.length - 1; i += 1) {
        edges.push({ from: i, to: i + 1, type: 'calls' });
    }

    if (nodes.length >= 3) {
        edges.push({ from: 0, to: 2, type: 'triggers' });
    }

    if (nodes.length >= 5) {
        edges.push({ from: 1, to: 4, type: 'updates' });
    }

    return { nodes, edges };
}

function renderFunctionGraph(graphData) {
    if (!graphData.nodes.length) {
        functionGraphCanvas.innerHTML = '<p class="graph-empty">No function graph available.</p>';
        return;
    }

    const columns = Math.min(3, graphData.nodes.length);
    const horizontalGap = 230;
    const verticalGap = 120;
    const offsetX = 70;
    const offsetY = 60;
    const nodeWidth = 170;
    const nodeHeight = 44;

    const positionedNodes = graphData.nodes.map((node, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        return {
            ...node,
            x: offsetX + (col * horizontalGap),
            y: offsetY + (row * verticalGap)
        };
    });

    const rows = Math.ceil(graphData.nodes.length / columns);
    const svgWidth = Math.max(760, offsetX * 2 + (columns - 1) * horizontalGap + nodeWidth);
    const svgHeight = offsetY * 2 + Math.max(1, rows - 1) * verticalGap + nodeHeight;

    const getNodeById = (id) => positionedNodes.find((node) => node.id === id);

    const edgesSvg = graphData.edges.map((edge) => {
        const fromNode = getNodeById(edge.from);
        const toNode = getNodeById(edge.to);

        if (!fromNode || !toNode) {
            return '';
        }

        const x1 = fromNode.x + nodeWidth / 2;
        const y1 = fromNode.y + nodeHeight / 2;
        const x2 = toNode.x + nodeWidth / 2;
        const y2 = toNode.y + nodeHeight / 2;

        return `<line class="graph-edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#arrowhead)"></line>`;
    }).join('');

    const nodesSvg = positionedNodes.map((node) => {
        const shortLabel = node.label.length > 26 ? `${node.label.slice(0, 23)}...` : node.label;
        const textX = node.x + nodeWidth / 2;
        const textY = node.y + (nodeHeight / 2) + 4;
        return `
            <rect class="graph-node" x="${node.x}" y="${node.y}" width="${nodeWidth}" height="${nodeHeight}" rx="8" ry="8"></rect>
            <text class="graph-label" x="${textX}" y="${textY}" text-anchor="middle">${escapeHtml(shortLabel)}</text>
        `;
    }).join('');

    functionGraphCanvas.innerHTML = `
        <svg class="function-graph-svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#8da0dc"></polygon>
                </marker>
            </defs>
            ${edgesSvg}
            ${nodesSvg}
        </svg>
    `;
}

function getFunctionGraphLines(functionNames) {
    const graph = createFunctionGraphData(functionNames);
    return graph.edges.map((edge) => {
        const from = graph.nodes[edge.from]?.label || `Function ${edge.from + 1}`;
        const to = graph.nodes[edge.to]?.label || `Function ${edge.to + 1}`;
        return `${from} -> ${to}`;
    });
}

function generateFeatureFlows(projectData) {
    return [
        {
            feature: 'Shopping Cart Flow',
            summary: `Explains how items move from product listing to cart state and checkout preparation in ${projectData.name}.`,
            entryPoint: 'ProductPage.addToCart()',
            outcome: 'Cart state persisted and checkout payload prepared',
            classes: [
                'ProductPage',
                'CartController',
                'CartService',
                'InventoryService',
                'PricingEngine',
                'PromotionEngine',
                'CartRepository',
                'CheckoutService'
            ],
            steps: [
                'User clicks Add to Cart on ProductPage; UI dispatches addToCart(productId, quantity).',
                'CartController validates request and calls CartService.addItem().',
                'InventoryService verifies stock and reserves quantity for the active cart session.',
                'PricingEngine calculates base subtotal; PromotionEngine applies campaign and coupon rules.',
                'CartRepository stores updated cart lines and totals (session/local DB/API).',
                'CartController publishes cart-updated event so mini-cart, badge, and summary blocks refresh.',
                'CheckoutService transforms cart lines into a checkout payload (shipping, tax, payment-ready).'
            ]
        }
    ];
}

function createFeatureFlowCard(flow) {
    const classesHtml = flow.classes
        .map((className) => `<span class="flow-class">${escapeHtml(className)}</span>`)
        .join('');

    const stepsHtml = flow.steps
        .map((step, index) => `
            <li class="flow-step">
                <span class="flow-step-index">${index + 1}</span>
                <p class="flow-step-text">${escapeHtml(step)}</p>
            </li>
        `)
        .join('');

    return `
        <article class="flow-card">
            <h4 class="flow-title">${escapeHtml(flow.feature)}</h4>
            <p class="flow-summary">${escapeHtml(flow.summary)}</p>
            <div class="flow-meta">
                <span class="flow-chip entry">Entry: ${escapeHtml(flow.entryPoint)}</span>
                <span class="flow-chip outcome">Outcome: ${escapeHtml(flow.outcome)}</span>
            </div>
            <div class="flow-classes">
                <p class="flow-subtitle">Involved Classes / Features</p>
                <div class="flow-class-list">${classesHtml}</div>
            </div>
            <div class="flow-steps-wrapper">
                <p class="flow-subtitle">Flow Steps</p>
                <ol class="flow-steps">${stepsHtml}</ol>
            </div>
        </article>
    `;
}

function createFunctionCard(func, index) {
    const tagsHtml = func.tags 
        ? func.tags.map(tag => `<span class="tag ${tag.type || ''}">${tag.label}</span>`).join('')
        : '';

    return `
        <div class="function-card">
            <div class="function-header">
                <div class="function-name">${escapeHtml(func.name)}</div>
                <button class="copy-btn" title="Copy to clipboard">📋</button>
            </div>
            <p class="function-description">${escapeHtml(func.description)}</p>
            ${tagsHtml}
            <div class="function-details">
                <div><strong>Parameters:</strong> ${escapeHtml(func.params.join(', ') || 'None')}</div>
                <div><strong>Returns:</strong> ${escapeHtml(func.returns)}</div>
                <div style="margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
                    <strong>Example:</strong><br/>
                    <code>${escapeHtml(func.example)}</code>
                </div>
            </div>
        </div>
    `;
}

function handleCopyAll() {
    const cards = document.querySelectorAll('.function-card');
    const flowCards = document.querySelectorAll('.flow-card');
    const functionNames = [...cards].map((card) => card.querySelector('.function-name').textContent);
    const graphLines = getFunctionGraphLines(functionNames);
    let text = `${document.getElementById('repo-name').textContent}\n`;
    text += `${document.getElementById('repo-description').textContent}\n\n`;
    text += `Functions (${cards.length}):\n\n`;

    cards.forEach((card) => {
        const name = card.querySelector('.function-name').textContent;
        const description = card.querySelector('.function-description').textContent;
        const details = card.querySelector('.function-details').textContent;
        text += `${name}\n${description}\n${details}\n\n`;
    });

    text += `Function Graph:\n`;
    text += graphLines.length ? `${graphLines.join('\n')}\n\n` : 'No graph edges generated.\n\n';

    text += `Feature Flows (${flowCards.length}):\n\n`;
    flowCards.forEach((card) => {
        const title = card.querySelector('.flow-title').textContent;
        const summary = card.querySelector('.flow-summary').textContent;
        const classes = [...card.querySelectorAll('.flow-class')].map((el) => el.textContent).join(', ');
        const steps = [...card.querySelectorAll('.flow-step-text')].map((el, i) => `${i + 1}. ${el.textContent}`).join('\n');
        text += `${title}\n${summary}\nClasses: ${classes}\n${steps}\n\n`;
    });

    copyToClipboard(text);
    showToast('✅ All documentation copied to clipboard', 'success');
}

function handleExport() {
    const cards = document.querySelectorAll('.function-card');
    const flowCards = document.querySelectorAll('.flow-card');
    const functionNames = [...cards].map((card) => card.querySelector('.function-name').textContent);
    const graphLines = getFunctionGraphLines(functionNames);
    let markdown = `# ${document.getElementById('repo-name').textContent}\n\n`;
    markdown += `${document.getElementById('repo-description').textContent}\n\n`;
    markdown += `**Stars:** ${document.getElementById('stars').textContent}\n`;
    markdown += `**Forks:** ${document.getElementById('forks').textContent}\n\n`;
    markdown += `## Functions\n\n`;

    cards.forEach((card) => {
        const name = card.querySelector('.function-name').textContent;
        const description = card.querySelector('.function-description').textContent;
        const details = card.querySelector('.function-details').innerText;
        
        markdown += `### \`${name}\`\n\n`;
        markdown += `${description}\n\n`;
        markdown += `\`\`\`\n${details}\n\`\`\`\n\n`;
    });

    markdown += `## Function Graph\n\n`;
    if (graphLines.length) {
        markdown += `\`\`\`mermaid\n`;
        markdown += `graph TD\n`;
        graphLines.forEach((line) => {
            const parts = line.split(' -> ');
            if (parts.length === 2) {
                markdown += `  ${sanitizeMermaidId(parts[0])}["${parts[0]}"] --> ${sanitizeMermaidId(parts[1])}["${parts[1]}"]\n`;
            }
        });
        markdown += `\`\`\`\n\n`;
    } else {
        markdown += `No graph edges generated.\n\n`;
    }

    markdown += `## Feature Flows\n\n`;
    flowCards.forEach((card) => {
        const title = card.querySelector('.flow-title').textContent;
        const summary = card.querySelector('.flow-summary').textContent;
        const classes = [...card.querySelectorAll('.flow-class')].map((el) => el.textContent).join(', ');
        const steps = [...card.querySelectorAll('.flow-step-text')].map((el, i) => `${i + 1}. ${el.textContent}`).join('\n');

        markdown += `### ${title}\n\n`;
        markdown += `${summary}\n\n`;
        markdown += `**Involved Classes / Features:** ${classes}\n\n`;
        markdown += `${steps}\n\n`;
    });

    // Create and download file
    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${document.getElementById('repo-name').textContent.toLowerCase()}-docs.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showToast('📥 Documentation exported as Markdown', 'success');
}

// UI State Functions
function showLoading() {
    hideAllStates();
    loadingState.style.display = 'flex';
}

function showError(message) {
    hideAllStates();
    document.getElementById('error-text').textContent = message;
    errorState.style.display = 'block';
}

function hideAllStates() {
    loadingState.style.display = 'none';
    resultsSection.style.display = 'none';
    errorState.style.display = 'none';
    emptyState.style.display = 'none';
}

function showToast(message, type = 'info') {
    toastNotification.textContent = message;
    toastNotification.className = `toast show ${type}`;
    
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function sanitizeMermaidId(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') || 'node';
}

// Initialize
window.addEventListener('load', () => {
    // Set default value
    githubLinkInput.focus();
});
