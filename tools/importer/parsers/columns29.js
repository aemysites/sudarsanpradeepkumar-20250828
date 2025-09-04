/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, preserve its content (usually an image)
  const contentRow = columns.map((col) => col);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns29)'];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
