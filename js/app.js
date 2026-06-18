document.addEventListener('DOMContentLoaded', () => {
  // Generate 16 table rows inside the tbody
  const tbody = document.getElementById('challanTableBody');
  if (tbody) {
    tbody.innerHTML = ''; // Clear fallback content
    
    for (let i = 1; i <= 16; i++) {
      const tr = document.createElement('tr');
      
      // Serial Number cell (Sl.)
      const slTd = document.createElement('td');
      slTd.style.width = '6%';
      const slSpan = document.createElement('span');
      slSpan.className = 'sl-text';
      slSpan.textContent = i;
      slTd.appendChild(slSpan);
      tr.appendChild(slTd);
      
      // Description cell
      const descTd = document.createElement('td');
      descTd.style.width = '68%';
      const descInput = document.createElement('input');
      descInput.type = 'text';
      descInput.className = 'table-cell-input align-left';
      descInput.name = `item_desc_${i}`;
      descInput.id = `item_desc_${i}`;
      descInput.setAttribute('aria-label', `Description of Item ${i}`);
      descTd.appendChild(descInput);
      tr.appendChild(descTd);
      
      // Quantity cell
      const qtyTd = document.createElement('td');
      qtyTd.style.width = '13%';
      const qtyInput = document.createElement('input');
      qtyInput.type = 'text';
      qtyInput.className = 'table-cell-input align-center';
      qtyInput.name = `item_qty_${i}`;
      qtyInput.id = `item_qty_${i}`;
      qtyInput.setAttribute('aria-label', `Quantity of Item ${i}`);
      qtyTd.appendChild(qtyInput);
      tr.appendChild(qtyTd);
      
      // Remarks cell
      const remarksTd = document.createElement('td');
      remarksTd.style.width = '13%';
      const remarksInput = document.createElement('input');
      remarksInput.type = 'text';
      remarksInput.className = 'table-cell-input align-left';
      remarksInput.name = `item_remarks_${i}`;
      remarksInput.id = `item_remarks_${i}`;
      remarksInput.setAttribute('aria-label', `Remarks of Item ${i}`);
      remarksTd.appendChild(remarksInput);
      tr.appendChild(remarksTd);
      
      tbody.appendChild(tr);
    }
  }

  // Date Auto-Tabbing Interactivity
  const dayInput = document.getElementById('dateDay');
  const monthInput = document.getElementById('dateMonth');
  const yearInput = document.getElementById('dateYear');
  
  if (dayInput && monthInput && yearInput) {
    dayInput.addEventListener('input', () => {
      if (dayInput.value.length >= 2) {
        monthInput.focus();
      }
    });
    
    monthInput.addEventListener('input', () => {
      if (monthInput.value.length >= 2) {
        yearInput.focus();
      }
    });
  }

  // Clear Form Action
  const clearBtn = document.getElementById('clearBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all fields in the Challan form?')) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          input.value = '';
        });
      }
    });
  }

  // Print Challan Action
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Save as PDF Action (Guides user to print settings)
  const pdfBtn = document.getElementById('pdfBtn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      alert("To Save as PDF:\n1. The system will open the print interface.\n2. In the 'Destination' selection, choose 'Save as PDF'.\n3. Click 'Save' and choose your folder location.");
      window.print();
    });
  }

  // Add Row Action
  const addRowBtn = document.getElementById('addRowBtn');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      const tbody = document.getElementById('challanTableBody');
      if (tbody) {
        const nextIndex = tbody.querySelectorAll('tr').length + 1;
        const tr = document.createElement('tr');
        
        // Sl. cell
        const slTd = document.createElement('td');
        slTd.style.width = '6%';
        const slSpan = document.createElement('span');
        slSpan.className = 'sl-text';
        slSpan.textContent = nextIndex;
        slTd.appendChild(slSpan);
        tr.appendChild(slTd);
        
        // Description cell
        const descTd = document.createElement('td');
        descTd.style.width = '68%';
        const descInput = document.createElement('input');
        descInput.type = 'text';
        descInput.className = 'table-cell-input align-left';
        descInput.name = `item_desc_${nextIndex}`;
        descInput.id = `item_desc_${nextIndex}`;
        descInput.setAttribute('aria-label', `Description of Item ${nextIndex}`);
        descTd.appendChild(descInput);
        tr.appendChild(descTd);
        
        // Quantity cell
        const qtyTd = document.createElement('td');
        qtyTd.style.width = '13%';
        const qtyInput = document.createElement('input');
        qtyInput.type = 'text';
        qtyInput.className = 'table-cell-input align-center';
        qtyInput.name = `item_qty_${nextIndex}`;
        qtyInput.id = `item_qty_${nextIndex}`;
        qtyInput.setAttribute('aria-label', `Quantity of Item ${nextIndex}`);
        qtyTd.appendChild(qtyInput);
        tr.appendChild(qtyTd);
        
        // Remarks cell
        const remarksTd = document.createElement('td');
        remarksTd.style.width = '13%';
        const remarksInput = document.createElement('input');
        remarksInput.type = 'text';
        remarksInput.className = 'table-cell-input align-left';
        remarksInput.name = `item_remarks_${nextIndex}`;
        remarksInput.id = `item_remarks_${nextIndex}`;
        remarksInput.setAttribute('aria-label', `Remarks of Item ${nextIndex}`);
        remarksTd.appendChild(remarksInput);
        tr.appendChild(remarksTd);
        
        tbody.appendChild(tr);
      }
    });
  }

  // Remove Row Action
  const removeRowBtn = document.getElementById('removeRowBtn');
  if (removeRowBtn) {
    removeRowBtn.addEventListener('click', () => {
      const tbody = document.getElementById('challanTableBody');
      if (tbody) {
        const rows = tbody.querySelectorAll('tr');
        if (rows.length > 1) {
          tbody.removeChild(rows[rows.length - 1]);
        } else {
          alert('At least one row must be kept in the table.');
        }
      }
    });
  }

  // Keyboard Shortcuts (Ctrl+P, Ctrl+S, Ctrl+Alt+C)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      if (printBtn) printBtn.click();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      if (pdfBtn) pdfBtn.click();
    } else if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      if (clearBtn) clearBtn.click();
    }
  });
});
