// ============================================
// ARCHIVO PRINCIPAL DE LA APLICACIÓN
// ============================================
// Este archivo contiene toda la lógica de la aplicación:
// - Carga de productos desde menu.json
// - Gestión del carrito de compras
// - Cálculo de totales
// - Envío de pedidos a WhatsApp

// ============================================
// VARIABLES GLOBALES
// ============================================
// Estas variables almacenan el estado de la aplicación

let menuData = null; // Aquí guardaremos los datos del menú (productos y categorías)
let carrito = []; // Array que almacena los productos agregados al carrito
let categoriaActiva = 'todas'; // Categoría actualmente seleccionada para filtrar

// ============================================
// FUNCIÓN: Inicializar la Aplicación
// ============================================
// Esta función se ejecuta cuando la página carga completamente.
// Su trabajo es preparar todo para que la app funcione correctamente.

function inicializarApp() {
    console.log('🚀 Inicializando aplicación...');
    
    // Paso 1: Aplicar la configuración del negocio (colores, logo, nombre)
    aplicarConfiguracion();
    
    // Paso 2: Cargar el menú de productos desde menu.json
    cargarMenu();
    
    // Paso 3: Configurar los event listeners (botones, clicks, etc.)
    configurarEventListeners();
}

// ============================================
// FUNCIÓN: Aplicar Configuración del Negocio
// ============================================
// Esta función toma los valores de CONFIG (config.js) y los aplica
// visualmente en la página: colores, logo, nombre del negocio.

function aplicarConfiguracion() {
    // Aplicar el nombre del negocio en el header
    const nombreElemento = document.getElementById('nombre-negocio');
    if (nombreElemento && CONFIG.nombreNegocio) {
        nombreElemento.textContent = CONFIG.nombreNegocio;
    }
    
    // Aplicar el logo del negocio
    const logoElemento = document.getElementById('logo-negocio');
    if (logoElemento && CONFIG.logo) {
        logoElemento.src = CONFIG.logo;
        logoElemento.alt = CONFIG.nombreNegocio;
    }
    
    // Aplicar los colores personalizados usando variables CSS
    const root = document.documentElement;
    root.style.setProperty('--color-primario', CONFIG.colores.primario);
    root.style.setProperty('--color-secundario', CONFIG.colores.secundario);
    root.style.setProperty('--color-fondo', CONFIG.colores.fondo);
    root.style.setProperty('--color-texto', CONFIG.colores.texto);
    
    // Aplicar colores a elementos específicos
    const btnEnviar = document.getElementById('btn-enviar-whatsapp');
    if (btnEnviar) {
        btnEnviar.style.backgroundColor = CONFIG.colores.primario;
    }
    
    // Cambiar el título de la página
    document.title = `Menú Digital - ${CONFIG.nombreNegocio}`;
}

// ============================================
// FUNCIÓN: Cargar Menú desde menu.json
// ============================================
// Esta función lee el archivo menu.json usando fetch() y guarda los datos en la variable menuData.
// fetch() es una función de JavaScript que permite hacer peticiones HTTP para obtener datos.
// Luego llama a otras funciones para mostrar los productos en pantalla.

async function cargarMenu() {
    try {
        // fetch() hace una petición HTTP para obtener el archivo menu.json
        // await espera a que la petición termine antes de continuar
        const respuesta = await fetch('menu.json');
        
        // Verificar que la respuesta sea exitosa (código 200)
        if (!respuesta.ok) {
            throw new Error(`Error al cargar menu.json: ${respuesta.status}`);
        }
        
        // .json() convierte la respuesta (texto) en un objeto JavaScript
        menuData = await respuesta.json();
        console.log('✅ Menú cargado correctamente:', menuData);
        
        // Ahora que tenemos los datos, mostramos las categorías y productos
        mostrarCategorias();
        mostrarProductos();
        
    } catch (error) {
        console.error('❌ Error al cargar menu.json:', error);
        alert('Error al cargar el menú. Por favor, verifica que el archivo menu.json exista y esté bien formateado.');
    }
}

// ============================================
// FUNCIÓN: Mostrar Categorías
// ============================================
// Esta función crea los botones de filtro de categorías.
// Toma las categorías de menuData y crea un botón para cada una.

