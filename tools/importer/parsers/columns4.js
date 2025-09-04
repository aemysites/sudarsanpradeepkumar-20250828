/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected grid container
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row as specified
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, try to find the main content (image, etc)
  const columns = columnDivs.map((colDiv) => {
    // If the column contains an image, use the image element
    const img = colDiv.querySelector('img');
    if (img) return img;
    // Otherwise, use the whole column div
    return colDiv;
  });

  // Build the table rows
  const cells = [
    headerRow,
    columns,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
