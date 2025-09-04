/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (text content)
  // Usually the first child
  const leftCol = gridChildren[0];

  // Find the right column (contact list and image)
  // We'll look for the <ul> and <img> among the children
  let contactList = null;
  let image = null;
  for (const child of gridChildren) {
    if (!contactList && child.tagName === 'UL') {
      contactList = child;
    }
    if (!image && child.tagName === 'IMG') {
      image = child;
    }
  }

  // If the contactList is not a direct child, look deeper
  if (!contactList) {
    contactList = grid.querySelector('ul');
  }
  if (!image) {
    image = grid.querySelector('img');
  }

  // Compose left column: text content
  // We'll include all children of leftCol
  const leftColContent = Array.from(leftCol.children);

  // Compose right column: contact list and image
  // We'll stack contactList above image in the cell
  const rightColContent = [];
  if (contactList) rightColContent.push(contactList);
  if (image) rightColContent.push(image);

  // Table header
  const headerRow = ['Columns (columns18)'];
  // Table second row: two columns
  const secondRow = [leftColContent, rightColContent];

  // Build table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
