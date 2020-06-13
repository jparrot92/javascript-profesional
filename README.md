# JavaScript Profesional

## Tabla de Contenido
- [Repaso de Conceptos Fundamentales](#repaso-de-conceptos-fundamentales)
  - [Cómo llega un script al navegador](#cómo-llega-un-script-al-navegador)
  - [Scope](#scope)
  - [Closures](#closures)
  - [El primer plugin](#el-primer-plugin)
  - [this](#this)
  - [Los metodos, call apply y bind](#los-metodos-call-apply-y-bind)
  - [Prototype](#prototype)
  - [Herencia Prototipal](#herencia-prototipal)
- [Cómo funciona JavaScript](#cómo-funciona-javascript)
  - [Parsers y el Abstract Syntax Tree](#parsers-y-el-abstract-syntax-tree)
  - [Abstract Syntax Tree en Práctica](#abstract-syntax-tree-en-práctica)
  - [Cómo funciona el JavaScript Engine](#cómo-funciona-el-javascript-engine)
  - [Event Loop](#event-loop)
- [Fundamentos Intermedios](#fundamentos-intermedios)
  - [Promesas](#promesas)
  - [Getters y setters](#getters-y-setters)
- [Fundamentos Avanzados](#fundamentos-avanzados)
  - [Proxy](#proxy)
  - [Generators](#generators)
- [APIs del DOM](#apis-del-dom)
  - [Fetch - Cómo cancelar peticiones](#fetch---cómo-cancelar-peticiones)
  - [IntersectionObserver](#intersectionobserver)
  - [VisibilityChange](#visibilitychange)
  - [Service Workers](#service-workers)
- [TypeScript](#typescript)
  - [Introducción](#introducción)
  - [Tipos básicos](#tipos-básicos)
  - [Funciones](#funciones)
  - [Interfaces](#interfaces)
  - [Clases](#clases)
  - [Convertir el proyecto a TypeScript](#convertir-el-proyecto-a-typescript)
- [Patrones de Diseño](#patrones-de-diseño)
  - [Que és un patrón de diseño](#que-és-un-patrón-de-diseño)
  - [Categorias de patrones de diseño](#categorias-de-patrones-de-diseño)
  - [Patrón Singleton y Casos de Uso](#patrón-singleton-y-casos-de-uso)
  - [Implementación del patrón Singleton](#implementación-del-patrón-singleton)
  - [¿Cómo funciona el Patrón Observer?](#cómo-funciona-el-patrón-observer)
  - [Implementación del patrón Observer](#implementación-del-patrón-observer)
  - [Patrón Decorator y Casos de Uso](#patrón-decorator-y-casos-de-uso)
  - [Implementación del patrón Decorator](#implementación-del-patrón-decorator)

## Repaso de Conceptos Fundamentales

### Cómo llega un script al navegador
El **DOM ** es la representación que hace el navegador de un documento HTML.

El navegador interpreta el archivo HTML y cuando termina de transformarlo al DOM se dispara el evento **DOMContentLoaded** lo que significa que todo el documento está disponible para ser manipulado.

Todo script que carguemos en nuestra página tiene un llamado y una ejecución.

Tanto con async como defer podemos hacer llamados asíncronos pero tiene sus diferencias:

* **async**. Con async podemos hacer la petición de forma asíncrona y no vamos a detener la carga del DOM hasta que se haga la ejecución del código.
* **defer**. La petición es igual asíncrona como en el async pero va a deferir la ejecución del Javascript hasta el final de que se cargue todo el documento.

Hay que tener en cuenta que cuando carga una página y se encuentra un script a ejecutar toda la carga se detiene. Por eso se recomienda agregar tus scripts justo antes de cerrar el body para que todo el documento esté disponible.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/6d3480b429b406c30be63ca10934cdf6e4849ad8)

### Scope
El **Scope** o ámbito es lo que define el tiempo de vida de una variable, en que partes de nuestro código pueden ser usadas.

**Global Scope**

Variables disponibles de forma global se usa la palabra *var*, son accesibles por todos los scripts que se cargan en la página. Aquí hay mucho riesgo de sobreescritura.

**Function Scope**

Variables declaradas dentro de una función sólo visibles dentro de ella misma (incluyendo los argumentos que se pasan a la función).

**Block Scope**

Variables definidas dentro de un bloque, por ejemplo variables declaradas dentro un loop *while* o *for*. Se usa *let* y *const* para declarar este tipo de variables.

**Module Scope**

Cuando se denota un script de tipo module con el atributo ```type="module``` las variables son limitadas al archivo en el que están declaradas.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/c1ca894f5d8e60f8c1a72b5562f005227c5b9047)

### Closures
Son funciones que regresan una función o un objeto con funciones que mantienen las variables que fueron declaradas fuera de su scope.

Los **closures** nos sirven para tener algo parecido a variables privadas, característica que no tiene JavaScript por *default*. Es decir encapsulan variables que no pueden ser modificadas directamente por otros objetos, sólo por funciones pertenecientes al mismo.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/c70f2b921e90d76047678cf3ab793036acc513c8)

### El primer plugin
[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/7b74c24254c18f6cb97cf6ff0ec00e8c78fc0d65)

### this
*this* se refiere a un objeto, ese objeto es el que actualmente está ejecutando un pedazo de código.

No se puede asignar un valor a this directamente y este depende de en que scope nos encontramos:

* Cuando llamamos a *this* en el **Global Scope o Function Scope**, se hace referencia al objeto *window*. A excepción de cuando estamos en **strict mode** que nos regresará *undefined*.
* Cuando llamamos a *this* desde **una función** que está contenida en un objeto, this se hace referencia a ese objeto.
* Cuando llamamos a *this* desde una **“clase”**, se hace referencia a la instancia generada por el constructor.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/9d002f1c36688d3439dc0d85078f5451eab32066)

### Los metodos, call apply y bind
Estas funciones nos sirven para establecer el valor de *this*, es decir cambiar el contexto que se va usar cuando la función sea llamada.

Las funciones **call, apply y bind** son parte del prototipo Function. Toda función usa este prototipo y por lo tanto tiene estas tres funciones.

* **functionName.call().** Ejecuta la función recibiendo como primer argumento el *this* y los siguientes son los argumentos que recibe la función que llamó a call.
* **functionName.apply().** Ejecuta la función recibiendo como primer argumento el *this* y como segundo un arreglo con los argumentos que recibe la función que llamó a apply.
* **functionName.bind().** Recibe como primer y único argumento el *this*. No ejecuta la función, sólo regresa otra función con el nuevo this integrado.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/cf19ca0eec89cceddefeb2483ee8b16d7001a392)

### Prototype
En Javascript todo son objetos, no tenemos clases, no tenemos ese plano para crear objetos.

Todos los objetos “heredan” de un prototipo que a su vez hereda de otro prototipo y así sucesivamente creando lo que se llama la **prototype chain**.

La keyword *new* crea un nuevo objeto que “hereda” todas las propiedades del prototype de otro objeto. No confundir prototype con **proto** que es sólo una propiedad en cada instancía que apunta al prototipo del que hereda.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/67d0a398b93eec1b0b7b0d27ea62e7728863c50c)

### Herencia Prototipal
Por default los objetos en JavaScript tienen cómo prototipo a **Object** que es el punto de partida de todos los objetos, es el prototipo padre. Object es la raíz de todo, por lo tanto tiene un prototipo padre *undefined*.

Cuando se llama a una función o variable que no se encuentra en el mismo objeto que la llamó, se busca en toda la prototype chain hasta encontrarla o regresar *undefined*.

La función **hasOwnProperty** sirve para verificar si una propiedad es parte del objeto o si viene heredada desde su prototype chain.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/e0f2ff199627c7bb3252133fe7ef5bb51b83461a)

## Cómo funciona JavaScript

### Parsers y el Abstract Syntax Tree
El JS Engine recibe el código fuente y lo procesa de la siguiente manera:

* El **parser** descompone y crea tokens que integran el **AST**.
* Se compila a **bytecode** y se ejecuta.
* Lo que se pueda se **optimiza a machine code** y se reemplaza el código base.

Un **SyntaxError** es lanzado cuando el motor JavaScript encuentra partes que no forman parte de la sintaxis del lenguaje y esto lo logra gracias a que se tiene un AST generado por el parser.

El *parser* es del 15% al 20% del proceso de ejecución por lo que hay que usar parser del código justo en el momento que lo necesitamos y no antes de saber si se va a usar o no.

[Demo - Tokens](https://esprima.org/demo/parse.html?code=let%20foo%20%3D%20%22bar%22%3B%0A)
[Abstract Syntax Tree (AST)](https://astexplorer.net/)

### Abstract Syntax Tree en Práctica
[Ejemplo](https://astexplorer.net/#/gist/16fc27fc420f705455f2b42b6c804aa1/d9cc7988c2c743d7edfbb3c3b1abed866c975ee4)

### Cómo funciona el JavaScript Engine
Una vez tenemos el **AST** ahora hay que convertirlo a Bytecode.

**Bytecode** es como el código assembler pero en lugar de operar en el procesador opera en la máquina virtual **V8** del navegador.

**Machine code** es el más bajo nivel, es código binario que va directo al procesador.

**El profiler** se sitúa en medio del bytecode y el optimizador

Cada máquina virtual tiene sus particularidades, por ejemplo V8 tiene algo llamado **Hot Functions**.

Cuando una sentencia función es ejecutada muy frecuentemente, V8 la denomina como una *hot function* y hace una optimización que consiste en convertirla a *machine code* para no tener que interpretarla de nuevo y agilizar su ejecución.

Cada navegador tiene su implementación de JavaScript Engine:

* SpiderMonkey - Firefox
* Chackra - Edge
* JavaScriptCore - Safari
* V8 - Chrome

### Event Loop
El **Event Loop** hace que Javascript parezca ser multihilo a pesar de que corre en un solo proceso.

Javascript se organiza usando las siguientes estructuras de datos:

* **Stack**. Va apilando de forma organizada las diferentes instrucciones que se llaman. Lleva así un rastro de dónde está el programa, en que punto de ejecución nos encontramos.
* **Memory Heap**. De forma desorganizada se guarda información de las variables y del scope.
* **Schedule Tasks**. Aquí se agregan a la cola, las tareas programadas para su ejecución.
* **Task Queue**. Aquí se agregan las tares que ya están listas para pasar al stack y ser ejecutadas. El stack debe estar vacío para que esto suceda.
* **MicroTask Queue**. Aquí se agregan las promesas. Esta Queue es la que tiene mayor prioridad.

El Event Loop es un loop que está ejecutando todo el tiempo y pasa periódicamente revisando las queues y el stack moviendo tareas entre estas dos estructuras.

## Fundamentos Intermedios

### Promesas
Para crear las promesas usamos la clase Promise. El constructor de Promise recibe un sólo argumento, un callback con dos parámetros, **resolve** y **reject**. resolve es la función a ejecutar cuando se resuelve y reject cuando se rechaza.

El async/await es sólo syntax sugar de una promesa, por debajo es exactamente lo mismo.

La clase Promise tiene algunos métodos estáticos bastante útiles:

* **Promise.all**. Da error si una de las promesas es rechazada.
* **Promise.race**. Regresa sólo la promesa que se resuelva primero.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/07eb42fc2b4c59c2a83c90d43a71e028beddb970)

### Getters y setters
Los getters y setters son funciones que podemos usar en un objeto para tener propiedades virtuales. Se usan los keywords *set* y *get* para crear estas propiedades.

Estas propiedades al ser funciones pueden llevar una validación de por medio y ser usadas con el operador de asignación como si fueran una variable más dentro del objeto.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/807ae7463aab11d699d2b28b442d8146373559d0)

## Fundamentos Avanzados

### Proxy
El proxy sirve para interceptar la lectura de propiedades de un objeto (los get, y set) entre muchas otras funciones. Así, antes de que la llamada llegue al objeto podemos manipularla con una lógica que nosotros definamos.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/bd7e0a2a38c458cf0a3532f1bb51b777c31b7e10)

### Generators
Los generadores son funciones especiales, pueden pausar su ejecución y luego volver al punto donde se quedaron recordando su *scope*.

Algunas de sus características:

* Los generadores regresan una función.
* Empiezan suspendidos y se tiene que llamar *next* para que ejecuten.
* Regresan un *value* y un *boolean done* que define si ya terminaron.
* *yield* es la instrucción que regresa un valor cada vez que llamamos a next y detiene la ejecución del generador.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/76de72e83386bc54e73af0f6c4490e2e725c2b3b)

## APIs del DOM

### Fetch - Cómo cancelar peticiones
La peticiones AJAX permitieron en su tiempo hacer peticiones asíncronas al servidor sin tener que detener la carga de la página. Hoy en día se utiliza la función **fetch** para esto.

Con **fetch** tenemos algo llamado **AbortController** que nos permite enviar una señal a una petición en plena ejecución para detenerla.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/75841da339ca5e9cb526f4e1994bdddd993d0fef)

### IntersectionObserver
Sirve para observar elementos y si cruzan un umbral que nosotros definimos nos lo va a notificar para tomar acción.

El umbral se define por el porcentaje que tiene intersección con el *viewport*, con la parte visible de nuestra página.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/6620ec1630f34fe6bad4b1971f24185b4c368f4a)

### VisibilityChange
El ***visibilityChange*** forma parte del API del DOM llamado **Page Visibility** y nos deja saber si el elemento es visible, pude ser usado para ejecutar una acción cuando cambiamos de pestaña. Así podemos ahorrar batería y mejorar la UX.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/30d6b902385be58ba4be0e7d55911a23cf8e51fa)

### Service Workers
Sirven para hacer que nuestras aplicaciones funcionen Offline.

Muy usados en las **Progressive Web Apps** (PWA) los ServiceWorkers son una capa que vive entre el navegador y el Internet.

Parecido a como lo hacen los proxys van a interceptar peticiones para guardar el resultado en cache y la próxima vez que se haga la petición tomar del cache ese resultado.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/a0299a30fe9c2643a3bdf2855d2e0ae66d09e922)

## TypeScript

### Introducción
**TypeScript** es un *superset* de JavaScript que añade tipos a nuestras variables ayudando así a la detección de errores de forma temprana y mejorando el autocompletado.

Los navegadores no entienden TypeScript así que lo vamos a transpilar a JavaScript usando **Parcel**.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/13cbefe68f9933fb980db55a359a4f5d71317716)

### Tipos básicos
Tipos:

* **boolean.** Valor verdadero o falso.
* **number.** Números.
* **string.** Cadenas de texto.
* **string[].** Arreglo del tipo cadena de texto.
* **Array.** Arreglo multi-tipo, acepta cadenas de texto o números.
* **enum.** Es un tipo especial llamado enumeración.
* **any.** Cualquier tipo.
* **object.** Del tipo objeto.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/blob/2d97a497b5e8a0bdf1ab1d1730e2797a9b8dc4bc/ejercicios/typescript/index.ts)

### Funciones
En Typescript podemos ser explícitos con el tipo de los argumentos y el tipo de retorno de una función.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/blob/f9d101f494434a9573da3d83c2d11da104c01e95/ejercicios/typescript/index.ts)

### Interfaces
Nos permiten declarar la forma exacta de un objeto, definiendo los tipos de sus propiedades y si son opcionales o no.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/blob/9aa73a4ca8f6672ba15998ebe55872aac007b333/ejercicios/typescript/index.ts)

### Clases

### Convertir el proyecto a TypeScript
En las clases en TypeScript sí existen las propiedades privadas.

[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/8f711be4d8183089fb552a9c2348396e3078a872)

## Patrones de Diseño

### Que és un patrón de diseño
Son soluciones generales ya probadas dentro de un contexto que las limita a problemas frecuentes que nos encontramos en el desarrollo de software.

### Categorias de patrones de diseño
**Creacionales.** Proveen diferentes mecanismos para crear objetos.

**Estructurales.** Describen formas de componer objetos para formar nuevas estructuras flexibles y eficientes.

**De Comportamiento.** Gestionan algoritmos y responsabilidades entre objetos.

### Patrón Singleton y Casos de Uso
Es un patrón que te asegura que una clase solo tiene una instancia. Esta única instancia puede ser consumida por cualquier otro objeto.

### Implementación del patrón Singleton
[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/71b50789a307aa0a0f7ce1ca23c8682d46eaff25)

### ¿Cómo funciona el Patrón Observer?
El patrón observer se compone de un sujeto que ofrece mecanismos de suscripción y desuscripción a múltiples observadores que quieren ser notificados de los cambios en dicho sujeto. Cada observador expone un método de update que es usado por el sujeto para notificar cualquier cambio a todos los suscritos.

Es uno de los patrones más utilizados, algunos ejemplos típicos son:

* Newsletter
* Sockets
* Listeners en páginas web

### Implementación del patrón Observer
[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/ddf0f915da4a45a1c841f51b3d9ecef3b2d15efa)

### Patrón Decorator y Casos de Uso
Añade nuevas responsabilidades a un objeto de forma dinámica permitiendo así extender su funcionalidad sin tener que usar subclases.

### Implementación del patrón Decorator
[Ejemplo](https://github.com/jparrot92/javascript-profesional/commit/d41ccaa765a27d4b7ef4aafd1eca19f19023b63c)
