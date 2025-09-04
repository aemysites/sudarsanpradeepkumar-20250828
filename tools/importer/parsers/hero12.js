/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (row 2)
  // The background image is the first .cover-image inside the first grid cell
  let backgroundImg = null;
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    const firstCell = grid.children[0];
    if (firstCell) {
      backgroundImg = firstCell.querySelector('img.cover-image');
    }
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (row 3)
  // The content is in the second grid cell, inside .card-body > .w-layout-grid
  let contentCell = null;
  if (grid && grid.children[1]) {
    const contentContainer = grid.children[1].querySelector('.card-body .w-layout-grid');
    if (contentContainer) {
      // The left image (decorative) and the right content (headings, list, button)
      const leftImg = contentContainer.querySelector('img.cover-image');
      // The right content div
      const rightContent = contentContainer.querySelector('div[id^="w-node-"]');
      // Compose content cell: left image, then right content
      const cellContent = [];
      if (leftImg) cellContent.push(leftImg);
      if (rightContent) cellContent.push(rightContent);
      contentCell = cellContent;
    }
  }
  const contentRow = [contentCell ? contentCell : ''];

  // Compose table
  const tableRows = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(block);
}
