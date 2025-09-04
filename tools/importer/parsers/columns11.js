/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two main columns
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid is the two-column layout (left: heading, right: text/meta/button)
  const grids = container.querySelectorAll('.w-layout-grid.grid-layout');
  if (grids.length < 1) return;
  const mainGrid = grids[0];
  const gridChildren = mainGrid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // Left column: heading area
  const leftCol = gridChildren[0];
  // Right column: text, meta, button
  const rightCol = gridChildren[1];

  // Second grid: two images
  const imageGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs.length > 0) img1 = imgDivs[0].querySelector('img');
    if (imgDivs.length > 1) img2 = imgDivs[1].querySelector('img');
  }

  // Compose left cell: heading area + first image
  const leftCellContent = [];
  if (leftCol) leftCellContent.push(leftCol);
  if (img1) leftCellContent.push(img1);

  // Compose right cell: text/meta/button + second image
  const rightCellContent = [];
  if (rightCol) rightCellContent.push(rightCol);
  if (img2) rightCellContent.push(img2);

  // Table header
  const headerRow = ['Columns (columns11)'];
  // Table content row: two columns
  const contentRow = [leftCellContent, rightCellContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
