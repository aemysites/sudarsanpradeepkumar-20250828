/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor or card div
  function extractCardInfo(card) {
    // Find image (img inside any descendant)
    let img = card.querySelector('img');
    if (!img) return null; // Only include cards with images

    // Compose text cell: include all heading and paragraph elements
    // Use less specific selectors to ensure all text is included
    let textCell = [];
    // Find all h3 or h2 (for title)
    let headings = card.querySelectorAll('h3, h2');
    headings.forEach(h => textCell.push(h));
    // Find all paragraph-sm divs (for description)
    let descs = card.querySelectorAll('.paragraph-sm');
    descs.forEach(d => textCell.push(d));
    // Also include any direct text nodes (for flexibility)
    Array.from(card.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textCell.push(document.createTextNode(node.textContent.trim()));
      }
    });
    return [img, textCell];
  }

  // Find the active tab pane
  const activeTab = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activeTab) return;

  // Find the grid inside the active tab
  const grid = activeTab.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all card anchors or direct children (to be flexible)
  const cards = Array.from(grid.children).filter(child => child.tagName === 'A' || child.tagName === 'DIV');

  // Build table rows
  const rows = [];
  // Header row as per spec
  const headerRow = ['Cards (cards23)'];
  rows.push(headerRow);

  // For each card, extract image and text, but only if image is present
  cards.forEach(card => {
    const cardInfo = extractCardInfo(card);
    if (cardInfo) rows.push(cardInfo);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
