// Variables globales
let currentItemToDelete = null;

// Función para abrir los diferentes modales
function openModal(type) {
  if (type === "add") {
    document.getElementById("addModal").style.display = "flex";
    document.getElementById("countryName").value = "";
    document.getElementById("countryCode").value = "";
    document.getElementById("countryDesc").value = "";
    document.getElementById("countryName").focus();
  } else if (type === "confirm") {
    document.getElementById("confirmModal").style.display = "flex";
  } else if (type === "error") {
    document.getElementById("errorModal").style.display = "flex";
  }
}

// Función para cerrar los diferentes modales
function closeModal(type) {
  if (type === "add") {
    document.getElementById("addModal").style.display = "none";
  } else if (type === "confirm") {
    document.getElementById("confirmModal").style.display = "none";
  } else if (type === "error") {
    document.getElementById("errorModal").style.display = "none";
  }
}

// Función para añadir un nuevo elemento a la lista
function addItem() {
  const name = document.getElementById("countryName").value.trim();
  const code = document.getElementById("countryCode").value.trim();
  const desc = document.getElementById("countryDesc").value.trim();

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

    // Añadir evento de clic a la descripción
    const descElement = div.querySelector(".item-desc");
    descElement.addEventListener("click", () => makeDescriptionEditable(div));

    // Añadir el nuevo país al array de datos
    countriesData.push({
      name: name,
      code: code,
      description: desc,
      isAllowDelete: true,
    });

    closeModal("add");
  } else {
    // Mostrar mensaje de error en un modal en lugar de alert
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-message";
    errorMsg.textContent = "Por favor, completa todos los campos";

    const modalContent = document.querySelector("#addModal .modal-content");

    // Eliminar mensaje de error anterior si existe
    const oldError = modalContent.querySelector(".error-message");
    if (oldError) {
      oldError.remove();
    }

    // Insertar mensaje de error antes de los botones
    modalContent.insertBefore(
      errorMsg,
      document.querySelector(".modal-buttons")
    );
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

  // Eliminar el event listener del campo de búsqueda
  // No necesitamos filtrado en este prototipo
  // document.getElementById("searchInput").addEventListener("input", function () { ... });

  // Cerrar los modales si se hace clic fuera de ellos
  window.addEventListener("click", (event) => {
    const addModal = document.getElementById("addModal");
    const confirmModal = document.getElementById("confirmModal");
    const errorModal = document.getElementById("errorModal");

    if (event.target === addModal) {
      closeModal("add");
    } else if (event.target === confirmModal) {
      closeModal("confirm");
    } else if (event.target === errorModal) {
      closeModal("error");
    }
  });

  // Permitir enviar el formulario con Enter en el modal de añadir
  const modalInputs = document.querySelectorAll("#addModal input");
  modalInputs.forEach((input) => {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addItem();
      }
    });
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
