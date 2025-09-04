/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as per guidelines
  const headerRow = ['Hero (hero39)'];

  // Extract background image (img.cover-image)
  const bgImg = element.querySelector('img.cover-image');
  const bgImgCell = bgImg ? bgImg : '';

  // Extract content cell: right grid cell
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The content is inside a nested .w-layout-grid
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    contentCell = innerGrid ? innerGrid : gridDivs[1];
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
