/* global WebImporter */
export default function parse(element, { document }) {
  // Only parse if this is the main header section
  if (!element.classList.contains('section')) return;

  // Find the main grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: left content, right image)
  const columns = Array.from(grid.children);
  // Remove empty columns at the end
  while (columns.length && columns[columns.length - 1].textContent.trim() === '' && !columns[columns.length - 1].querySelector('img')) {
    columns.pop();
  }
  if (columns.length < 1) return;

  // Build content for each non-empty column
  const contentRow = columns.map(col => {
    // Only add if column has content (text or images)
    if (col.textContent.trim() || col.querySelector('img')) {
      const div = document.createElement('div');
      Array.from(col.children).forEach(child => div.appendChild(child.cloneNode(true)));
      return div;
    }
    return null;
  }).filter(Boolean);

  if (contentRow.length === 0) return;

  // Table header
  const headerRow = ['Columns (columns15)'];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
