# Especificaciones de Producto: AgentHub

## 1. Descripción del Producto
**AgentHub** es una plataforma de administración centralizada (dashboard) diseñada para gestionar, monitorear y optimizar agentes de Inteligencia Artificial en entornos corporativos.

El **usuario administrador** es el Director de Operaciones de IA (AI Ops Manager) o el Líder Técnico de Integraciones de la empresa. Este rol requiere supervisar en tiempo real el rendimiento de los agentes, controlar los costos de consumo de tokens por LLM, asignar credenciales y claves de API, y ajustar los flujos de trabajo de los agentes activos para evitar fallos operativos.

---

## 2. Stack Tecnológico y Restricciones
*   **Maquetación y Estructura:** HTML5 Semántico.
*   **Estilos:** Tailwind CSS implementado exclusivamente a través de su CDN oficial (`https://cdn.tailwindcss.com`).
*   **Interactividad:** JavaScript Vanilla (JS nativo, ES6+), estructurado sin el uso de frameworks (no React, no Vue, no Angular).
*   **Persistencia:** Solo estados en memoria del lado del cliente (`client-side state`) y almacenamiento local temporal (`localStorage`) si es necesario para simular persistencia entre recargas.
*   **Backend:** Sin backend. Todo el flujo de datos e interactividad debe ser simulado con mocks hardcodeados.

---

## 3. Especificaciones por Sección

### Sección 3.1: Sidebar de Navegación Lateral (Persistente)
*   **Componente 3.1.1 - Menú de Navegación Semántico:** Un elemento `<nav>` vertical de ancho fijo (`w-64` en escritorio, colapsable en móviles) con fondo oscuro contrastante (`bg-slate-900`) que agrupe enlaces estructurados con iconos SVG para las 6 secciones principales.
*   **Componente 3.1.2 - Selector de Perfil de Administrador:** Un contenedor en la parte inferior del sidebar que muestre el avatar del administrador activo, su correo corporativo y un badge de estatus con la etiqueta "SuperAdmin".
*   **Componente 3.1.3 - Toggle de Modo Oscuro:** Un interruptor interactivo de tipo switch que, al activarse mediante un evento `click` de JS, añade o remueve la clase `.dark` del elemento raíz `<html>` para alternar la visualización estética de todo el panel.

