/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardRow(cardAnchor) {
    // Find the image (first img in the card)
    const img = cardAnchor.querySelector('img');

    // Find the text content container (the div after the image)
    const contentDiv = cardAnchor.querySelector('div > div:last-child');
    // Defensive: fallback to the first div after img if above fails
    let textContentDiv = contentDiv;
    if (!textContentDiv) {
      const divs = cardAnchor.querySelectorAll('div');
      if (divs.length > 1) {
        textContentDiv = divs[1];
      }
    }

    // Compose the text cell: we want to keep the tag+read time, heading, description, and CTA (Read)
    // We'll gather all direct children of textContentDiv
    let textCellContent = [];
    if (textContentDiv) {
      // Defensive: only include non-empty elements
      textCellContent = Array.from(textContentDiv.children).filter(e => {
        // Exclude empty divs
        if (e.tagName === 'DIV' && e.textContent.trim() === '') return false;
        return true;
      });
    }

    // Return the row: [image, text cell content]
    return [img, textCellContent];
  }

  // Get all card anchors (direct children of the grid)
  const cardAnchors = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards33)']);
  // Card rows
  cardAnchors.forEach(cardAnchor => {
    rows.push(extractCardRow(cardAnchor));
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
