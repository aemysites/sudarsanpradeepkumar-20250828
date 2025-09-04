/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The first two children of the grid are the left and right columns
  // Defensive: get all direct children
  const gridChildren = Array.from(grid.children);

  // Left column: heading, quote
  const leftCol = document.createElement('div');
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]); // h2-heading
  if (gridChildren[1]) leftCol.appendChild(gridChildren[1]); // paragraph-lg

  // Right column: testimonial grid (divider, avatar, name, svg logo)
  const rightCol = gridChildren[2] ? gridChildren[2] : null;

  // Table header
  const headerRow = ['Columns (columns26)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