function mostrarCategorias() {
    const contenedorFiltros = document.getElementById('filtros-categorias');
    
    if (!contenedorFiltros || !menuData || !menuData.categorias) {
        return;
    }
    
    // Limpiar el contenedor antes de agregar nuevos botones
    contenedorFiltros.innerHTML = '';
    
    // Crear botón "Todas" para mostrar todos los productos
    const btnTodas = document.createElement('button');
    btnTodas.className = 'categoria-btn px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all';
    btnTodas.textContent = '🍕 Todas';
    btnTodas.dataset.categoria = 'todas';
    btnTodas.onclick = () => filtrarPorCategoria('todas');
    contenedorFiltros.appendChild(btnTodas);
    
    // Crear un botón para cada categoría del menú
    menuData.categorias.forEach(categoria => {
        const btn = document.createElement('button');
        btn.className = 'categoria-btn px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all';
        btn.textContent = `${categoria.icono} ${categoria.nombre}`;
        btn.dataset.categoria = categoria.id;
        btn.onclick = () => filtrarPorCategoria(categoria.id);
        contenedorFiltros.appendChild(btn);
    });
    
    // Aplicar estilo al botón activo inicial
    actualizarEstiloCategorias();
}

// ============================================
// FUNCIÓN: Filtrar Productos por Categoría
// ============================================
// Esta función se ejecuta cuando el usuario hace clic en un botón de categoría.
// Oculta los productos que no pertenecen a la categoría seleccionada.

function filtrarPorCategoria(categoriaId) {
    categoriaActiva = categoriaId;
    mostrarProductos(); // Vuelve a mostrar los productos, pero filtrados
    actualizarEstiloCategorias(); // Actualiza qué botón está activo
}

// ============================================
// FUNCIÓN: Actualizar Estilo de Botones de Categoría
// ============================================
// Esta función cambia el estilo visual del botón de categoría activo.
// El botón activo se ve diferente (más grande, con sombra, etc.)

function actualizarEstiloCategorias() {
    const botones = document.querySelectorAll('.categoria-btn');
    
    botones.forEach(btn => {
        const categoriaId = btn.dataset.categoria;
        
        if (categoriaId === categoriaActiva) {
            // Estilo para el botón activo
            btn.style.backgroundColor = CONFIG.colores.primario;
            btn.style.color = CONFIG.colores.textoClaro;
            btn.classList.add('categoria-activa');
        } else {
            // Estilo para botones inactivos
            btn.style.backgroundColor = '#E5E7EB';
            btn.style.color = '#374151';
            btn.classList.remove('categoria-activa');
        }
    });
}

// ============================================
// FUNCIÓN: Mostrar Productos
// ============================================
// Esta función toma los productos de menuData y los muestra en pantalla.
// Solo muestra los productos de la categoría activa (o todos si está en "todas").

function mostrarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    const sinProductos = document.getElementById('sin-productos');
    
    if (!contenedor || !menuData || !menuData.productos) {
        return;
    }
    
    // Limpiar el contenedor antes de agregar nuevos productos
    contenedor.innerHTML = '';
    
    // Filtrar productos según la categoría activa
    let productosFiltrados = menuData.productos;
    
    if (categoriaActiva !== 'todas') {
        // Si hay una categoría seleccionada, solo mostrar productos de esa categoría
        productosFiltrados = menuData.productos.filter(
            producto => producto.categoria === categoriaActiva
        );
    }
    
    // También filtrar solo productos disponibles
    productosFiltrados = productosFiltrados.filter(producto => producto.disponible);
    
    // Si no hay productos, mostrar mensaje
    if (productosFiltrados.length === 0) {
        contenedor.classList.add('hidden');
        if (sinProductos) sinProductos.classList.remove('hidden');
        return;
    }
    
    // Si hay productos, ocultar el mensaje y mostrar el contenedor
    contenedor.classList.remove('hidden');
    if (sinProductos) sinProductos.classList.add('hidden');
    
    // Crear una tarjeta (card) para cada producto
    productosFiltrados.forEach(producto => {
        const card = crearCardProducto(producto);
        contenedor.appendChild(card);
    });
}

// ============================================
// FUNCIÓN: Crear Tarjeta de Producto
// ============================================
// Esta función crea el HTML de una tarjeta de producto.
// Recibe un objeto producto y devuelve un elemento HTML listo para mostrar.

