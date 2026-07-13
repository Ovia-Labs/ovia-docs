const node = (title, subtitle = "", classes = "") => `
  <div class="diagram-node ${classes}">
    <strong>${title}</strong>
    ${subtitle ? `<span>${subtitle}</span>` : ""}
  </div>`;

const line = `<div class="diagram-line" aria-hidden="true"></div>`;

const diagrams = {
  ecosystem: `
    <div class="ovia-diagram" role="img" aria-label="Ovia Labs ecosystem overview">
      <div class="diagram-badge">Ovia Ecosystem</div>
      <div class="diagram-column">
        ${node("Ovia Labs", "Product and infrastructure laboratory", "primary")}
        ${line}
        <div class="diagram-branch" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="diagram-row diagram-row-three">
          ${node("Ovia Protocol", "Trust-minimized settlement infrastructure")}
          ${node("ChartLabs Pulse", "Portfolio intelligence application")}
          ${node("Future Products", "New solutions built around real needs")}
        </div>
      </div>
      <p class="diagram-caption">Different products. One mission: better digital coordination.</p>
    </div>`,

  "problem-before": `
    <div class="ovia-diagram" role="img" aria-label="Traditional transaction risk">
      <div class="diagram-badge">Traditional Transaction</div>
      <div class="diagram-split">
        ${node("Buyer", "Pays before receiving", "risk")}
        <div class="diagram-exchange" aria-hidden="true"><span>Payment →</span><span>← Delivery</span></div>
        ${node("Seller", "Delivers before payment", "risk")}
      </div>
      <p class="diagram-caption">Someone must act first. Both sides carry counterparty risk.</p>
    </div>`,

  "problem-after": `
    <div class="ovia-diagram" role="img" aria-label="Transaction using Ovia Protocol">
      <div class="diagram-badge">With Ovia Protocol</div>
      <div class="diagram-column">
        ${node("Buyer", "Funds the agreement", "compact")}
        ${line}
        ${node("Escrow Contract", "Rules • Conditions • Deadlines", "primary secure")}
        ${line}
        ${node("Seller", "Receives settlement after completion", "compact")}
      </div>
      <p class="diagram-caption">Funds remain locked until the agreed settlement path is executed.</p>
    </div>`,

  products: `
    <div class="ovia-diagram" role="img" aria-label="Ovia Labs product structure">
      <div class="diagram-badge">Product Structure</div>
      <div class="diagram-row diagram-row-two">
        <div class="diagram-layer-card">
          <span class="diagram-kicker">Infrastructure</span>
          <strong>Ovia Protocol</strong>
          <p>Reusable settlement and escrow infrastructure for builders.</p>
        </div>
        <div class="diagram-layer-card">
          <span class="diagram-kicker">Application</span>
          <strong>ChartLabs Pulse</strong>
          <p>A user-facing product created from community demand.</p>
        </div>
      </div>
      <p class="diagram-caption">Ovia Labs can build both foundational infrastructure and focused applications.</p>
    </div>`,

  "trust-layer": `
    <div class="ovia-diagram" role="img" aria-label="Communication ownership and trust layers">
      <div class="diagram-badge">The Missing Layer</div>
      <div class="diagram-stack">
        <div class="diagram-layer-card"><span class="diagram-kicker">Communication</span><strong>Internet</strong><p>Move information globally.</p></div>
        <div class="diagram-stack-arrow">↓</div>
        <div class="diagram-layer-card"><span class="diagram-kicker">Ownership</span><strong>Blockchain</strong><p>Own and transfer digital value.</p></div>
        <div class="diagram-stack-arrow">↓</div>
        <div class="diagram-layer-card featured"><span class="diagram-kicker">Trust</span><strong>Ovia</strong><p>Coordinate agreements through verifiable rules.</p></div>
      </div>
    </div>`,

  "escrow-flow": `
    <div class="ovia-diagram" role="img" aria-label="Ovia escrow lifecycle">
      <div class="diagram-badge">Escrow Lifecycle</div>
      <div class="diagram-flow">
        ${node("Agreement", "Terms are defined", "flow-node")}
        <span class="flow-arrow">→</span>
        ${node("Escrow", "Contract is created", "flow-node")}
        <span class="flow-arrow">→</span>
        ${node("Funding", "Assets are locked", "flow-node")}
        <span class="flow-arrow">→</span>
        ${node("Completion", "Obligation is fulfilled", "flow-node")}
        <span class="flow-arrow">→</span>
        ${node("Settlement", "Release or refund", "flow-node secure")}
      </div>
    </div>`,

  architecture: `
    <div class="ovia-diagram" role="img" aria-label="Ovia Protocol technical architecture">
      <div class="diagram-badge">Protocol Architecture</div>
      <div class="diagram-column">
        ${node("Application Layer", "Wallets • Marketplaces • Business tools", "compact")}
        ${line}
        ${node("Escrow Factory", "Standardized agreement deployment", "primary")}
        ${line}
        <div class="diagram-row diagram-row-three">
          ${node("Escrow A", "Isolated agreement")}
          ${node("Escrow B", "Isolated agreement")}
          ${node("Escrow N", "Isolated agreement")}
        </div>
        ${line}
        ${node("Event Layer", "Observable on-chain activity", "compact")}
      </div>
    </div>`,

  roadmap: `
    <div class="ovia-diagram" role="img" aria-label="Ovia Labs roadmap phases">
      <div class="diagram-badge">Capability Roadmap</div>
      <div class="diagram-timeline">
        <div><span>01</span><strong>Foundation</strong><small>Identity, architecture and documentation</small></div>
        <div><span>02</span><strong>Protocol</strong><small>Contracts, testnet and settlement flows</small></div>
        <div><span>03</span><strong>Developer Adoption</strong><small>SDKs, examples and integrations</small></div>
        <div><span>04</span><strong>Ecosystem Growth</strong><small>Products, partners and new transaction models</small></div>
        <div><span>05</span><strong>Trust Infrastructure</strong><small>Broader programmable trust systems</small></div>
      </div>
    </div>`,

  "pulse-loop": `
    <div class="ovia-diagram" role="img" aria-label="ChartLabs Pulse product development loop">
      <div class="diagram-badge">Community To Product</div>
      <div class="diagram-flow compact-flow">
        ${node("ChartLabs", "Community demand", "flow-node")}
        <span class="flow-arrow">→</span>
        ${node("Ovia Labs", "Research and development", "flow-node primary")}
        <span class="flow-arrow">→</span>
        ${node("ChartLabs Pulse", "Delivered product", "flow-node secure")}
      </div>
    </div>`,

  "security-layers": `
    <div class="ovia-diagram" role="img" aria-label="Ovia Protocol security layers">
      <div class="diagram-badge">Security Layers</div>
      <div class="diagram-row diagram-row-three">
        ${node("Contract Design", "Simple responsibilities and isolated escrows")}
        ${node("Execution Safety", "State checks, access control and reentrancy protection")}
        ${node("Transparency", "Events, reviewable logic and verifiable outcomes")}
      </div>
    </div>`,
};

export function renderDocsComponents(markdown) {
  return markdown.replace(/\{\{diagram:([a-z0-9-]+)\}\}/gi, (match, name) => {
    if (!diagrams[name]) {
      console.warn(`Unknown Ovia diagram: ${name}`);
      return `<div class="docs-callout warning"><strong>Diagram unavailable</strong><span>${name}</span></div>`;
    }
    // Collapse indentation/newlines so marked treats this as raw HTML,
    // not as an indented Markdown code block.
    return diagrams[name].replace(/\n\s*/g, "");
  });
}
