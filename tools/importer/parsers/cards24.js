/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards24)'];

  // Get all card links (each card is an <a> element)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Prepare rows for each card
  const rows = cardLinks.map((card) => {
    // Find the image container and image
    const imageContainer = card.querySelector('div[class*="utility-aspect-2x3"]');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Find the tag and date
    const metaDiv = card.querySelector('div.flex-horizontal');
    let tag = null, date = null;
    if (metaDiv) {
      const metaChildren = Array.from(metaDiv.children);
      tag = metaChildren.find(child => child.classList.contains('tag'));
      date = metaChildren.find(child => child.classList.contains('paragraph-sm'));
    }

    // Find the heading
    const heading = card.querySelector('h3');

    // Compose the text cell
    const textCell = document.createElement('div');
    // Tag and date row
    if (tag || date) {
      const metaRow = document.createElement('div');
      if (tag) metaRow.appendChild(tag);
      if (date) metaRow.appendChild(date);
      textCell.appendChild(metaRow);
    }
    // Heading
    if (heading) textCell.appendChild(heading);

    // Return row: [image, text]
    return [img, textCell];
  });

  // Build the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
