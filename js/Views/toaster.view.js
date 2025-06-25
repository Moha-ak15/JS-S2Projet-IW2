export function afficherToaster(message, couleur = "success") {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-bg-${couleur}  show position-fixed bottom-0 end-0 m-3`;
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}