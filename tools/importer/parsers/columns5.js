/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing both columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find all immediate children of the main grid
  const columns = Array.from(mainGrid.children);

  // Identify left (content) and right (image) columns
  let leftCol = null;
  let rightCol = null;

  for (const col of columns) {
    if (!leftCol && col.querySelector('h2')) {
      leftCol = col;
    } else if (!rightCol && col.tagName === 'IMG') {
      rightCol = col;
    }
  }

  // Fallbacks if not found
  if (!leftCol && columns.length > 0) leftCol = columns[0];
  if (!rightCol && columns.length > 1) rightCol = columns[1];

  // Build header row
  const headerRow = ['Columns (columns5)'];

  // Build content row: left column (content), right column (image)
  const contentRow = [leftCol, rightCol];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
