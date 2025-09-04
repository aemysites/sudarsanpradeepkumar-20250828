/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element || !element.classList.contains('grid-layout')) return;

  // Table header row
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card children (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains:
    // - icon wrapper (div > div.icon > svg)
    // - text (p)
    // Defensive: find the icon (first div with .icon)
    let iconDiv = null;
    let textP = null;
    const children = Array.from(cardDiv.children);
    // Find icon and text
    children.forEach((child) => {
      if (!iconDiv && child.querySelector('.icon')) {
        iconDiv = child.querySelector('.icon');
      }
      if (!textP && child.tagName === 'P') {
        textP = child;
      }
    });
    // Fallback: if not found, try deeper
    if (!iconDiv) {
      iconDiv = cardDiv.querySelector('.icon');
    }
    if (!textP) {
      textP = cardDiv.querySelector('p');
    }
    // Defensive: skip if missing icon or text
    if (!iconDiv || !textP) return;

    // First cell: icon (use the .icon div directly)
    // Second cell: text (use the p element directly)
    rows.push([iconDiv, textP]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
