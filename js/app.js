document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('challanTableBody');
  const printBtn = document.getElementById('printBtn');
  const pdfBtn = document.getElementById('pdfBtn');
  const clearBtn = document.getElementById('clearBtn');
  const addRowBtn = document.getElementById('addRowBtn');
  const removeRowBtn = document.getElementById('removeRowBtn');
  const viewToggleBtn = document.getElementById('viewToggleBtn');
  const previewWrapper = document.querySelector('.page-preview-wrapper');
  const mobileToast = document.getElementById('mobileToast');

  // Helper to show mobile toast messages
  function showToast(msg) {
    if (!mobileToast) return;
    mobileToast.textContent = msg;
    mobileToast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      mobileToast.classList.remove('show');
    }, 2800);
  }

  // Create a single table row with responsive column classes
  function createRow(index) {
    const tr = document.createElement('tr');
    
    // Sl. cell
    const slTd = document.createElement('td');
    slTd.className = 'col-sl';
    const slSpan = document.createElement('span');
    slSpan.className = 'sl-text';
    slSpan.textContent = index;
    slTd.appendChild(slSpan);
    tr.appendChild(slTd);
    
    // Description cell
    const descTd = document.createElement('td');
    descTd.className = 'col-desc';
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.className = 'table-cell-input align-left';
    descInput.name = `item_desc_${index}`;
    descInput.id = `item_desc_${index}`;
    descInput.setAttribute('aria-label', `Description of Item ${index}`);
    descTd.appendChild(descInput);
    tr.appendChild(descTd);
    
    // Quantity cell
    const qtyTd = document.createElement('td');
    qtyTd.className = 'col-qty';
    const qtyInput = document.createElement('input');
    qtyInput.type = 'text';
    qtyInput.className = 'table-cell-input align-center';
    qtyInput.name = `item_qty_${index}`;
    qtyInput.id = `item_qty_${index}`;
    qtyInput.setAttribute('aria-label', `Quantity of Item ${index}`);
    qtyTd.appendChild(qtyInput);
    tr.appendChild(qtyTd);
    
    // Remarks cell
    const remarksTd = document.createElement('td');
    remarksTd.className = 'col-remarks';
    const remarksInput = document.createElement('input');
    remarksInput.type = 'text';
    remarksInput.className = 'table-cell-input align-left';
    remarksInput.name = `item_remarks_${index}`;
    remarksInput.id = `item_remarks_${index}`;
    remarksInput.setAttribute('aria-label', `Remarks of Item ${index}`);
    remarksTd.appendChild(remarksInput);
    tr.appendChild(remarksTd);
    
    return tr;
  }

  // Generate 16 table rows by default
  if (tbody) {
    tbody.innerHTML = '';
    for (let i = 1; i <= 16; i++) {
      tbody.appendChild(createRow(i));
    }
  }

  // Date Auto-Tabbing Interactivity (forward + backspace backward)
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

    monthInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && monthInput.value.length === 0) {
        dayInput.focus();
      }
    });

    yearInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && yearInput.value.length === 0) {
        monthInput.focus();
      }
    });
  }

  // Enter key navigation between input fields for smooth mobile typing
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
      const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"])'));
      const currentIndex = inputs.indexOf(e.target);
      if (currentIndex > -1 && currentIndex < inputs.length - 1) {
        e.preventDefault();
        inputs[currentIndex + 1].focus();
      }
    }
  });

  // Mobile View Toggle Action (Mobile Fit View vs 100% A4 Paper View)
  if (viewToggleBtn && previewWrapper) {
    const viewToggleFull = viewToggleBtn.querySelector('.btn-text-full');
    const viewToggleMobile = document.getElementById('viewToggleMobileText');

    viewToggleBtn.addEventListener('click', () => {
      const isA4 = previewWrapper.classList.toggle('a4-mode');
      if (isA4) {
        if (viewToggleFull) viewToggleFull.textContent = 'Mobile View';
        if (viewToggleMobile) viewToggleMobile.textContent = 'Fit';
        showToast('📄 100% A4 paper view (swipe horizontally to inspect)');
      } else {
        if (viewToggleFull) viewToggleFull.textContent = 'A4 View';
        if (viewToggleMobile) viewToggleMobile.textContent = 'A4';
        showToast('📱 Responsive mobile view');
      }
    });
  }

  // Clear Form Action
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all fields in the Challan form?')) {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
          input.value = '';
        });
        showToast('Form cleared');
      }
    });
  }

  // Print Challan Action
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Save as PDF Action
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      alert("To Save as PDF:\n1. The system will open the print interface.\n2. In the 'Destination' selection, choose 'Save as PDF'.\n3. Click 'Save' and choose your folder location.");
      window.print();
    });
  }

  // Add Row Action
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      if (tbody) {
        const nextIndex = tbody.querySelectorAll('tr').length + 1;
        tbody.appendChild(createRow(nextIndex));
        showToast(`Added row ${nextIndex}`);
      }
    });
  }

  // Remove Row Action
  if (removeRowBtn) {
    removeRowBtn.addEventListener('click', () => {
      if (tbody) {
        const rows = tbody.querySelectorAll('tr');
        if (rows.length > 1) {
          const removedNum = rows.length;
          tbody.removeChild(rows[rows.length - 1]);
          showToast(`Removed row ${removedNum}`);
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
