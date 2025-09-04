/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image element
  const img = columns[0].querySelector('img');
  // Second column: all content in the right column
  const contentCol = columns[1];

  // Table header row (must match block name exactly)
  const headerRow = ['Columns (columns32)'];
  // Table content row: only as many columns as needed, no empty columns
  const contentRow = [];
  if (img) contentRow.push(img);
  if (contentCol) contentRow.push(contentCol);

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