### Sección 3.2: Dashboard Principal (Métricas y Actividad)
*   **Componente 3.2.1 - Cuadrícula de Tarjetas de Métricas:** Una cuadrícula responsive de 2x2 en pantallas medianas/grandes (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`) que muestre tarjetas de métricas clave (Agentes Activos, Costo de Tokens mensual, API Calls, y Tasa de Éxito). Cada tarjeta debe incluir un icono SVG único, una etiqueta de texto descriptivo y su valor numérico destacado en negrita.
*   **Componente 3.2.2 - Gráfico de Actividad Semanal:** Un contenedor de ancho completo (`w-full`) con bordes discontinuos y esquinas redondeadas (`border-dashed border-2 border-slate-300 bg-slate-50`) que muestre un marcador de posición centrado ("Gráfico de Consumo Semanal de Tokens") para simular la visualización de analíticas de consumo.
*   **Componente 3.2.3 - Historial de Eventos Recientes:** Una lista ordenada cronológicamente de las últimas acciones de los agentes (ej: "Agent_Customer_Support ejecutado con éxito", "Advertencia de límite de tokens en Agent_Marketing"). Cada elemento de la lista debe contar con un color de acento según su nivel de prioridad (Verde = Info, Amarillo = Advertencia, Rojo = Error).

### Sección 3.3: Lista y Gestión de Agentes
*   **Componente 3.3.1 - Filtro y Buscador:** Un campo de entrada de texto interactivo (`<input type="search">`) junto con un menú desplegable (`<select>`) para filtrar los agentes en tiempo real por su estado de actividad (Activo, Inactivo, Pausado, Error) o por su modelo de lenguaje asociado (GPT-4, Claude 3, Llama 3).
*   **Componente 3.3.2 - Tabla Dinámica de Agentes:** Una tabla responsiva (`<table class="min-w-full">`) con filas dedicadas a cada agente registrado, detallando su nombre, modelo asignado, tokens consumidos y un badge de estatus coloreado dinámicamente.
*   **Componente 3.3.3 - Menú de Acciones Rápidas:** Cada fila de la tabla de agentes contendrá un botón de tres puntos que, mediante JavaScript, despliega un menú contextual con opciones para "Editar", "Pausar" o "Eliminar" de forma simulada.

### Sección 3.4: Consola de Pruebas (Playground)
*   **Componente 3.4.1 - Consola Interactiva:** Un área de texto interactiva (`<textarea>`) donde el administrador puede simular el envío de un prompt a un agente específico seleccionado mediante un menú desplegable.
*   **Componente 3.4.2 - Ventana de Output de Terminal:** Un div simulando una consola de comandos con fondo negro (`bg-black text-emerald-400 font-mono`) donde se imprima en formato JSON la respuesta estructurada del agente tras hacer clic en un botón de "Ejecutar Prompt".
*   **Componente 3.4.3 - Selector de Temperatura:** Un deslizador (`<input type="range">` con valores de 0.0 a 1.0) que actualice de forma interactiva un indicador numérico flotante en pantalla, simulando el ajuste de la creatividad del LLM.

### Sección 3.5: Configuración de API Keys y Seguridad
*   **Componente 3.5.1 - Lista de Proveedores de LLM:** Una cuadrícula de tarjetas de proveedores de servicios (OpenAI, Anthropic, Cohere, Groq) con sus respectivos campos de entrada de contraseñas u ocultamiento de caracteres (`type="password"`) para almacenar sus claves API de manera simulada.
*   **Componente 3.5.2 - Botón Revelador de Claves (Toggle Visibility):** Un icono de ojo interactivo junto a cada input de API Key que alterne dinámicamente el atributo de visualización del input entre `type="password"` y `type="text"` mediante JS.
*   **Componente 3.5.3 - Registro de Cuota Máxima mensual:** Un control de tipo rango numérico (`<input type="number">`) para establecer un límite de gasto mensual en USD por proveedor de servicios de IA.

### Sección 3.6: Centro de Notificaciones y Logs
*   **Componente 3.6.1 - Panel de Mensajería en Tiempo Real:** Un feed persistente que liste los errores de ejecución de los agentes o alertas críticas del sistema.
*   **Componente 3.6.2 - Botón de Limpieza General de Logs:** Un botón destacado que, al ser clickeado, limpie en memoria los elementos del feed y actualice la interfaz de usuario con un estado de "Sin alertas pendientes".
*   **Componente 3.6.3 - Suscripción por Correo:** Un mini-formulario de registro que valide un correo electrónico y guarde en `localStorage` la preferencia de alerta del usuario.

---

## 4. Inventario de Componentes UI Reutilizables
Para asegurar un código mantenible y modular con Tailwind CSS, se define el uso de las siguientes clases de componentes reutilizables:

| Componente | Clases Base de Tailwind | Descripción del Comportamiento / Estructura |
| :--- | :--- | :--- |
| **Sidebar Link** | `flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition` | Enlaces dinámicos con hover de transición rápida. |
| **Métrica Card** | `bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center` | Tarjeta con sombra suave para métricas del dashboard. |
| **Estatus Badge**| `px-2 py-1 text-xs font-semibold rounded-full` | Variante verde (`bg-emerald-100 text-emerald-800`) para estados exitosos/activos. |
| **Acciones Dropdown** | `absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden` | Menú desplegable absoluto activado por evento click. |
| **Modal Genérico** | `fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center hidden` | Ventana emergente con fondo oscurecido para confirmaciones. |
| **Primary Button** | `bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl transition` | Botón por defecto para acciones principales del panel. |

---

## 5. Criterios de Aceptación
1. **Comportamiento Interactividad (Dropdowns):** Al hacer clic en el botón de acciones rápidas de un agente, el menú flotante debe aparecer inmediatamente. Si se hace clic en cualquier otra área exterior de la pantalla, el menú debe cerrarse.
2. **Comportamiento Interactividad (Modales):** Al presionar el botón "Crear Nuevo Agente", se debe remover la clase `hidden` del modal genérico en pantalla. Al presionar "Cancelar" o el botón de cerrar (`X`), el modal debe volver a ocultarse, limpiando los valores de los inputs.
3. **Comportamiento Interactividad (Modo Oscuro):** Al hacer clic en el toggle de modo oscuro en el sidebar, el fondo de todo el dashboard debe cambiar inmediatamente de `bg-slate-50` (claro) a `bg-slate-950` (oscuro) modificando las clases correspondientes con el prefijo `dark:`.
4. **Validación del Playground:** El botón de "Ejecutar Prompt" debe deshabilitarse temporalmente si el área de texto está vacía o si el usuario no ha seleccionado un agente válido del selector desplegable.