function crearCardProducto(producto) {
    // Crear el contenedor principal de la tarjeta
    const card = document.createElement('div');
    card.className = 'producto-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow';
    
    // Crear la imagen del producto
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    img.className = 'w-full h-48 object-cover';
    
    // Crear el contenedor del contenido (texto, precio, botón)
    const contenido = document.createElement('div');
    contenido.className = 'p-4';
    
    // Nombre del producto
    const nombre = document.createElement('h3');
    nombre.className = 'text-lg font-bold text-gray-800 mb-1';
    nombre.textContent = producto.nombre;
    
    // Descripción del producto
    const descripcion = document.createElement('p');
    descripcion.className = 'text-sm text-gray-600 mb-3';
    descripcion.textContent = producto.descripcion;
    
    // Contenedor para precio y botón
    const footer = document.createElement('div');
    footer.className = 'flex items-center justify-between';
    
    // Precio del producto (formateado como moneda)
    const precio = document.createElement('span');
    precio.className = 'text-xl font-bold';
    precio.style.color = CONFIG.colores.primario;
    // Mostrar precio base o 'Desde $...' para variantes si es necesario
    if (producto.tipo === 'variante') {
        const base = Number(producto.precio || 0);
        if (base > 0) {
            precio.textContent = formatearPrecio(base);
        } else if (producto.variantes && producto.variantes.length) {
            const minVariant = producto.variantes.reduce((min, v) => {
                const p = Number(v.precio || Infinity);
                return p < min ? p : min;
            }, Infinity);
            if (minVariant === Infinity) {
                precio.textContent = formatearPrecio(0);
            } else {
                precio.textContent = `Desde ${formatearPrecio(minVariant)}`;
            }
        } else {
            precio.textContent = formatearPrecio(0);
        }
    } else {
        precio.textContent = formatearPrecio(producto.precio);
    }
    
    // Botón "Agregar al Carrito"
    const btnAgregar = document.createElement('button');
    btnAgregar.className = 'px-4 py-2 rounded-lg font-semibold text-white btn-hover';
    btnAgregar.style.backgroundColor = CONFIG.colores.primario;
    btnAgregar.innerHTML = '<i class="fas fa-plus mr-1"></i>Agregar';
    btnAgregar.onclick = () => agregarAlCarrito(producto);
    
    // Ensamblar todos los elementos
    footer.appendChild(precio);
    footer.appendChild(btnAgregar);
    
    contenido.appendChild(nombre);
    contenido.appendChild(descripcion);
    contenido.appendChild(footer);
    
    card.appendChild(img);
    card.appendChild(contenido);
    
    return card;
}

// ============================================
// FUNCIÓN: Formatear Precio
// ============================================
// Esta función toma un número (precio) y lo formatea como moneda.
// Ejemplo: 2500 → "$2.500"

function formatearPrecio(precio) {
    // Convertir el número a string y agregar puntos como separadores de miles
    return `$${precio.toLocaleString('es-AR')}`;
}

// ============================================
// FUNCIÓN: Agregar Producto al Carrito
// ============================================
// Esta función maneja el click en 'Agregar'.
// - Si tipo === 'simple' -> agrega directo
// - Si tipo === 'variante' o 'adicionales' -> abre modal para seleccionar opciones

let modalProductoActual = null; // Producto que se está configurando en el modal
let modalCounterState = {}; // Estado temporal para controles tipo contador (index -> cantidad)

