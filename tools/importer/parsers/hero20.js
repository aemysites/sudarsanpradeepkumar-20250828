/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of background images
  const backgroundGrid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');

  // Find the content block (title, subheading, CTAs)
  const contentBlock = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');

  // Compose the table rows as per block spec
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [backgroundGrid];
  const contentRow = [contentBlock];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
