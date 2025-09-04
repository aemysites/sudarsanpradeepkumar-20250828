/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: exactly one column
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Each divider contains a grid with two children: heading and content
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  accordionItems.forEach((item) => {
    // Find the grid inside this divider
    const grid = item.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get the two children: heading and content
    const children = Array.from(grid.children);
    let heading = null;
    let content = null;
    children.forEach((child) => {
      if (child.classList.contains('h4-heading')) {
        heading = child;
      } else if (child.classList.contains('rich-text') || child.classList.contains('paragraph-lg')) {
        content = child;
      }
    });
    // If both heading and content found, add row
    if (heading && content) {
      rows.push([heading, content]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Fix: ensure the header row has only one cell, but the table has two columns
  // by setting colspan on the header cell
  if (block && block.querySelector('thead tr th')) {
    block.querySelector('thead tr th').setAttribute('colspan', '2');
  }
  // Replace the original element
  element.replaceWith(block);
}
