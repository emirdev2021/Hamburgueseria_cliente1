// ============================================
// ARCHIVO DE CONFIGURACIÓN DEL NEGOCIO
// ============================================
// Este archivo contiene toda la información personalizable del negocio.
// Modifica estos valores según tu negocio.

const CONFIG = {
    // Nombre del negocio que aparecerá en la página
    nombreNegocio: "Mimuza Berazategui",
    
    // Número de WhatsApp del negocio (sin espacios, sin guiones, con código de país)
    // Ejemplo: "5491123456789" (Argentina) o "521234567890" (México)
    telefonoWhatsApp: "5491122512344",
    
    // URL o ruta del logo del negocio
    // Se ha establecido a la versión local `Assets/images/logo.png` para cargarse sin depender de CDN
    logo: "Assets/images/logo.png",
    
    // Colores principales del negocio (en formato hexadecimal)
    // Paleta escogida: tonos cálidos y apetitosos (rojo profundo, ámbar) para una hamburguesería/pizzería
    colores: {
        primario: "#C62828",      // Rojo profundo para botones y acentos (apetitoso)
        secundario: "#FFB300",    // Ámbar/dorado para detalles y hover
        fondo: "#FFF8F0",         // Fondo crema suave
        texto: "#2D2D2D",         // Texto principal oscuro
        textoClaro: "#FFFFFF"     // Texto sobre fondos oscuros
    },
    
    // Mensaje personalizado que aparecerá antes del pedido en WhatsApp
    mensajeInicial: "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"
};

// Exportamos la configuración para que pueda ser usada en otros archivos
// (En JavaScript vanilla, esto se hace simplemente declarando la variable globalmente)

