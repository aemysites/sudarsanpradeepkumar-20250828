/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row
  const headerRow = ['Columns (columns36)'];

  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) return;

  // Get the two main columns (left: text/buttons, right: images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // We'll include all content in leftCol as a single cell

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  // The right column contains a grid of images
  const imageGrid = rightCol.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let images = [];
  if (imageGrid) {
    images = Array.from(imageGrid.querySelectorAll('img'));
    // Only include images with a src
    images = images.filter(img => img && img.src);
  }

  // Create the second row: left cell is leftCol, right cell is all images (as nodes)
  const secondRow = [leftCol, images];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
