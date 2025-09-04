/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardContent(cardEl) {
    // Find image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    } else {
      imgEl = cardEl.querySelector('img');
    }
    // Defensive: only include img if present
    let imageCell = imgEl || '';

    // Find heading (h3)
    let heading = cardEl.querySelector('h3');
    // Defensive: only include heading if present
    let headingEl = heading || '';

    // Find description (p)
    let desc = cardEl.querySelector('p');
    let descEl = desc || '';

    // Find CTA (button or .button)
    let cta = cardEl.querySelector('.button, button, a.button');
    let ctaEl = cta || '';

    // Compose text cell
    const textCellContent = [];
    if (headingEl) textCellContent.push(headingEl);
    if (descEl) textCellContent.push(descEl);
    if (ctaEl) textCellContent.push(ctaEl);

    return [imageCell, textCellContent];
  }

  // Find the grid containing all cards
  const container = element.querySelector('.container');
  if (!container) return;
  // The main grid of cards is the first .w-layout-grid inside .container
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // Get all direct card anchors inside the main grid
  const cardNodes = Array.from(mainGrid.children).filter(
    (child) => child.matches('a.utility-link-content-block, a.utility-link-content-block.w-inline-block')
  );

  // Some cards are nested inside a secondary grid (for smaller cards)
  // Find nested grids and get their card anchors
  const nestedGrids = Array.from(mainGrid.children).filter(
    (child) => child.classList.contains('w-layout-grid')
  );
  nestedGrids.forEach(grid => {
    const nestedCards = Array.from(grid.querySelectorAll('a.utility-link-content-block, a.utility-link-content-block.w-inline-block'));
    cardNodes.push(...nestedCards);
  });

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);
  // Card rows
  cardNodes.forEach(cardEl => {
    rows.push(extractCardContent(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
