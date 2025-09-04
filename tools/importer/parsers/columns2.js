/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- COLUMN 1: Large feature block ---
  // The first child is the main feature block (with image, tag, heading, paragraph)
  const mainFeature = grid.children[0];

  // --- COLUMN 2: Two stacked cards ---
  // The second child is a flex container with two cards (each with image, tag, heading, paragraph)
  const stackedCards = grid.children[1];
  // Defensive: get only direct children that are links
  const stackedCardLinks = Array.from(stackedCards.children).filter(
    (el) => el.tagName === 'A'
  );
  // Compose a wrapper div for these two cards
  const stackedCardsWrapper = document.createElement('div');
  stackedCardLinks.forEach(card => stackedCardsWrapper.appendChild(card));

  // --- COLUMN 3: Vertical list ---
  // The third child is a flex container with multiple links separated by dividers
  const verticalList = grid.children[2];
  // Defensive: get only direct children that are links
  const verticalLinks = Array.from(verticalList.children).filter(
    (el) => el.tagName === 'A'
  );
  // Compose a wrapper div for these links
  const verticalListWrapper = document.createElement('div');
  verticalLinks.forEach(link => verticalListWrapper.appendChild(link));

  // Build the table rows
  const headerRow = ['Columns (columns2)'];
  const contentRow = [mainFeature, stackedCardsWrapper, verticalListWrapper];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(block);
}
