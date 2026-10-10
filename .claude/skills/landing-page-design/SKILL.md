---
name: landing-page-ux
description: Diseña y construye landing pages poniendo la experiencia de usuario por delante, incluso en páginas sencillas. Úsala siempre que se pida una landing page, hero section, página de captación, página de producto o rediseño de una página de marketing.
---

# Landing page centrada en la experiencia de usuario

Esta skill aplica a TODA landing page, sea una página de una sola sección o una web completa. Una página sencilla no es excusa para una experiencia descuidada: la simplicidad se consigue con decisiones de UX, no omitiéndolas.

## Principio rector

Cada elemento de la página debe ayudar al visitante a entender qué se ofrece y a dar el siguiente paso con el mínimo esfuerzo. Si un elemento no hace ninguna de las dos cosas, se elimina.

## Antes de diseñar (siempre)

Antes de escribir código, define estas cuatro cosas. Si el usuario no las ha dado, haz como máximo 3 preguntas cortas; si no puede responder, asume lo más razonable y dilo en una línea.

1. **Visitante**: quién llega, de dónde viene (anuncio, buscador, redes, recomendación) y qué necesita saber para decidir.
2. **Acción única**: qué debe hacer (comprar, reservar, registrarse, escribir, descargar). Una landing = una acción principal.
3. **Objeción principal**: qué le frena (precio, confianza, complejidad, tiempo). La página debe resolverla.
4. **Contexto técnico**: framework, librerías y sistema de estilos del proyecto. Usa lo que ya existe; no introduzcas dependencias nuevas sin motivo.

## Estructura base

Adapta el orden y el número de secciones al caso, pero respeta la lógica: primero claridad, luego confianza, luego acción.

1. **Hero**: titular con el beneficio (no el nombre del producto), subtítulo de una o dos líneas, CTA principal visible sin hacer scroll.
2. **Prueba de confianza**: testimonios reales, logos, cifras verificables, garantías. Si no hay material real, no lo inventes: deja un hueco claramente marcado.
3. **Beneficios**: 3 o 4 como máximo, formulados desde el punto de vista del visitante.
4. **Cómo funciona**: 3 pasos simples si el proceso no es obvio.
5. **Oferta o precio**: transparente, sin letra pequeña escondida.
6. **FAQ**: responde las objeciones reales, no relleno.
7. **CTA final**: repite la acción principal con un último argumento.

En una página muy simple, el mínimo viable es: hero + una sección de confianza o beneficios + CTA.

## Reglas de UX

### Claridad
- **Prueba de los 5 segundos**: alguien que ve la página 5 segundos debe saber qué es, para quién y qué hacer a continuación.
- Lenguaje llano, frases cortas, sin jerga interna. Un titular por idea.
- Una sola acción principal. Las acciones secundarias son visualmente más discretas.

### Jerarquía y lectura
- Jerarquía visual evidente: titular > subtítulo > cuerpo > CTA. Se debe poder entender la página solo leyendo titulares y botones.
- Texto escaneable: párrafos de 3 líneas como máximo, listas cuando enumeras, espacio en blanco generoso.
- Cuerpo de texto de 16 px o más, longitud de línea de 45–75 caracteres, interlineado de 1.5 aproximadamente.
- Máximo 2 familias tipográficas.

### Llamadas a la acción
- Texto del botón que describe el resultado ("Reservar mi plaza", "Recibir la guía"), no genérico ("Enviar", "Click aquí").
- Contraste alto y tamaño táctil mínimo de 44×44 px.
- Repetir el CTA tras las secciones donde el visitante ya pudo decidir, sin saturar.
- Microcopy cerca del botón que reduzca el riesgo ("Sin tarjeta", "Cancela cuando quieras"), solo si es verdad.

### Formularios
- Pide solo los campos imprescindibles. Cada campo extra baja la conversión.
- Etiquetas siempre visibles (no solo placeholder), tipos de input correctos (`email`, `tel`) y `autocomplete` adecuado.
- Validación en línea con mensajes claros que expliquen cómo corregir el error.
- Estados completos: normal, foco, error, cargando y éxito. Tras enviar, confirma qué pasa a continuación.

### Móvil primero
- Diseña primero para 360–390 px de ancho y luego amplía.
- Sin scroll horizontal. Márgenes laterales de al menos 16 px.
- CTA accesible con el pulgar; considera una barra de acción fija si la página es larga.
- Menú mínimo: en una landing, suele bastar con el logo y el CTA. Evita navegación que saque al visitante de la página.

### Rendimiento percibido
- Imágenes optimizadas (formatos modernos, `width`/`height` definidos para evitar saltos de layout, `loading="lazy"` fuera del primer pantallazo).
- El contenido principal debe verse sin esperar a JavaScript pesado.
- Fuentes con `font-display: swap` y pocas variantes.
- Animaciones sutiles, con propósito, y respetando `prefers-reduced-motion`.

### Accesibilidad (no negociable)
- Contraste de texto mínimo 4.5:1 (3:1 para texto grande).
- HTML semántico: un único `h1`, jerarquía de encabezados ordenada, `button` para acciones y `a` para navegación.
- Foco visible y navegación completa con teclado.
- `alt` descriptivo en imágenes informativas y vacío en las decorativas.
- No transmitir información solo con color.

### Confianza
- Datos de contacto o identidad del negocio visibles.
- Enlaces a privacidad y condiciones accesibles, y aviso de cookies solo si es necesario y sin tapar el contenido principal.
- Nada de falsa urgencia, contadores inventados ni testimonios ficticios.

## Dirección visual

- Elige una dirección estética concreta y coherente con la marca y el público (no una plantilla genérica).
- Paleta corta: un color de marca, un acento para la acción principal y neutros.
- La personalidad visual nunca debe penalizar la legibilidad ni la acción principal.
- Si el proyecto ya tiene sistema de diseño o guía de marca, ese manda sobre estas preferencias.

## Cómo trabajar

1. Resume en 2–3 líneas el visitante, la acción única y las suposiciones tomadas.
2. Propón la estructura de secciones y confirma solo si hay dudas reales.
3. Construye con el stack existente del proyecto, con componentes reutilizables y estilos coherentes.
4. Escribe textos reales y útiles; si faltan datos, marca los huecos con `[COMPLETAR: ...]` en lugar de inventar.
5. Revisa con la checklist final antes de dar el trabajo por terminado.

## Checklist final

- [ ] ¿Se entiende qué es y qué hacer en 5 segundos?
- [ ] ¿Hay una única acción principal, clara y repetida con criterio?
- [ ] ¿El titular habla del beneficio del visitante?
- [ ] ¿Funciona y se ve bien a 360 px de ancho?
- [ ] ¿Formularios con lo mínimo y con estados de error y éxito?
- [ ] ¿Contraste, foco, teclado, `alt` y jerarquía de encabezados correctos?
- [ ] ¿Imágenes optimizadas y sin saltos de layout?
- [ ] ¿Sin contenido inventado presentado como real?
- [ ] ¿Cada elemento ayuda a entender o a actuar? Si no, fuera.

## Evitar

- Carruseles automáticos, pop-ups al entrar y vídeos con autoplay con sonido.
- Menús con muchos enlaces que distraigan de la acción.
- Texto sobre imágenes sin contraste suficiente.
- Botones con textos vagos o varios CTA compitiendo con el mismo peso.
- Pedir datos que no se necesitan todavía.
- Efectos decorativos que ralenticen la página o dificulten la lectura.