function agregarAlCarrito(producto) {
    if (!producto) return;

    // Si el producto es simple, comportamiento previo (id como string)
    if (producto.tipo === 'simple' || !producto.tipo) {
        const id = String(producto.id);
        const itemExistente = carrito.find(item => item.id === id);
        if (itemExistente) {
            itemExistente.cantidad += 1;
        } else {
            carrito.push({
                id: id,
                baseId: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }
        actualizarCarrito();
        mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        return;
    }

    // Si es variante o tiene adicionales, abrir modal para seleccionar opciones
    if (producto.tipo === 'variante' || producto.tipo === 'adicionales') {
        abrirModalOpciones(producto);
        return;
    }

    // Fallback: agregar como simple
    const id = String(producto.id);
    carrito.push({ id: id, baseId: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    actualizarCarrito();
    mostrarNotificacion(`${producto.nombre} agregado al carrito`);
}

// ============================================
// FUNCIONES DEL MODAL (abrir, cerrar, confirmar)
// ============================================
function abrirModalOpciones(producto) {
    modalProductoActual = producto;
    const modal = document.getElementById('modal-opciones');
    const modalTitle = document.getElementById('modal-title');
    const modalOptions = document.getElementById('modal-options');
    const btnConfirm = document.getElementById('modal-confirm');
    const btnCancel = document.getElementById('modal-cancel');
    const btnClose = document.getElementById('modal-close');

    if (!modal || !modalTitle || !modalOptions) return;

    modalTitle.textContent = producto.nombre;
    modalOptions.innerHTML = '';

    // Renderizar variantes (radio) o adicionales (checkboxes)
    if (producto.tipo === 'variante' && producto.variantes && producto.variantes.length > 0) {
        const group = document.createElement('div');
        group.className = 'space-y-2';
        producto.variantes.forEach((v, idx) => {
            const id = `modal-variant-${idx}`;
            const label = document.createElement('label');
            label.className = 'flex items-center space-x-3';
            label.innerHTML = `<input type="radio" name="modal-variant" id="${id}" value="${idx}" data-price="${v.precio}" class="form-radio h-4 w-4 text-green-600"><span>${v.nombre} — ${formatearPrecio(v.precio)}</span>`;
            group.appendChild(label);
        });
        modalOptions.appendChild(group);
    } else if (producto.tipo === 'adicionales' && producto.adicionales && producto.adicionales.length > 0) {
        // Si el producto usa control tipo 'contador', renderizamos botones - / cantidad / + por sabor
        if (producto.control === 'contador') {
            const subtitle = document.createElement('h3');
            subtitle.className = 'text-md font-semibold text-gray-700 mb-2';
            subtitle.textContent = 'Elegí la cantidad por sabor:';
            modalOptions.appendChild(subtitle);

            const list = document.createElement('div');
            list.className = 'space-y-3';
            // Inicializar estado
            modalCounterState = {};

            producto.adicionales.forEach((a, idx) => {
                modalCounterState[idx] = 0;

                const row = document.createElement('div');
                row.className = 'flex items-center justify-between';

                const nombreSpan = document.createElement('span');
                nombreSpan.className = 'text-gray-800';
                nombreSpan.textContent = a.nombre;

                const controls = document.createElement('div');
                controls.className = 'flex items-center gap-2';

                const btnMinus = document.createElement('button');
                btnMinus.className = 'w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center';
                btnMinus.textContent = '-';

                const spanCount = document.createElement('span');
                spanCount.className = 'w-8 text-center font-semibold';
                spanCount.textContent = '0';

                const btnPlus = document.createElement('button');
                btnPlus.className = 'w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center';
                btnPlus.textContent = '+';

                btnMinus.onclick = () => {
                    if (modalCounterState[idx] > 0) {
                        modalCounterState[idx] -= 1;
                        spanCount.textContent = modalCounterState[idx];
                    }
                };

                btnPlus.onclick = () => {
                    modalCounterState[idx] += 1;
                    spanCount.textContent = modalCounterState[idx];
                };

                controls.appendChild(btnMinus);
                controls.appendChild(spanCount);
                controls.appendChild(btnPlus);

                row.appendChild(nombreSpan);
                row.appendChild(controls);

                list.appendChild(row);
            });

            modalOptions.appendChild(list);

        } else {
            // Mostrar título y checkboxes (adicionales tradicionales)
            const subtitle = document.createElement('h3');
            subtitle.className = 'text-md font-semibold text-gray-700 mb-2';
            subtitle.textContent = 'Agregá tus Adicionales:';
            modalOptions.appendChild(subtitle);

            const group = document.createElement('div');
            group.className = 'space-y-2';
            producto.adicionales.forEach((a, idx) => {
                const id = `modal-add-${idx}`;
                const label = document.createElement('label');
                label.className = 'flex items-center space-x-3';
                const priceText = (Number(a.precio) > 0) ? ` — ${formatearPrecio(a.precio)}` : '';
                label.innerHTML = `<input type="checkbox" id="${id}" data-index="${idx}" data-price="${a.precio}" class="form-checkbox h-4 w-4 text-green-600"><span>${a.nombre}${priceText}</span>`;
                group.appendChild(label);
            });
            modalOptions.appendChild(group);
        }
    } else {
        modalOptions.textContent = 'No hay opciones disponibles';
    }

    // Abrir modal
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    // Asignar handlers
    btnConfirm.onclick = confirmarModalOpciones;
    btnCancel.onclick = cerrarModalOpciones;
    btnClose.onclick = cerrarModalOpciones;
}

function cerrarModalOpciones() {
    const modal = document.getElementById('modal-opciones');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    modalProductoActual = null;
    // Limpiar estado temporal de contadores
    modalCounterState = {};
}

function confirmarModalOpciones() {
    if (!modalProductoActual) return;
    const producto = modalProductoActual;
    let finalPrice = Number(producto.precio || 0);
    let nameSuffix = [];

    if (producto.tipo === 'variante') {
        const radios = document.querySelectorAll('input[name="modal-variant"]');
        const selected = Array.from(radios).find(r => r.checked);
        if (!selected) {
            alert('Por favor, elige una opción.');
            return;
        }
        const idx = parseInt(selected.value, 10);
        const variant = producto.variantes[idx];
        nameSuffix.push(variant.nombre);
        // Para variantes el precio seleccionado REEMPLAZA al precio base (no se suman)
        finalPrice = (Number(variant.precio) > 0) ? Number(variant.precio) : Number(producto.precio || 0);
    } else if (producto.tipo === 'adicionales') {
        if (producto.control === 'contador') {
            // Leer estado de contadores
            const counts = modalCounterState || {};
            const selected = [];
            let totalUnits = 0;
            producto.adicionales.forEach((a, idx) => {
                const cnt = Number(counts[idx] || 0);
                if (cnt > 0) {
                    selected.push({ nombre: a.nombre, cantidad: cnt });
                    totalUnits += cnt;
                }
            });

            if (selected.length === 0) {
                alert('Por favor, indica la cantidad para al menos un sabor.');
                return;
            }

            // Construir resumen: 'Carne x3, Pollo x2, ...'
            const summaryParts = selected.map(s => `${s.nombre} x${s.cantidad}`);
            const summary = summaryParts.join(', ');
            nameSuffix.push(summary);

            // Precio: heurística mínima
            // Si el producto indica unidad en el nombre (p.e. 'Unidad'), multiplicar por unidades.
            // Ej: 'Empanadas (Unidad)' precio 2000 -> total = count * 2000
            const basePrice = Number(producto.precio || 0);
            if (producto.nombre && producto.nombre.toLowerCase().includes('unidad')) {
                finalPrice = basePrice * totalUnits;
            } else {
                // Por defecto mantener el precio base (ej: 'Docena de Empanadas' mantiene su precio)
                finalPrice = basePrice;
            }

        } else {
            const checkboxes = document.querySelectorAll('#modal-options input[type="checkbox"]');
            let extras = [];
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const idx = parseInt(cb.getAttribute('data-index'), 10);
                    const extra = producto.adicionales[idx];
                    if (extra) extras.push(extra);
                }
            });
            if (extras.length > 0) {
                const extrasNames = extras.map(e => e.nombre);
                nameSuffix.push(...extrasNames);
                const extrasTotal = extras.reduce((s, e) => s + Number(e.precio || 0), 0);
                finalPrice = (Number(producto.precio || 0) + extrasTotal);
            } else {
                finalPrice = Number(producto.precio || 0);
            }
        }
    }

    const uidParts = [producto.id];
    if (nameSuffix.length > 0) uidParts.push(nameSuffix.join(','));
    const uid = uidParts.join('|');

    const existing = carrito.find(i => i.id === uid);
    const displayName = nameSuffix.length > 0 ? `${producto.nombre} - ${nameSuffix.join(', ')}` : producto.nombre;

    if (existing) {
        existing.cantidad += 1;
    } else {
        carrito.push({
            id: uid,
            baseId: producto.id,
            nombre: displayName,
            precio: finalPrice,
            cantidad: 1
        });
    }

    actualizarCarrito();
    mostrarNotificacion(`${displayName} agregado al carrito`);
    cerrarModalOpciones();
} 

// ============================================
// FUNCIÓN: Actualizar Visualización del Carrito
// ============================================
// Esta función actualiza todo lo relacionado con el carrito:
// - La lista de items en el carrito flotante
// - El total a pagar
// - El badge con la cantidad de items
// - Habilita/deshabilita el botón de enviar

function actualizarCarrito() {
    actualizarItemsCarrito(); // Actualizar la lista de productos
    actualizarTotal(); // Actualizar el total a pagar
    actualizarBadgeCarrito(); // Actualizar el número en el icono del carrito
    actualizarBotonEnviar(); // Habilitar/deshabilitar botón de enviar
}

// ============================================
// FUNCIÓN: Actualizar Items del Carrito
// ============================================
// Esta función muestra la lista de productos que están en el carrito.
// Crea un elemento HTML por cada producto en el carrito.

function actualizarItemsCarrito() {
    const contenedor = document.getElementById('items-carrito');
    const carritoVacio = document.getElementById('carrito-vacio');
    
    if (!contenedor) return;
    
    // Limpiar el contenedor
    contenedor.innerHTML = '';
    
    // Si el carrito está vacío, mostrar mensaje
    if (carrito.length === 0) {
        if (carritoVacio) {
            contenedor.appendChild(carritoVacio);
            carritoVacio.classList.remove('hidden');
        }
        return;
    }
    
    // Si hay items, ocultar el mensaje de vacío
    if (carritoVacio) carritoVacio.classList.add('hidden');
    
    // Crear un elemento por cada producto en el carrito
    carrito.forEach(item => {
        const itemElement = crearItemCarrito(item);
        contenedor.appendChild(itemElement);
    });
}

// ============================================
// FUNCIÓN: Crear Item del Carrito
// ============================================
// Esta función crea el HTML de un item individual del carrito.
// Incluye nombre, precio unitario, cantidad y botones para modificar.

function crearItemCarrito(item) {
    // Contenedor principal del item
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2';
    
    // Información del producto (nombre y precio unitario)
    const info = document.createElement('div');
    info.className = 'flex-1';
    
    const nombre = document.createElement('p');
    nombre.className = 'font-semibold text-gray-800';
    nombre.textContent = item.nombre;
    
    const precioUnitario = document.createElement('p');
    precioUnitario.className = 'text-sm text-gray-600';
    precioUnitario.textContent = `${formatearPrecio(item.precio)} c/u`;
    
    info.appendChild(nombre);
    info.appendChild(precioUnitario);
    
    // Contenedor de controles (cantidad y botones)
    const controles = document.createElement('div');
    controles.className = 'flex items-center space-x-3';
    
    // Botón para disminuir cantidad
    const btnMenos = document.createElement('button');
    btnMenos.className = 'w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold';
    btnMenos.textContent = '-';
    btnMenos.onclick = () => modificarCantidad(item.id, -1);
    
    // Input para mostrar/editar cantidad
    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.value = item.cantidad;
    inputCantidad.min = '1';
    inputCantidad.className = 'cantidad-input w-12 text-center font-semibold border-0 bg-transparent';
    inputCantidad.onchange = (e) => {
        const nuevaCantidad = parseInt(e.target.value) || 1;
        establecerCantidad(item.id, nuevaCantidad);
    };
    
    // Botón para aumentar cantidad
    const btnMas = document.createElement('button');
    btnMas.className = 'w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold';
    btnMas.textContent = '+';
    btnMas.onclick = () => modificarCantidad(item.id, 1);
    
    // Botón para eliminar el producto del carrito
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'ml-2 text-red-500 hover:text-red-700';
    btnEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    btnEliminar.onclick = () => eliminarDelCarrito(item.id);
    
    // Ensamblar controles
    controles.appendChild(btnMenos);
    controles.appendChild(inputCantidad);
    controles.appendChild(btnMas);
    controles.appendChild(btnEliminar);
    
    // Ensamblar todo el item
    div.appendChild(info);
    div.appendChild(controles);
    
    return div;
}

// ============================================
// FUNCIÓN: Modificar Cantidad de un Item
// ============================================
// Esta función aumenta o disminuye la cantidad de un producto en el carrito.
// Recibe el ID del producto y un número positivo o negativo (ej: +1 o -1).

function modificarCantidad(productoId, cambio) {
    const item = carrito.find(item => item.id === productoId);
    
    if (!item) return;
    
    // Calcular la nueva cantidad
    const nuevaCantidad = item.cantidad + cambio;
    
    // Si la cantidad es menor a 1, eliminar el producto del carrito
    if (nuevaCantidad < 1) {
        eliminarDelCarrito(productoId);
    } else {
        // Si es mayor o igual a 1, actualizar la cantidad
        item.cantidad = nuevaCantidad;
        actualizarCarrito();
    }
}

// ============================================
// FUNCIÓN: Establecer Cantidad de un Item
// ============================================
// Esta función establece una cantidad específica para un producto.
// Se usa cuando el usuario escribe directamente en el input de cantidad.

function establecerCantidad(productoId, cantidad) {
    const item = carrito.find(item => item.id === productoId);
    
    if (!item) return;
    
    // Si la cantidad es menor a 1, eliminar el producto
    if (cantidad < 1) {
        eliminarDelCarrito(productoId);
    } else {
        // Si es mayor o igual a 1, establecer la cantidad
        item.cantidad = cantidad;
        actualizarCarrito();
    }
}

// ============================================
// FUNCIÓN: Eliminar Producto del Carrito
// ============================================
// Esta función elimina completamente un producto del carrito.
// Busca el producto por su ID y lo quita del array carrito.

function eliminarDelCarrito(productoId) {
    // Filtrar el array carrito, dejando solo los productos que NO tienen ese ID
    carrito = carrito.filter(item => item.id !== productoId);
    
    // Actualizar la visualización
    actualizarCarrito();
    
    // Mostrar notificación
    mostrarNotificacion('Producto eliminado del carrito');
}

// ============================================
// FUNCIÓN: Actualizar Total del Carrito
// ============================================
// Esta función calcula el total a pagar sumando el precio de todos los items.
// Multiplica el precio de cada producto por su cantidad y suma todo.

function actualizarTotal() {
    const totalElemento = document.getElementById('total-carrito');
    
    if (!totalElemento) return;
    
    // Calcular el total: sumar (precio * cantidad) de cada item
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    
    // Mostrar el total formateado como moneda
    totalElemento.textContent = formatearPrecio(total);
}

// ============================================
// FUNCIÓN: Actualizar Badge del Carrito
// ============================================
// Esta función actualiza el número que aparece en el icono del carrito.
// Muestra la cantidad total de items (sumando las cantidades de cada producto).

function actualizarBadgeCarrito() {
    const badge = document.getElementById('badge-carrito');
    
    if (!badge) return;
    
    // Calcular la cantidad total de items (sumar todas las cantidades)
    const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    
    if (cantidadTotal > 0) {
        // Si hay items, mostrar el badge con el número
        badge.textContent = cantidadTotal;
        badge.classList.remove('hidden');
    } else {
        // Si no hay items, ocultar el badge
        badge.classList.add('hidden');
    }
}

// ============================================
// FUNCIÓN: Actualizar Botón de Enviar
// ============================================
// Esta función habilita o deshabilita el botón "Enviar Pedido".
// Solo se habilita si hay al menos un producto en el carrito.

function actualizarBotonEnviar() {
    const btnEnviar = document.getElementById('btn-enviar-whatsapp');
    
    if (!btnEnviar) return;
    
    // Si hay items en el carrito, habilitar el botón
    if (carrito.length > 0) {
        btnEnviar.disabled = false;
    } else {
        // Si el carrito está vacío, deshabilitar el botón
        btnEnviar.disabled = true;
    }
}

// ============================================
// FUNCIÓN: Abrir Carrito Flotante
// ============================================
// Esta función muestra el carrito flotante deslizándolo desde abajo.
// También muestra un overlay oscuro de fondo (en móvil).

function abrirCarrito() {
    const carrito = document.getElementById('carrito-flotante');
    const overlay = document.getElementById('overlay');
    
    if (carrito) {
        carrito.classList.remove('translate-y-full');
        carrito.classList.add('translate-y-0');
    }
    
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}

// ============================================
// FUNCIÓN: Cerrar Carrito Flotante
// ============================================
// Esta función oculta el carrito flotante deslizándolo hacia abajo.
// También oculta el overlay oscuro.

function cerrarCarrito() {
    const carrito = document.getElementById('carrito-flotante');
    const overlay = document.getElementById('overlay');
    
    if (carrito) {
        carrito.classList.add('translate-y-full');
        carrito.classList.remove('translate-y-0');
    }
    
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

// ============================================
// FUNCIÓN: Enviar Pedido a WhatsApp
// ============================================
// Esta función genera un mensaje formateado con el pedido y lo envía a WhatsApp.
// Usa la API de WhatsApp (wa.me) para abrir la app o web de WhatsApp.

function enviarPedidoWhatsApp() {
    // Verificar que haya items en el carrito
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Verificar que el teléfono esté configurado
    if (!CONFIG.telefonoWhatsApp) {
        alert('Por favor, configura el número de WhatsApp en config.js');
        return;
    }
    
    // Construir el mensaje del pedido
    let mensaje = CONFIG.mensajeInicial || '¡Hola! Me gustaría hacer el siguiente pedido:\n\n';
    
    // Agregar cada producto al mensaje
    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        mensaje += `${index + 1}. ${item.nombre}\n`;
        mensaje += `   Cantidad: ${item.cantidad}\n`;
        mensaje += `   Precio unitario: ${formatearPrecio(item.precio)}\n`;
        mensaje += `   Subtotal: ${formatearPrecio(subtotal)}\n\n`;
    });
    
    // Calcular y agregar el total
    const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    mensaje += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `💰 TOTAL: ${formatearPrecio(total)}\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    mensaje += `¡Gracias! 🙏`;
    
    // Codificar el mensaje para URL (reemplazar espacios y caracteres especiales)
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Construir la URL de WhatsApp
    // Formato: https://wa.me/numero?text=mensaje
    const urlWhatsApp = `https://wa.me/${CONFIG.telefonoWhatsApp}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en una nueva ventana/pestaña
    window.open(urlWhatsApp, '_blank');
    
    // Opcional: Limpiar el carrito después de enviar
    // carrito = [];
    // actualizarCarrito();
    // cerrarCarrito();
}

