/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the card body
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: search for .card-body anywhere inside
    cardBody = element.querySelector('[class*="card-body"]');
  }
  if (!cardBody) return;

  // Find image (mandatory)
  let img = cardBody.querySelector('img');
  // Defensive: ensure it's an image
  if (!img || !img.src) return;

  // Find heading (optional)
  let heading = cardBody.querySelector('.h4-heading');

  // Compose text cell
  const textCell = [];
  if (heading) textCell.push(heading);
  // If there is any description, add it (none in this example)
  // No CTA in this example

  // Table header
  const headerRow = ['Cards (cards21)'];
  // Table row: [image, text]
  const cardRow = [img, textCell];

  // Build table
  const cells = [headerRow, cardRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
