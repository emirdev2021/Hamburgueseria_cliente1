# 🍔 Boilerplate - Menú Digital para Negocios de Comida

Plantilla reutilizable para crear landing pages tipo "App Web" donde los clientes pueden ver el menú, agregar productos al carrito y enviar pedidos por WhatsApp.

## 📋 Características

- ✅ **Sin frameworks complejos**: Solo HTML5, TailwindCSS (CDN) y JavaScript Vanilla
- ✅ **Diseño Mobile-First**: Optimizado para dispositivos móviles
- ✅ **Configuración fácil**: Edita `config.js` para personalizar tu negocio
- ✅ **Menú editable**: Modifica `menu.json` para agregar/editar productos
- ✅ **Carrito flotante**: Con cálculo de totales en tiempo real
- ✅ **Integración WhatsApp**: Envío de pedidos formateados directamente a WhatsApp

## 🚀 Inicio Rápido

1. **Abre `config.js`** y personaliza:
   - Nombre del negocio
   - Número de WhatsApp (con código de país, sin espacios)
   - Logo del negocio (URL o ruta local)
   - Colores principales

2. **Edita `menu.json`** para agregar tus productos:
   - Categorías
   - Productos con nombre, descripción, precio, imagen, etc.

3. **Abre `index.html`** en tu navegador o usa un servidor local:
   ```bash
   # Si tienes Python instalado:
   python -m http.server 8000
   
   # O usa cualquier servidor local (Live Server en VS Code, etc.)
   ```

## 📁 Estructura del Proyecto

```
Proyecto_boilerPlate/
│
├── index.html          # Página principal (HTML5)
├── app.js             # Lógica de la aplicación (JavaScript con comentarios extensos)
├── config.js          # Configuración del negocio (editable)
├── menu.json          # Menú de productos (editable)
├── style.css          # Estilos personalizados adicionales
└── README.md          # Este archivo
```

## ⚙️ Configuración Detallada

### config.js

```javascript
const CONFIG = {
    nombreNegocio: "Mi Hamburguesería",
    telefonoWhatsApp: "5491123456789",  // Sin espacios, con código de país
    logo: "assets/logo.png",             // URL o ruta local
    colores: {
        primario: "#FF6B6B",
        secundario: "#4ECDC4",
        // ...
    }
};
```

### menu.json

Estructura del JSON:
- `categorias`: Array de categorías con `id`, `nombre`, `icono`
- `productos`: Array de productos con `id`, `nombre`, `descripcion`, `precio`, `categoria`, `imagen`, `disponible`

## 📱 Uso

1. Los clientes navegan por las categorías
2. Agregan productos al carrito
3. El carrito muestra el total en tiempo real
4. Al hacer clic en "Enviar Pedido", se abre WhatsApp con el mensaje formateado

## 🎨 Personalización

- **Colores**: Modifica `CONFIG.colores` en `config.js`
- **Productos**: Edita `menu.json` (sigue la estructura existente)
- **Estilos**: Usa `style.css` para estilos adicionales o modifica clases de TailwindCSS en `index.html`

## 📝 Notas

- El código JavaScript está extensamente comentado para facilitar el aprendizaje
- Usa un servidor local para probar (no funcionará abriendo directamente el HTML por las restricciones CORS con fetch)
- El número de WhatsApp debe incluir el código de país sin el signo `+`

## 🔧 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local para desarrollo (opcional pero recomendado)

---

¡Listo para personalizar y vender 🚀

