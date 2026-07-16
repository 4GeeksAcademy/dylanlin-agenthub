document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CONTROL DEL MODO OSCURO (Componente 3.1.3)
    // ==========================================
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const darkModeCircle = document.getElementById("dark-mode-circle");
    const htmlElement = document.documentElement;

    // Verificar preferencia previa guardada en localStorage
    if (localStorage.getItem("theme") === "dark") {
        htmlElement.classList.add("dark");
        darkModeCircle.classList.add("translate-x-5");
        darkModeToggle.classList.add("bg-indigo-600");
    }

    darkModeToggle.addEventListener("click", () => {
        if (htmlElement.classList.contains("dark")) {
            htmlElement.classList.remove("dark");
            darkModeCircle.classList.remove("translate-x-5");
            darkModeToggle.classList.remove("bg-indigo-600");
            localStorage.setItem("theme", "light");
        } else {
            htmlElement.classList.add("dark");
            darkModeCircle.classList.add("translate-x-5");
            darkModeToggle.classList.add("bg-indigo-600");
            localStorage.setItem("theme", "dark");
        }
    });

    // ==========================================
    // 2. FILTRADO Y BÚSQUEDA DE AGENTES (Componente 3.3.1)
    // ==========================================
    const inputBuscar = document.getElementById("buscar-agente");
    const selectModelo = document.getElementById("filtrar-modelo");
    const tablaFilas = document.querySelectorAll(".agente-fila");

    function filtrarAgentes() {
        const query = inputBuscar.value.toLowerCase().trim();
        const modeloSeleccionado = selectModelo.value;

        tablaFilas.forEach(fila => {
            const nombre = fila.children[0].textContent.toLowerCase();
            const modelo = fila.children[1].textContent;

            const coincideNombre = nombre.includes(query);
            const coincideModelo = modeloSeleccionado === "" || modelo === modeloSeleccionado;

            if (coincideNombre && coincideModelo) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        });
    }

    inputBuscar.addEventListener("input", filtrarAgentes);
    selectModelo.addEventListener("change", filtrarAgentes);

    // ==========================================
    // 3. MENÚ DE ACCIONES (Componente 3.3.3)
    // ==========================================
    const botonesAcciones = document.querySelectorAll(".menu-acciones-btn");

    botonesAcciones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const dropdown = btn.nextElementSibling;
            // Cerrar otros dropdowns abiertos
            document.querySelectorAll(".dropdown-acciones").forEach(d => {
                if (d !== dropdown) d.classList.add("hidden");
            });
            dropdown.classList.toggle("hidden");
        });
    });

    // Cerrar dropdowns si se hace clic fuera
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown-acciones").forEach(d => d.classList.add("hidden"));
    });

    // ==========================================
    // 4. MODAL CREACIÓN NUEVO AGENTE (Criterio 2)
    // ==========================================
    const btnNuevoAgente = document.getElementById("btn-nuevo-agente");
    const btnCerrarModal = document.getElementById("btn-cerrar-modal");
    const modalAgente = document.getElementById("modal-agente");
    const nuevoAgenteForm = document.getElementById("nuevo-agente-form");
    const listaAgentesBody = document.getElementById("lista-agentes-body");

    btnNuevoAgente.addEventListener("click", () => {
        modalAgente.classList.remove("hidden");
    });

    btnCerrarModal.addEventListener("click", () => {
        modalAgente.classList.add("hidden");
        nuevoAgenteForm.reset();
    });

    // Crear agente dinámicamente y agregarlo a la tabla
    nuevoAgenteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombreVal = document.getElementById("nuevo-agente-nombre").value.trim();
        const modeloVal = document.getElementById("nuevo-agente-modelo").value;

        if (nombreVal) {
            const nuevaFila = document.createElement("tr");
            nuevaFila.className = "agente-fila";
            nuevaFila.innerHTML = `
                <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">${nombreVal}</td>
                <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">${modeloVal}</td>
                <td class="px-6 py-4 text-sm">0</td>
                <td class="px-6 py-4">
                    <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Activo</span>
                </td>
                <td class="px-6 py-4 text-right relative">
                    <button class="menu-acciones-btn text-slate-400 hover:text-slate-600 font-bold px-2">•••</button>
                    <div class="dropdown-acciones hidden absolute right-6 mt-1 w-32 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg z-50 py-1 text-left">
                        <button class="block w-full px-4 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 text-rose-500 font-semibold">Pausar</button>
                    </div>
                </td>
            `;

            // Agregar evento dinámico al botón de la nueva fila
            const nuevoBtn = nuevaFila.querySelector(".menu-acciones-btn");
            nuevoBtn.addEventListener("click", (evt) => {
                evt.stopPropagation();
                const dropdown = nuevoBtn.nextElementSibling;
                document.querySelectorAll(".dropdown-acciones").forEach(d => {
                    if (d !== dropdown) d.classList.add("hidden");
                });
                dropdown.classList.toggle("hidden");
            });

            listaAgentesBody.appendChild(nuevaFila);
            
            // Cerrar modal
            modalAgente.classList.add("hidden");
            nuevoAgenteForm.reset();
        }
    });

    // ==========================================
    // 5. CONSOLA DE PRUEBAS / PLAYGROUND (Componente 3.4)
    // ==========================================
    const tempSlider = document.getElementById("prompt-temperature");
    const tempVal = document.getElementById("temp-val");
    const promptText = document.getElementById("prompt-text");
    const btnEjecutarPrompt = document.getElementById("btn-ejecutar-prompt");
    const terminalOutput = document.getElementById("terminal-output");
    const promptAgentSelect = document.getElementById("prompt-agent-select");

    // Mostrar temperatura dinámica
    tempSlider.addEventListener("input", (e) => {
        tempVal.textContent = e.target.value;
    });

    // Simulación de respuesta JSON en consola
    btnEjecutarPrompt.addEventListener("click", () => {
        const queryText = promptText.value.trim();
        const agenteSeleccionado = promptAgentSelect.value;
        const temperatura = tempSlider.value;

        if (!queryText) {
            terminalOutput.textContent = `[ERROR]: El prompt de entrada no puede estar vacío. Escribe una instrucción para iniciar.`;
            terminalOutput.classList.remove("text-emerald-400");
            terminalOutput.classList.add("text-rose-500");
            return;
        }

        // Simular llamada API
        terminalOutput.classList.remove("text-rose-500");
        terminalOutput.classList.add("text-emerald-400");
        terminalOutput.textContent = "Cargando respuesta del LLM...\n⌛ Estableciendo túnel de red seguro...";

        setTimeout(() => {
            const mockResponse = {
                status: "success",
                agent: agenteSeleccionado,
                config: {
                    temperature: parseFloat(temperatura),
                    max_tokens: 1024,
                    latency_ms: Math.floor(Math.random() * (900 - 300) + 300)
                },
                prompt: queryText,
                response: `[Agent Output] Procesé tu prompt con éxito. La temperatura actual de creatividad está fijada en ${temperatura}. Todo el tráfico de tokens ha sido auditado de forma segura.`
            };

            terminalOutput.textContent = JSON.stringify(mockResponse, null, 4);
        }, 1200);
    });

    // ==========================================
    // 6. OCULTAR/REVELAR API KEYS (Componente 3.5.2)
    // ==========================================
    const toggleButtons = document.querySelectorAll(".toggle-api-key");

    toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const input = btn.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                btn.textContent = "🙈";
            } else {
                input.type = "password";
                btn.textContent = "👁️";
            }
        });
    });

    // ==========================================
    // 7. LIMPIAR LOGS (Componente 3.6.2)
    // ==========================================
    const btnLimpiarLogs = document.getElementById("btn-limpiar-logs");
    const logsContainer = document.getElementById("logs-container");

    btnLimpiarLogs.addEventListener("click", () => {
        logsContainer.innerHTML = `
            <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm text-center">
                No hay alertas activas. El historial de logs ha sido purgado por el Administrador.
            </div>
        `;
    });

});