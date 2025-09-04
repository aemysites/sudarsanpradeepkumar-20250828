/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Find the grid container that holds the columns
  // The structure is: footer > div.container > div.grid-layout > [columns...]
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Build the header row
  const headerRow = ['Columns (columns9)'];

  // Build the columns row: each cell is the full column content
  // We reference the actual DOM nodes for resilience
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
