/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // If not found, fallback to any img in the element
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the container with the heading
  let contentCell = '';
  let heading = null;
  const containers = element.querySelectorAll(':scope > div > div');
  for (const div of containers) {
    const h1 = div.querySelector('h1, h2, h3, h4, h5, h6');
    if (h1) {
      heading = h1;
      contentCell = div;
      break;
    }
  }
  // If not found, fallback to any heading in the element
  if (!contentCell) {
    const h = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (h) {
      contentCell = h;
    }
  }
  const contentRow = [contentCell ? contentCell : ''];

  // 4. Assemble table
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace original element
  element.replaceWith(table);
}
