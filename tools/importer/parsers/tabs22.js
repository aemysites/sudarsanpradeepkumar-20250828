/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Get tab labels (menu)
  // The first child div is the tab menu
  const tabMenu = element.querySelector('.w-tab-menu');
  // Each tab label is in an <a> with a <div> inside
  const tabLinks = tabMenu ? tabMenu.querySelectorAll('a') : [];

  // 2. Get tab panes (content)
  // The second child div is the tab content container
  const tabContent = element.querySelector('.w-tab-content');
  // Each tab pane is a .w-tab-pane
  const tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

  // Defensive: ensure we have matching number of tabs and panes
  const numTabs = Math.min(tabLinks.length, tabPanes.length);

  // 3. Build rows
  const rows = [];
  // Header row as required
  const headerRow = ['Tabs (tabs22)'];
  rows.push(headerRow);

  for (let i = 0; i < numTabs; i++) {
    const tabLink = tabLinks[i];
    // The label is the textContent of the inner div (or fallback to link text)
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // The content is the entire .w-tab-pane's first child (the grid)
    const tabPane = tabPanes[i];
    // Defensive: find the grid inside the pane
    let contentElem = null;
    if (tabPane) {
      // Usually the first child is the grid
      contentElem = tabPane.querySelector('.w-layout-grid');
    }
    // Fallback: use the pane itself if grid not found
    const contentCell = contentElem || tabPane;

    // Row: [label, content]
    rows.push([label, contentCell]);
  }

  // 4. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
