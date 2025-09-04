/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract the two columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image only
  const imageCol = columns[0];
  // Second column: text content (heading, subheading, buttons)
  const textCol = columns[1];

  // Table header row as per block guidelines
  const headerRow = ['Columns (columns1)'];
  // Table content row: each cell is a reference to the original DOM node
  const contentRow = [imageCol, textCol];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
