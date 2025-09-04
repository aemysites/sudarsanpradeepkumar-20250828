/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is a div with an image inside
  const columns = columnDivs.map(colDiv => {
    // Find the image inside the column div
    const img = colDiv.querySelector('img');
    // Only include the image if present
    return img ? img : '';
  });

  // Build the table rows
  const headerRow = ['Columns (columns7)']; // CRITICAL: header row must be exactly one column
  const contentRow = columns;

  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
