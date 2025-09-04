/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header must match block name exactly
  const headerRow = ['Columns (columns38)'];

  // Each cell in the content row is the referenced column div
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
