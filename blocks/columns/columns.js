/**
 * @file columns.js
 * @description Columns block - Multi-column layout
 * @version 1.0.0
 */

export default function decorate(block) {
  const rows = [...block.children];
  const columns = [];
  
  // Collect columns from all rows
  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell, index) => {
      if (!columns[index]) {
        columns[index] = document.createElement('div');
        columns[index].className = 'column';
      }
      columns[index].append(...cell.childNodes);
    });
  });
  
  // Clear block and add columns
  block.innerHTML = '';
  columns.forEach((column) => {
    block.appendChild(column);
  });
  
  // Set column count class for responsive behavior
  block.classList.add(`columns-${columns.length}`);
}
