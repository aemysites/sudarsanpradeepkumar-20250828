/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image ---
  // Find the image element (background)
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  for (const img of imgCandidates) {
    if (img.classList.contains('cover-image')) {
      bgImg = img;
      break;
    }
  }
  // If not found by class, fallback to first img
  if (!bgImg && imgCandidates.length > 0) {
    bgImg = imgCandidates[0];
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content (Heading, Subheading, CTA) ---
  // Find the card containing the text and buttons
  let card = null;
  const cards = element.querySelectorAll('.card');
  if (cards.length > 0) {
    card = cards[0];
  }
  // Defensive: fallback to first .utility-max-width-md if no .card
  if (!card) {
    const fallback = element.querySelector('.utility-max-width-md');
    if (fallback) card = fallback;
  }
  // Compose content row
  const contentRow = [card ? card : ''];

  // --- Build table ---
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
