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
    // Puede ser una URL externa o una ruta local como "assets/logo.png"
    logo: "https://via.placeholder.com/150/FF6B6B/FFFFFF?text=LOGO",
    
    // Colores principales del negocio (en formato hexadecimal)
    colores: {
        primario: "#FF6B6B",      // Color principal (botones, acentos)
        secundario: "#4ECDC4",    // Color secundario (hover, detalles)
        fondo: "#F7F7F7",         // Color de fondo de la página
        texto: "#2C3E50",         // Color del texto principal
        textoClaro: "#FFFFFF"     // Color del texto sobre fondos oscuros
    },
    
    // Mensaje personalizado que aparecerá antes del pedido en WhatsApp
    mensajeInicial: "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"
};

// Exportamos la configuración para que pueda ser usada en otros archivos
// (En JavaScript vanilla, esto se hace simplemente declarando la variable globalmente)

