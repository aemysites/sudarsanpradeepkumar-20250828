/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expecting at least two columns

  // Prepare header row as specified
  const headerRow = ['Columns (columns3)'];

  // Prepare the content row: each column's full content as a cell
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
