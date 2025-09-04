/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row: exactly one column, block name only
  const headerRow = ['Cards (cards17)'];

  // Get all card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));

  // Each card row: [image, text content] (as an array of two cells)
  const rows = cardDivs.map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    let textContent = '';
    if (img && img.alt) {
      textContent = img.alt;
    }
    return [img, textContent];
  });

  // Create table with header row (1 column), then each row (2 columns)
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix header row to span two columns for valid HTML
  if (block && block.querySelector('tr')) {
    const headerTr = block.querySelector('tr');
    if (headerTr && headerTr.children.length === 1) {
      headerTr.children[0].setAttribute('colspan', '2');
    }
  }

  element.replaceWith(block);
}
