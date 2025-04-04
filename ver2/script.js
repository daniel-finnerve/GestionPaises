// Variables globales
let currentItemToDelete = null;

// Función para abrir los diferentes modales
function openModal(type) {
  if (type === "confirm") {
    document.getElementById("confirmModal").style.display = "flex";
  } else if (type === "error") {
    document.getElementById("errorModal").style.display = "flex";
  }
}

// Función para cerrar los diferentes modales
function closeModal(type) {
  if (type === "confirm") {
    document.getElementById("confirmModal").style.display = "none";
  } else if (type === "error") {
    document.getElementById("errorModal").style.display = "none";
  }
}

// Función para añadir un nuevo elemento a la lista
function addItem() {
  const name = document.getElementById("searchInput").value.trim();
  const code = document.getElementById("countryCode").value.trim();
  const desc = document.getElementById("countryDesc").value.trim();

  // Remove previous error message if it exists
  const oldError = document.querySelector(".error-message-inline");
  if (oldError) {
    oldError.remove();
  }

  if (name && code && desc) {
    const list = document.getElementById("list");

    const div = document.createElement("div");
    div.className = "item";
    div.dataset.isAllowDelete = "true";

    div.innerHTML = `
      <div class="item-name">${name}</div>
      <div class="item-code">${code}</div>
      <div class="item-desc">${desc}</div>
      <span class='delete' onclick='removeItem(this)'>✖</span>
    `;
    list.appendChild(div);

    // Add click event to make description editable
    const descElement = div.querySelector(".item-desc");
    descElement.addEventListener("click", () => makeDescriptionEditable(div));

    // Add the new country to the data array
    countriesData.push({
      name: name,
      code: code,
      description: desc,
      isAllowDelete: true,
    });

    // Clear input fields after adding
    document.getElementById("searchInput").value = "";
    document.getElementById("countryCode").value = "";
    document.getElementById("countryDesc").value = "";
  } else {
    // Show inline error message
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message-inline";
    errorMsg.textContent = "Por favor, completa todos los campos";

    // Cambiar esta línea para usar el segundo input-container en lugar de .add-item-container
    const container = document.querySelectorAll(".input-container")[1];
    container.appendChild(errorMsg);
  }
}

// Función para eliminar un elemento de la lista
function removeItem(element) {
  const item = element.parentElement;
  const isAllowDelete = item.dataset.isAllowDelete === "true";

  if (!isAllowDelete) {
    // Mostrar modal de error si no se puede eliminar
    openModal("error");
    return;
  }

  // Guardar referencia al elemento a eliminar
  currentItemToDelete = item;

  // Mostrar modal de confirmación
  openModal("confirm");
}

// Función para cargar los datos iniciales
function loadInitialData() {
  const list = document.getElementById("list");

  // Cargar los países desde el JSON
  countriesData.forEach((country) => {
    const div = document.createElement("div");
    div.className = "item";
    div.dataset.isAllowDelete = country.isAllowDelete.toString();

    const deleteClass =
      country.isAllowDelete === false ? "delete not-deletable" : "delete";

    div.innerHTML = `
      <div class="item-name">${country.name}</div>
      <div class="item-code">${country.code}</div>
      <div class="item-desc">${country.description}</div>
      <span class='${deleteClass}' onclick='removeItem(this)'>✖</span>
    `;
    list.appendChild(div);

    // Añadir evento de clic a la descripción
    const descElement = div.querySelector(".item-desc");
    descElement.addEventListener("click", () => makeDescriptionEditable(div));
  });
}

// Añadir esta función para hacer editable la descripción
function makeDescriptionEditable(element) {
  const descDiv = element.querySelector(".item-desc");
  const currentText =
    descDiv.textContent === "Agregar Descripción" ? "" : descDiv.textContent;

  // Crear el input y establecer su valor
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-desc-input";

  // Reemplazar el div con el input
  descDiv.innerHTML = "";
  descDiv.appendChild(input);
  input.focus();

  // Función para guardar los cambios
  function saveChanges() {
    const newValue = input.value.trim();

    // Si el valor está vacío, establecer un placeholder
    const finalValue = newValue || "Agregar Descripción";

    // Actualizar el DOM
    descDiv.innerHTML = finalValue;

    // Actualizar el array de datos
    const itemIndex = Array.from(document.querySelectorAll(".item")).indexOf(
      element
    );
    if (itemIndex !== -1 && countriesData[itemIndex]) {
      countriesData[itemIndex].description = finalValue;
    }
  }

  // Guardar al presionar Enter
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveChanges();
      input.blur();
    }
  });

  // Guardar al hacer clic fuera
  input.addEventListener("blur", () => {
    saveChanges();
  });
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos iniciales
  loadInitialData();

  // Añadir funcionalidad a las pestañas
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Eliminar completamente el event listener para searchInput
  // No necesitamos filtrado en este prototipo

  // Cerrar los modales si se hace clic fuera de ellos
  window.addEventListener("click", (event) => {
    const confirmModal = document.getElementById("confirmModal");
    const errorModal = document.getElementById("errorModal");

    if (event.target === confirmModal) {
      closeModal("confirm");
    } else if (event.target === errorModal) {
      closeModal("error");
    }
  });

  // Configurar el botón de confirmación de eliminación
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (currentItemToDelete) {
      currentItemToDelete.remove();
      closeModal("confirm");
      currentItemToDelete = null;
    }
  });
});

// Asegúrate de eliminar también las funciones filterList y showAllItems
// si las has añadido previamente y no se usan en ningún otro lugar
