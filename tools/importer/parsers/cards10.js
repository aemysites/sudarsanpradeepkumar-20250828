/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Header row as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is an <a> direct child of the grid container
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Image cell: find the first <img> inside the card
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let imgEl = null;
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }

    // Text cell: find the .utility-padding-all-1rem div (text content)
    const textContent = card.querySelector('.utility-padding-all-1rem');

    // Defensive: only add if both image and text exist
    if (imgEl && textContent) {
      rows.push([
        imgEl,
        textContent
      ]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
