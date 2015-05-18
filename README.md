jQuery Stepy Form

Un sencillo plugin para dividir formularios largos en varios pasos

## Requisistos

Para el uso de **jQuery Stepy Form** es necesario incluir previamente en tu código la librería **jQuery** y **jQueryUi**.

##Uso

1. Incluye **jQuery** y **jQuery UI** en el HTML.
2. Incluye el archivo del plugin

```html
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.11.3/jquery-ui.min.js"></script>
    <script type="text/javascript" src="src/jquery.stepyform.js"></script>
```

3. Divide el contenido de tu formulario en divs, uno por cada paso. Cada div debe tener asignada la clase **stepy-step**

```html
<form>
        <div class="stepy-step">
            <h2>Step 1</h2>
            <input type="text" placeholder="Tu nombre">
            <input type="text" placeholder="Tu apellido">
            <input type="text" placeholder="Tu email">
        </div>
        <div class="stepy-step">
            <h2>Step 2</h2>
            <input type="text" placeholder="Tu numero de teléfono">
            <input type="text" placeholder="Tu dirección">
            <input type="text" placeholder="Tu código postal">
        </div>
        <div class="stepy-step">
            <h2>Step 3</h2>
            <input type="text" placeholder="Tu website url">
            <input type="text" placeholder="Tu facebook url">
            <input type="text" placeholder="Tu twitter url">
            <input type="submit" value="Enviar">
        </div>
</form>
```

4. Inicializa el plugin
```javascript
$("form").stepyform();
```

##Configuración
Es posible establecer ciertas opciones de configuración con el fin de personalizar el uso del plugin.

###navButtonsAttrs
    Tipo: object
    Default: {}

Permite establecer atributos personalizados a los botones de navegación. Se puede establecer cualquier atributo a las etiquetas <a> que forman los botones. Por ejemplo si quieres añadir estilo mediante CSS a los botones, solo debes escribir el código CSS correspondiente dentro de una clase y luego asignar esa clase a los botones de navegación.

```css
.navegacion{
    background-color: #E6E6E6;
    border-radius: 2px;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.8);
    padding: 0.5em 1em;
    text-align: center;
}
```

```javascript
$("form").stepyform({
    navButtonsAttrs: {
        "class":"navegacion"
        }
    });
```

###prevButtonText
    Tipo: string
    Default: "Previous"

Establece el texto que se muestra en el boton para ir al paso anterior.

###nextButtonText
    Tipo: string
    Default: "Next"

Establece el texto que se muestra en el boton para ir al paso siguiente.

###prevButtonsClass
    Tipo: string
    Default: ""

Establece una clase que se añade a todos los botones **Anterior**.

###nextButtonsClass
    Tipo: string
    Default: ""

Establece una clase que se añade a todos los botones **Siguiente**.

###onChangeStep
    Tipo: function
    Default: null

Establece una función que se ejecuta cuando termina la transición de un paso a otro. Usando la palabra reservada **this** dentro de esta función se obtiene el elemento DOM del div del paso actual.