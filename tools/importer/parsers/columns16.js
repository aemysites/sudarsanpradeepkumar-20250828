/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs (each column)
  const columnDivs = Array.from(grid.children);

  // For each column, find the image element inside
  const cells = columnDivs.map((colDiv) => {
    // Find the first img inside this column
    const img = colDiv.querySelector('img');
    return img ? img : '';
  });

  // Table header row
  const headerRow = ['Columns (columns16)'];
  // Table content row: one cell per column/image
  const contentRow = cells;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
