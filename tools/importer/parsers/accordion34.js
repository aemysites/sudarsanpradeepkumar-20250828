/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row as required
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Get all accordion items (direct children)
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title cell: find the .paragraph-lg inside .w-dropdown-toggle
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
    }
    // Defensive fallback: if not found, use toggle itself
    if (!titleEl && toggle) titleEl = toggle;

    // Content cell: find the .accordion-content (nav), then its .rich-text
    const contentNav = item.querySelector('.accordion-content');
    let contentEl = null;
    if (contentNav) {
      // Get the rich text block or fallback to the nav itself
      contentEl = contentNav.querySelector('.rich-text') || contentNav;
    }

    // Defensive: if either cell missing, skip
    if (!titleEl || !contentEl) return;

    rows.push([titleEl, contentEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
