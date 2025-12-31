/**
 * CREAFILMS - Formulario de Bodas
 * Maneja el envío de datos a N8n Webhook
 */

// ⚠️ CONFIGURACIÓN: Reemplaza esta URL con tu Webhook de N8n
const WEBHOOK_URL = 'AQUI_TU_URL';

// Elementos del DOM
const form = document.getElementById('bodas-form');
const submitBtn = form.querySelector('.btn-submit');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');
const feedback = form.querySelector('.form-feedback');

/**
 * Event Listener: Form Submit
 */
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar que la URL del webhook esté configurada
    if (WEBHOOK_URL === 'AQUI_TU_URL') {
        showFeedback('error', 'Error: El Webhook no está configurado. Por favor contacta al administrador.');
        return;
    }

    // Recopilar datos del formulario
    const formData = {
        nombre: form.nombre.value.trim(),
        correo: form.correo.value.trim(),
        telefono: form.telefono.value.trim(),
        fecha: form.fecha.value,
        venue: form.venue.value.trim(),
        presupuesto: form.presupuesto.value,
        mensaje: form.mensaje.value.trim(),
        tipo: 'bodas',
        timestamp: new Date().toISOString()
    };

    // Validaciones básicas
    if (!formData.nombre || !formData.correo || !formData.telefono || !formData.fecha) {
        showFeedback('error', 'Por favor completa todos los campos obligatorios marcados con *');
        return;
    }

    // Validar email
    if (!isValidEmail(formData.correo)) {
        showFeedback('error', 'Por favor ingresa un correo electrónico válido');
        return;
    }

    // Deshabilitar botón y mostrar loader
    setLoading(true);

    try {
        // Enviar datos al webhook de N8n
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Éxito
            showFeedback('success', '¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.');
            form.reset();

            // Analytics (opcional)
            trackFormSubmission('bodas', formData);
        } else {
            // Error en el servidor
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showFeedback('error', 'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo o contáctanos directamente.');
    } finally {
        setLoading(false);
    }
});

/**
 * Mostrar mensaje de feedback
 */
function showFeedback(type, message) {
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';

    // Auto-hide después de 8 segundos
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 8000);
}

/**
 * Cambiar estado de loading del botón
 */
function setLoading(isLoading) {
    submitBtn.disabled = isLoading;

    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
    } else {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

/**
 * Validar formato de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Track form submission (Google Analytics, Meta Pixel, etc.)
 */
function trackFormSubmission(formType, data) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
            form_type: formType,
            event_category: 'engagement',
            event_label: 'Formulario Bodas'
        });
    }

    // Meta Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Formulario Bodas',
            content_category: 'bodas'
        });
    }

    console.log('📊 Form submission tracked:', formType);
}

/**
 * Auto-format phone number (optional)
 */
const phoneInput = document.getElementById('telefono');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    // Limitar a 10 dígitos
    if (value.length > 10) {
        value = value.slice(0, 10);
    }

    // Formatear: (555) 123-4567
    if (value.length > 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length > 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
        value = `(${value}`;
    }

    e.target.value = value;
});

/**
 * Date validation - prevent past dates
 */
const dateInput = document.getElementById('fecha');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);
