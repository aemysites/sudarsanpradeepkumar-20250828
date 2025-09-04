/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: content block (text, heading, button)
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1];

  // Table header row
  const headerRow = ['Columns (columns27)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
