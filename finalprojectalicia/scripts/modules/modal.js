/* Modal Module - Accessible HTML5 Modal dialog controller*/
export function initModalControllers() {
    const modal = document.getElementById('product-detail-modal');
    const closeboton = document.getElementById('close-modal-boton');

    if (modal && closeboton) {
        // Accessible event tracking
        closeboton.addEventListener('click', () => {
            modal.close();
        });

        // Close on click outside modal backdrop
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    }
}

export function openProductModal(product) {
    const modal = document.getElementById('product-detail-modal');
    const modalContainer = document.getElementById('modal-dynamic-content');

    if (!modal || !modalContainer) return;

    // Use of template literals representing four distinct product properties
    modalContainer.innerHTML = `
    <div class="modal-grid-detail">
      <span class="modal-category">${product.category}</span>
      <h3 id="modal-title">${product.name}</h3>
      <p class="modal-price">${product.price}</p>
      <p class="modal-desc">${product.description}</p>
      
      <div class="modal-specs">
        <p><strong>Curing Schedule:</strong> ${product.cureTime}</p>
        <p><strong>Smoke Wood profile:</strong> ${product.woodType}</p>
      </div>
    </div>
  `;

    modal.showModal();
}