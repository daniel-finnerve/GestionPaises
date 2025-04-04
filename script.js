// Variables globales
let currentItemToDelete = null
const countriesData = [
  {
    name: "Argentina",
    code: "AR",
    description: "Un país de América del Sur",
    isAllowDelete: false,
  },
  {
    name: "Brasil",
    code: "BR",
    description: "Un país de América del Sur",
    isAllowDelete: true,
  },
  {
    name: "Colombia",
    code: "CO",
    description: "Un país de América del Sur",
    isAllowDelete: true,
  },
]

// Función para inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos iniciales
  loadInitialData()

  // Get references to DOM elements
  const textInput = document.getElementById("textInput")
  const addButton = document.getElementById("addButton")
  const itemList = document.getElementById("itemList")

  // Add event listener to the button
  addButton.addEventListener("click", () => {
    addItem()
  })

  // Add event listener for the Enter key in the input field
  textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addItem()
    }
  })

  // Function to add a new item to the list
  // function addItem() {
  //   const text = textInput.value.trim()

  //   // Check if the input is not empty
  //   if (text !== "") {
  //     // Create new list item
  //     const li = document.createElement("li")

  //     // Create text span
  //     const textSpan = document.createElement("span")
  //     textSpan.textContent = text

  //     // Create delete button
  //     const deleteBtn = document.createElement("button")
  //     deleteBtn.textContent = "Delete"
  //     deleteBtn.className = "delete-btn"
  //     deleteBtn.addEventListener("click", () => {
  //       li.remove()
  //     })

  //     // Append elements to list item
  //     li.appendChild(textSpan)
  //     li.appendChild(deleteBtn)

  //     // Append list item to the list
  //     itemList.appendChild(li)

  //     // Clear the input field
  //     textInput.value = ""

  //     // Focus back on the input field
  //     textInput.focus()
  //   }
  // }
})

// Función para abrir los diferentes modales
function openModal(type) {
  if (type === "add") {
    document.getElementById("addModal").style.display = "flex"
    document.getElementById("countryName").value = ""
    document.getElementById("countryCode").value = ""
    document.getElementById("countryDesc").value = ""
    document.getElementById("countryName").focus()
  } else if (type === "confirm") {
    document.getElementById("confirmModal").style.display = "flex"
  } else if (type === "error") {
    document.getElementById("errorModal").style.display = "flex"
  }
}

// Función para cerrar los diferentes modales
function closeModal(type) {
  if (type === "add") {
    document.getElementById("addModal").style.display = "none"
  } else if (type === "confirm") {
    document.getElementById("confirmModal").style.display = "none"
  } else if (type === "error") {
    document.getElementById("errorModal").style.display = "none"
  }
}

// Función para añadir un nuevo elemento a la lista
function addItem() {
  const name = document.getElementById("countryName").value.trim()
  const code = document.getElementById("countryCode").value.trim()
  const desc = document.getElementById("countryDesc").value.trim()

  if (name && code && desc) {
    const list = document.getElementById("list")

    const div = document.createElement("div")
    div.className = "item"
    div.dataset.isAllowDelete = "true"

    div.innerHTML = `
      <div class="item-name">${name}</div>
      <div class="item-code">${code}</div>
      <div class="item-desc">${desc}</div>
      <span class='delete' onclick='removeItem(this)'>✖</span>
    `
    list.appendChild(div)

    // Añadir el nuevo país al array de datos
    countriesData.push({
      name: name,
      code: code,
      description: desc,
      isAllowDelete: true,
    })

    closeModal("add")
  } else {
    // Mostrar mensaje de error en un modal en lugar de alert
    const errorMsg = document.createElement("div")
    errorMsg.className = "error-message"
    errorMsg.textContent = "Por favor, completa todos los campos"

    const modalContent = document.querySelector("#addModal .modal-content")

    // Eliminar mensaje de error anterior si existe
    const oldError = modalContent.querySelector(".error-message")
    if (oldError) {
      oldError.remove()
    }

    // Insertar mensaje de error antes de los botones
    modalContent.insertBefore(errorMsg, document.querySelector(".modal-buttons"))
  }
}

// Función para eliminar un elemento de la lista
function removeItem(element) {
  const item = element.parentElement
  const isAllowDelete = item.dataset.isAllowDelete === "true"

  if (!isAllowDelete) {
    // Mostrar modal de error si no se puede eliminar
    openModal("error")
    return
  }

  // Guardar referencia al elemento a eliminar
  currentItemToDelete = item

  // Mostrar modal de confirmación
  openModal("confirm")
}

// Función para cargar los datos iniciales
function loadInitialData() {
  const list = document.getElementById("list")

  // Crear el encabezado de la lista
  const header = document.createElement("div")
  header.className = "list-header"
  header.innerHTML = `
    <div>País</div>
    <div>Código</div>
    <div>Descripción</div>
    <div></div>
  `
  list.appendChild(header)

  // Cargar los países desde el JSON
  countriesData.forEach((country) => {
    const div = document.createElement("div")
    div.className = "item"
    div.dataset.isAllowDelete = country.isAllowDelete.toString()

    const deleteClass = country.isAllowDelete === false ? "delete not-deletable" : "delete"

    div.innerHTML = `
      <div class="item-name">${country.name}</div>
      <div class="item-code">${country.code}</div>
      <div class="item-desc">${country.description}</div>
      <span class='${deleteClass}' onclick='removeItem(this)'>✖</span>
    `
    list.appendChild(div)
  })
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos iniciales
  loadInitialData()

  // Añadir funcionalidad a las pestañas
  const tabs = document.querySelectorAll(".tab")
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      tabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Añadir funcionalidad al campo de búsqueda
  document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const items = document.querySelectorAll(".item:not(.list-header)")

    items.forEach((item) => {
      const text = item.textContent.toLowerCase()
      if (text.includes(searchTerm)) {
        item.style.display = "grid"
      } else {
        item.style.display = "none"
      }
    })
  })

  // Cerrar los modales si se hace clic fuera de ellos
  window.addEventListener("click", (event) => {
    const addModal = document.getElementById("addModal")
    const confirmModal = document.getElementById("confirmModal")
    const errorModal = document.getElementById("errorModal")

    if (event.target === addModal) {
      closeModal("add")
    } else if (event.target === confirmModal) {
      closeModal("confirm")
    } else if (event.target === errorModal) {
      closeModal("error")
    }
  })

  // Permitir enviar el formulario con Enter en el modal de añadir
  const modalInputs = document.querySelectorAll("#addModal input")
  modalInputs.forEach((input) => {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        addItem()
      }
    })
  })

  // Configurar el botón de confirmación de eliminación
  document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
    if (currentItemToDelete) {
      currentItemToDelete.remove()
      closeModal("confirm")
      currentItemToDelete = null
    }
  })
})

