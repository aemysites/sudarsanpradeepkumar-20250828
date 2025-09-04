/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (the direct child with columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Prepare the header row
  const headerRow = ['Columns (columns31)'];

  // Prepare the content row: each cell is the full content of each column
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
