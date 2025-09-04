/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card root element
  function extractCard(cardEl) {
    // Find the main image (first img)
    const img = cardEl.querySelector('img');
    // Find the text container (look for h3 and p inside)
    let heading = null;
    let desc = null;
    // Sometimes the text is wrapped in utility-padding, sometimes not
    const textContainer = cardEl.querySelector('.utility-padding-all-2rem') || cardEl;
    heading = textContainer.querySelector('h3');
    desc = textContainer.querySelector('p');
    // Compose text cell content
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    return [img, textCell];
  }

  // Get all direct children (cards or images)
  const cards = [];
  const children = element.querySelectorAll(':scope > div');
  children.forEach((child) => {
    // Card with text (has h3 or p)
    if (child.querySelector('h3') || child.querySelector('p')) {
      cards.push(extractCard(child));
    } else {
      // Image-only card
      const img = child.querySelector('img');
      if (img) {
        cards.push([img, []]);
      }
    }
  });

  // Build table rows
  const headerRow = ['Cards (cards25)'];
  const rows = cards.map(([img, textCell]) => [img, textCell]);
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