// ============================================
// FUNCIÓN: Mostrar Notificación
// ============================================
// Esta función muestra una notificación temporal al usuario.
// Útil para confirmar acciones como "Producto agregado".

function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notificacion.textContent = mensaje;
    
    // Agregar al body
    document.body.appendChild(notificacion);
    
    // Remover después de 2 segundos
    setTimeout(() => {
        notificacion.style.opacity = '0';
        notificacion.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 2000);
}

// ============================================
// FUNCIÓN: Configurar Event Listeners
// ============================================
// Esta función configura todos los "escuchadores de eventos":
// - Clicks en botones
// - Clicks en el overlay
// - Etc.

function configurarEventListeners() {
    // Botón para abrir el carrito (icono del carrito en el header)
    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito) {
        btnCarrito.addEventListener('click', abrirCarrito);
    }
    
    // Botón para cerrar el carrito (X en el carrito flotante)
    const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');
    if (btnCerrarCarrito) {
        btnCerrarCarrito.addEventListener('click', cerrarCarrito);
    }
    
    // Cerrar carrito al hacer click en el overlay (fondo oscuro)
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', cerrarCarrito);
    }
    
    // Botón para enviar pedido a WhatsApp
    const btnEnviar = document.getElementById('btn-enviar-whatsapp');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarPedidoWhatsApp);
    }

    // Listeners para modal de opciones (cerrar si clic fuera o Escape)
    const modal = document.getElementById('modal-opciones');
    if (modal) {
        // Cerrar si se hace click en el overlay del modal
        modal.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'modal-opciones') {
                cerrarModalOpciones();
            }
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cerrarModalOpciones();
            }
        });
    }
}

// ============================================
// INICIALIZACIÓN AUTOMÁTICA
// ============================================
// Cuando la página carga completamente, ejecutar la función de inicialización.
// window.addEventListener('load', ...) espera a que TODO esté cargado (imágenes, CSS, etc.)

window.addEventListener('load', inicializarApp);

// También podemos usar DOMContentLoaded si queremos que se ejecute antes
// (solo espera a que el HTML esté listo, no las imágenes)
// document.addEventListener('DOMContentLoaded', inicializarApp);
