require("dotenv").config();
const mongoose = require("mongoose");
const slugify = require("slugify");
const Post = require("../models/Post");

const posts = [
  {
    title: "Introducción a Node.js: Guía completa para principiantes",
    excerpt: "Descubre por qué Node.js se ha convertido en la plataforma preferida para el desarrollo backend moderno. Aprende sus fundamentos, arquitectura y casos de uso.",
    content: `<p>Node.js ha revolucionado la forma en que desarrollamos aplicaciones web. Basado en el motor V8 de Google Chrome, permite ejecutar JavaScript fuera del navegador, abriendo posibilidades ilimitadas para el desarrollo backend.</p>

<h2>¿Qué es Node.js?</h2>
<p>Node.js es un entorno de ejecución de JavaScript construido sobre el motor V8 de Chrome. Fue creado por Ryan Dahl en 2009 con el objetivo de permitir la creación de servidores web escalables y de alto rendimiento.</p>

<p>A diferencia de los frameworks tradicionales, Node.js utiliza un modelo de E/S sin bloqueo (non-blocking I/O) y un modelo orientado a eventos, lo que lo hace extremadamente eficiente para aplicaciones que manejan muchas conexiones simultáneas.</p>

<h2>Arquitectura de un solo hilo</h2>
<p>Una de las características más distintivas de Node.js es su arquitectura de un solo hilo. Mientras que los servidores tradicionales crean un nuevo hilo para cada petición, Node.js maneja todas las conexiones en un solo hilo utilizando un event loop.</p>

<p>Este enfoque es ideal para operaciones de E/S como leer archivos, consultar bases de datos o hacer peticiones HTTP, ya que estas operaciones son delegadas al sistema operativo mientras el hilo principal continúa procesando otras tareas.</p>

<h2>El ecosistema npm</h2>
<p>npm (Node Package Manager) es el gestor de paquetes más grande del mundo. Con más de un millón de paquetes disponibles, cualquier funcionalidad que necesites probablemente ya existe como un módulo reutilizable.</p>

<h2>Casos de uso populares</h2>
<ul>
<li>APIs REST y GraphQL</li>
<li>Aplicaciones en tiempo real (chat, notificaciones)</li>
<li>Microservicios</li>
<li>Herramientas de build y automatización</li>
<li>Aplicaciones de streaming</li>
</ul>

<p>Node.js continúa evolucionando y su ecosistema crece día a día, convirtiéndolo en una herramienta indispensable para el desarrollo web moderno.</p>`,
    coverImage: "/assets/nodejs-intro.webp",
    author: "Carlos Méndez",
    category: "Backend",
    tags: ["nodejs", "javascript", "backend", "beginners"],
    featured: true,
    views: 1240,
  },
  {
    title: "React 19: Nuevas características y mejoras que debes conocer",
    excerpt: "React 19 trae mejoras significativas en rendimiento, un nuevo compiler automático y funcionalidades que simplifican el desarrollo de interfaces modernas.",
    content: `<p>React 19 representa un salto significativo en la evolución de la biblioteca más popular para construir interfaces de usuario. Con un compiler completamente nuevo y mejoras en el rendering, esta versión promete cambiar la forma en que escribimos React.</p>

<h2>El nuevo React Compiler</h2>
<p>Una de las novedades más emocionantes es el React Compiler, una herramienta que optimiza automáticamente tu código React. Ya no necesitas memorizar manualmente con useMemo, useCallback o React.memo. El compiler analiza tu código y aplica las optimizaciones automáticamente.</p>

<p>Esto reduce significativamente la complejidad del código y elimina errores comunes de rendimiento que muchos desarrolladores enfrentan día a día.</p>

<h2>Server Components mejorados</h2>
<p>Los Server Components ahora son más robustos y fáciles de usar. La integración con el streaming de datos permite cargar contenido de forma progresiva, mejorando la experiencia del usuario en conexiones lentas.</p>

<h2>Nuevos Hooks</h2>
<p>React 19 introduce nuevos hooks como use() que permiten consumir promesas y contextos de forma más natural, eliminando la necesidad de patrones complejos de carga de datos.</p>

<h2>Migración</h2>
<p>La migración desde React 18 es relativamente sencilla. La mayoría de las aplicaciones funcionarán sin cambios significativos, aunque es recomendable revisar las deprecaciones y actualizar las dependencias de terceros.</p>

<p>React 19 consolida la dirección tomada con Server Components y establece las bases para el futuro del desarrollo web.</p>`,
    coverImage: "/assets/react-19.webp",
    author: "Laura García",
    category: "Frontend",
    tags: ["react", "javascript", "frontend", "react19"],
    featured: true,
    views: 980,
  },
  {
    title: "Docker para desarrolladores: De cero a producción",
    excerpt: "Aprende a containerizar tus aplicaciones con Docker. Desde los conceptos básicos hasta la creación de pipelines de despliegue continuo.",
    content: `<p>Docker ha transformado la forma en que desplegamos y administramos aplicaciones. Los contenedores permiten empaquetar una aplicación con todas sus dependencias, garantizando que funcione de la misma manera en cualquier entorno.</p>

<h2>¿Qué son los contenedores?</h2>
<p>Un contenedor es una unidad de software estandarizada que incluye todo lo necesario para ejecutar una aplicación: código, runtime, sistema de archivos, variables de entorno y configuración. A diferencia de las máquinas virtuales, los contenedores comparten el kernel del sistema operativo host, lo que los hace mucho más ligeros y rápidos.</p>

<h2>Dockerfile: La receta de tu contenedor</h2>
<p>Un Dockerfile es un archivo de texto que contiene las instrucciones para construir una imagen Docker. Cada instrucción crea una capa en la imagen, y Docker utiliza un sistema de caché para acelerar las construcciones posteriores.</p>

<h2>Docker Compose</h2>
<p>Docker Compose permite definir y ejecutar aplicaciones multi-contenedor. Con un archivo YAML, puedes configurar todos los servicios, redes y volúmenes necesarios para tu aplicación.</p>

<h2>Mejores prácticas</h2>
<ul>
<li>Utiliza imágenes base oficiales y minimizadas</li>
<li>Implementa multi-stage builds para reducir el tamaño de las imágenes</li>
<li>Nunca almacenas secretos en las imágenes</li>
<li>Utiliza .dockerignore para excluir archivos innecesarios</li>
<li>Ejecuta los contenedores con un usuario no root</li>
</ul>

<p>Docker es una herramienta esencial en el arsenal de cualquier desarrollador moderno. Dominar sus conceptos te permitirá trabajar de manera más eficiente y colaborativa.</p>`,
    coverImage: "/assets/docker-cero-produccion.webp",
    author: "Miguel Torres",
    category: "DevOps",
    tags: ["docker", "containers", "devops", "deployment"],
    featured: true,
    views: 875,
  },
  {
    title: "Redes neuronales explicadas: La base de la inteligencia artificial",
    excerpt: "Comprende cómo funcionan las redes neuronales artificiales, desde la neurona simple hasta las arquitecturas profundas que impulsan el machine learning.",
    content: `<p>Las redes neuronales artificiales son el corazón del machine learning moderno. Inspiradas en el funcionamiento del cerebro humano, estas estructuras matemáticas son capaces de aprender patrones complejos a partir de datos.</p>

<h2>La neurona artificial</h2>
<p>Una neurona artificial recibe múltiples entradas, las pondera mediante pesos aprendidos, las suma junto con un sesgo (bias), y aplica una función de activación para producir una salida. Este proceso simple, cuando se replica miles de millones de veces, produce resultados extraordinarios.</p>

<h2>Capas y profundidad</h2>
<p>Las redes se organizan en capas: entrada, ocultas y salida. Una red con múltiples capas ocultas se llama red profunda (deep learning). Cada capa aprende representaciones cada vez más abstractas de los datos de entrada.</p>

<h2>Funciones de activación</h2>
<p>Las funciones de activación introducen no-linealidad en la red, permitiéndola aprender patrones complejos. Las más comunes son ReLU, sigmoid y softmax, cada una con sus propias características y casos de uso ideales.</p>

<h2>Entrenamiento con retropropagación</h2>
<p>El entrenamiento consiste en ajustar los pesos de la red para minimizar una función de pérdida. La retropropagación calcula los gradientes de la pérdida con respecto a cada peso, y el optimizador (como Adam o SGD) actualiza los pesos en la dirección correcta.</p>

<h2>Aplicaciones prácticas</h2>
<ul>
<li>Procesamiento de lenguaje natural (NLP)</li>
<li>Visión por computadora</li>
<li>Sistemas de recomendación</li>
<li>Generación de contenido</li>
<li>Diagnóstico médico asistido por IA</li>
</ul>

<p>Comprender las redes neuronales es fundamental para cualquier profesional que quiera trabajar con inteligencia artificial y machine learning.</p>`,
    coverImage: "/assets/redes-neuronales.webp",
    author: "Ana Rodríguez",
    category: "IA",
    tags: ["neural-networks", "machine-learning", "ai", "deep-learning"],
    featured: false,
    views: 1560,
  },
  {
    title: "TypeScript 5.5: Tipado avanzado y nuevas utilidades",
    excerpt: "Explora las nuevas características de TypeScript 5.5, incluyendo inferencia de tipos mejorada, patrones de tipo y mejoras en el rendimiento del compilador.",
    content: `<p>TypeScript continúa evolucionando como la herramienta preferida para desarrollar aplicaciones JavaScript escalables. La versión 5.5 trae mejoras significativas en el sistema de tipos y en el rendimiento del compilador.</p>

<h2>Inferencia de tipos mejorada</h2>
<p>El compilador ahora puede inferir tipos en contextos más complejos, reduciendo la necesidad de anotaciones explícitas. Esto hace que el código sea más limpio y fácil de mantener sin sacrificar la seguridad de tipos.</p>

<h2>Tipos prediccibles</h2>
<p>Los tipos predicciles permiten definir comportamientos de tipo que se resuelven en tiempo de compilación basándose en la forma de otros tipos. Esto abre posibilidades para crear utilidades de tipo más expresivas.</p>

<h2>Decoradores</h2>
<p>Los decoradores finalmente llegan a TypeScript de forma estable, siguiendo el estándar ECMAScript. Permiten metaprogramación limpia y son ideales para patrones como la inyección de dependencias y el logging.</p>

<h2>Rendimiento</h2>
<p>Las optimizaciones en el compilador resultan en tiempos de compilación hasta un 50% más rápidos en proyectos grandes, lo que mejora significativamente la experiencia de desarrollo.</p>

<p>Actualizar a TypeScript 5.5 es una decisión inteligente para cualquier proyecto que busque mantenerse actualizado y aprovechar lo último en tipado estático para JavaScript.</p>`,
    coverImage: "/assets/typescript-55.webp",
    author: "David López",
    category: "Frontend",
    tags: ["typescript", "javascript", "frontend", "types"],
    featured: false,
    views: 720,
  },
  {
    title: "MongoDB Atlas: Base de datos como servicio en la nube",
    excerpt: "Descubre cómo MongoDB Atlas simplifica la administración de bases de datos con réplicas automáticas, backups y escalado horizontal en la nube.",
    content: `<p>MongoDB Atlas es el servicio de base de datos como servicio (DBaaS) oficial de MongoDB. Ofrece todas las capacidades de MongoDB sin la complejidad de administrar infraestructura.</p>

<h2>¿Por qué Atlas?</h2>
<p>Atlas elimina la carga operativa de administrar bases de datos. Con réplicas automáticas, backups continuousos, y escalado en un clic, puedes enfocarte en desarrollar tu aplicación en lugar de preocuparte por la infraestructura.</p>

<h2>Modelo de datos flexible</h2>
<p>El enfoque de documentos de MongoDB permite modelar datos de forma natural, siguiendo la estructura de tus objetos de aplicación. Los esquemas flexibles aceleran el desarrollo y facilitan la evolución del modelo de datos.</p>

<h2>Índices y rendimiento</h2>
<p>Los índices en MongoDB son fundamentales para el rendimiento. Atlas proporciona sugerencias automáticas de índices basadas en el patrón de consultas de tu aplicación, ayudándote a optimizar las consultas sin ser un experto en bases de datos.</p>

<h2>Escalado</h2>
<p>Atlas permite escalar tanto verticalmente (más CPU/RAM) como horizontalmente (sharding) con unos clics. El autoscaling ajusta los recursos automáticamente según la carga de trabajo.</p>

<p>MongoDB Atlas representa el futuro de las bases de datos: potentes, flexibles y sin la carga operativa de la administración tradicional.</p>`,
    coverImage: "/assets/mongodb-atlas.webp",
    author: "Sofía Ramírez",
    category: "Backend",
    tags: ["mongodb", "database", "cloud", "atlas"],
    featured: false,
    views: 650,
  },
  {
    title: "Kubernetes en producción: Guía de mejores prácticas",
    excerpt: "Aprende a desplegar y gestionar aplicaciones en Kubernetes siguiendo las mejores prácticas de la industria para alta disponibilidad y escalabilidad.",
    content: `<p>Kubernetes se ha convertido en el estándar de la industria para la orquestación de contenedores. Sin embargo, llevarlo a producción requiere conocimiento profundo y buenas prácticas que van más allá de un simple deployment básico.</p>

<h2>Namespaces y organización</h2>
<p>Los namespaces permiten dividir un clúster de Kubernetes en múltiples virtual clusters. Utilízalos para separar entornos (desarrollo, staging, producción) y equipos, facilitando el RBAC y la gestión de recursos.</p>

<h2>Health checks</h2>
<p>Implementar liveness y readiness probes es fundamental para la estabilidad. El liveness probe reinicia un contenedor si está bloqueado, mientras que el readiness probe controla si el contenedor está listo para recibir tráfico.</p>

<h2>Gestión de secretos</h2>
<p>Nunca almacenes secretos en imágenes Docker o en repositorios de código. Utiliza External Secrets Operator o Vault para gestionar secretos de forma segura y dinámica.</p>

<h2>Monitoreo y observabilidad</h2>
<ul>
<li>Prometheus para métricas</li>
<li>Grafana para dashboards</li>
<li>Jaeger para tracing distribuido</li>
<li>EFK stack para logs centralizados</li>
</ul>

<h2>Políticas de red</h2>
<p>Implementa Network Policies para controlar el tráfico entre pods. Por defecto, todos los pods pueden comunicarse entre sí, lo cual es un riesgo de seguridad en producción.</p>

<p>Kubernetes es poderoso pero complejo. Seguir estas prácticas te ayudará a construir una plataforma robusta y confiable.</p>`,
    coverImage: "/assets/kubernetes-produccion.webp",
    author: "Miguel Torres",
    category: "DevOps",
    tags: ["kubernetes", "containers", "devops", "cloud-native"],
    featured: false,
    views: 540,
  },
  {
    title: "GPT y los modelos de lenguaje: Cómo funcionan por dentro",
    excerpt: "Un vistazo técnico a los modelos de lenguaje generativos, desde la arquitectura Transformer hasta el fine-tuning y el RLHF.",
    content: `<p>Los modelos de lenguaje generativos como GPT han capturado la imaginación del mundo. Pero, ¿cómo funcionan realmente estos sistemas? Vamos a explorar la arquitectura y los conceptos clave detrás de esta tecnología revolucionaria.</p>

<h2>La arquitectura Transformer</h2>
<p>El Transformer es la base de los modelos de lenguaje modernos. Introducido en 2017, utiliza mecanismos de atención (attention) que permiten al modelo considerar todas las palabras de una secuencia simultáneamente, capturando relaciones de largo alcance de manera eficiente.</p>

<h2>Tokenización</h2>
<p>Los modelos no procesan texto directamente, sino tokens (fragmentos de texto). La tokenización divide las palabras en subunidades, permitiendo al modelo manejar vocabulario ilimitado y palabras nuevas que nunca ha visto durante el entrenamiento.</p>

<h2>Pre-entrenamiento</h2>
<p>Durante el pre-entrenamiento, el modelo aprende a predecir la siguiente token en miles de millones de textos. Este proceso, que puede durar semanas y costar millones de dólares, permite al modelo aprender gramática, hechos, razonamiento y hasta un poco de sentido común.</p>

<h2>RLHF: Aprendizaje con retroalimentación humana</h2>
<p>El RLHF (Reinforcement Learning from Human Feedback) refina el modelo使其更 útil y seguro. Humanos evalúan las respuestas del modelo, y esta retroalimentación se utiliza para ajustar el comportamiento del modelo mediante aprendizaje por refuerzo.</p>

<h2>Limitaciones</h2>
<ul>
<li>Alucinaciones: generación de información falsa con confianza</li>
<li>Conocimiento estático: limitado por la fecha de corte del entrenamiento</li>
<li>Comprensión limitada: no truly "entiende" el significado</li>
</ul>

<p>Los modelos de lenguaje son herramientas poderosas pero imperfectas. Comprender sus capacidades y limitaciones es clave para usarlos de manera efectiva.</p>`,
    coverImage: "/assets/gpt-modelos-lenguaje.webp",
    author: "Ana Rodríguez",
    category: "IA",
    tags: ["gpt", "transformers", "nlp", "ai"],
    featured: false,
    views: 2100,
  },
  {
    title: "CSS Grid y Flexbox: El sistema de diseño definitivo",
    excerpt: "Domina las dos herramientas de layout más poderosas de CSS. Aprende cuándo usar Grid, cuándo Flexbox y cómo combinarlos para crear diseños increíbles.",
    content: `<p>CSS Grid y Flexbox son las herramientas fundamentales para el diseño web moderno. Juntas, reemplazan frameworks de layout como Bootstrap y Foundation, dándote control total sobre el diseño sin JavaScript.</p>

<h2>Flexbox: Layout unidimensional</h2>
<p>Flexbox está diseñado para distribuir espacio entre elementos en una dirección: fila o columna. Es perfecto para alinear elementos, crear barras de navegación, y distribuir contenido de forma flexible.</p>

<h2>Grid: Layout bidimensional</h2>
<p>CSS Grid te permite crear diseños complejos con filas y columnas. Es ideal para layouts de página completa, galerías de imágenes, y cualquier diseño que requiera control en dos dimensiones.</p>

<h2>Combinando Grid y Flexbox</h2>
<p>La mejor práctica es usar Grid para el layout general de la página y Flexbox para la distribución de elementos dentro de cada componente. Grid maneja la macro-estructura, Flexbox maneja la micro-estructura.</p>

<h2>Unidades modernas</h2>
<p>Las unidades fr, min(), max() y clamp() te permiten crear diseños verdaderamente responsive sin media queries. clamp() es particularmente útil para tipografía fluida.</p>

<p>Domina Grid y Flexbox, y nunca más necesitarás un framework CSS para hacer layouts.</p>`,
    coverImage: "/assets/css-grid-flexbox.webp",
    author: "Laura García",
    category: "Frontend",
    tags: ["css", "flexbox", "grid", "responsive-design"],
    featured: false,
    views: 890,
  },
  {
    title: "GitHub Actions: Automatiza tu pipeline de CI/CD",
    excerpt: "Configura pipelines de integración continua y despliegue continuo directamente en GitHub. Desde testing automatizado hasta deployment en producción.",
    content: `<p>GitHub Actions te permite automatizar flujos de trabajo directamente desde tu repositorio de GitHub. Desde ejecutar tests en cada push hasta desplegar en producción, las posibilidades son ilimitadas.</p>

<h2>Conceptos básicos</h2>
<p>Un workflow de GitHub Actions se define en archivos YAML dentro de la carpeta .github/workflows/. Cada workflow contiene jobs, y cada job contiene steps que ejecutan comandos o usan actions predefinidas.</p>

<h2>Triggers</h2>
<p>Los workflows se activan mediante eventos como push, pull_request, schedule (cron), o incluso eventos personalizados. Esto te permite ejecutar diferentes flujos de trabajo según la situación.</p>

<h2>Actions del marketplace</h2>
<p>El Marketplace de GitHub offers miles de actions predefinidas para tareas comunes: configurar Node.js, desplegar en AWS, publicar paquetes npm, y mucho más.</p>

<h2>Secrets y variables</h2>
<p>GitHub Actions maneja secretos de forma segura. Almacena tokens de acceso, credenciales de servicios y claves API como secrets, y accede a ellos en tus workflows sin exponerlos en el código.</p>

<h2>Ejemplo práctico</h2>
<p>Un workflow típico incluye: instalar dependencias, ejecutar linting, correr tests, construir el proyecto, y desplegar si todo pasa. Todo esto se ejecuta automáticamente en cada push o pull request.</p>

<p>GitHub Actions elimina la necesidad de servicios de CI/CD externos para la mayoría de proyectos, manteniendo todo en un solo lugar.</p>`,
    coverImage: "/assets/github-actions.webp",
    author: "Carlos Méndez",
    category: "DevOps",
    tags: ["github-actions", "ci-cd", "automation", "devops"],
    featured: false,
    views: 620,
  },
  {
    title: "Machine Learning con Python: Scikit-learn en la práctica",
    excerpt: "Aprende a implementar modelos de machine learning en Python usando Scikit-learn. Desde regresión lineal hasta Random Forest con datos reales.",
    content: `<p>Scikit-learn es la biblioteca más popular para machine learning en Python. Con una API consistente y documentación excelente, es el punto de partida ideal para cualquier proyecto de ML.</p>

<h2>El flujo de trabajo de ML</h2>
<p>Todo proyecto de machine learning sigue un flujo similar: carga de datos, preprocesamiento, división en entrenamiento/prueba, selección de modelo, entrenamiento, evaluación y ajuste de hiperparámetros.</p>

<h2>Preprocesamiento</h2>
<p>Los datos rara vez vienen listos para modelar. Scikit-learn ofrece herramientas para normalizar, codificar variables categóricas, manejar valores faltantes y crear features de forma reproducible con pipelines.</p>

<h2>Modelos supervisados</h2>
<p>Los modelos supervisados aprenden a partir de datos etiquetados. Regresión lineal, árboles de decisión, SVM y Random Forest son algunos de los algoritmos más utilizados, cada uno con sus fortalezas y debilidades.</p>

<h2>Evaluación</h2>
<p>La evaluación del modelo es crucial. Utiliza métricas apropiadas (accuracy, precision, recall, F1) y validación cruzada para obtener estimaciones robustas del rendimiento en datos no vistos.</p>

<p>Scikit-learn te da las herramientas; el conocimiento del dominio y la calidad de los datos harán la diferencia en tus resultados.</p>`,
    coverImage: "/assets/scikit-learn.webp",
    author: "Ana Rodríguez",
    category: "IA",
    tags: ["python", "machine-learning", "scikit-learn", "data-science"],
    featured: false,
    views: 780,
  },
  {
    title: "APIs RESTful: Diseño y mejores prácticas con Express",
    excerpt: "Diseña APIs REST que sean intuitivas, consistentes y escalables. Aprende los principios de la arquitectura REST y aplícalos con Express.js.",
    content: `<p>Las APIs REST son la columna vertebral de las aplicaciones web modernas. Un buen diseño de API afecta directamente la experiencia del desarrollador y la mantenibilidad del código.</p>

<h2>Principios REST</h2>
<p>REST (Representational State Transfer) es un estilo arquitectónico basado en recursos. Cada recurso se identifica con una URL única, y se manipula mediante verbos HTTP estándar: GET, POST, PUT, PATCH y DELETE.</p>

<h2>Estructura de URLs</h2>
<p>Las URLs deben ser nominales (sustantivos, no verbos) y jerárquicas. Usa plurales para colecciones (/posts, /users) y segmentos para relaciones (/posts/123/comments).</p>

<h2>Estados HTTP</h2>
<p>Utiliza códigos de estado correctamente: 200 para éxito, 201 para creación, 400 para errores de cliente, 401 para no autenticado, 404 para no encontrado, y 500 para errores de servidor.</p>

<h2>Paginación</h2>
<p>Nunca devuelvas colecciones completas. Implementa paginación con parámetros page y limit, y devuelve metadata con el total de registros y páginas disponibles.</p>

<h2>Versionado</h2>
<p>Versiona tu API desde el inicio (/api/v1/posts). Esto te permite hacer cambios sin romper las integraciones existentes de tus clientes.</p>

<p>Una API bien diseñada es fácil de usar, predecible y auto-documentada. Invierte tiempo en el diseño antes de escribir código.</p>`,
    coverImage: "/assets/apis-restful-express.webp",
    author: "Carlos Méndez",
    category: "Backend",
    tags: ["api", "rest", "express", "nodejs", "backend"],
    featured: false,
    views: 920,
  },
  {
    title: "TailwindCSS: Utility-first CSS en la práctica",
    excerpt: "Descubre cómo TailwindCSS acelera el desarrollo frontend con clases utilitarias. Construye interfaces modernas sin escribir CSS personalizado.",
    content: `<p>TailwindCSS ha cambiado la forma en que escribimos CSS. En lugar de crear clases personalizadas, utilizas clases utilitarias predefinidas directamente en el HTML, lo que acelera significativamente el desarrollo.</p>

<h2>El enfoque utility-first</h2>
<p>En lugar de escribir CSS como "card-container" y definir estilos, describes los estilos directamente: "flex items-center p-4 bg-white rounded-lg shadow-md". Esto elimina la sobrecarga cognitiva de nombres de clases y la duplicación de estilos.</p>

<h2>JIT (Just-In-Time)</h2>
<p>El motor JIT de TailwindCSS genera estilos bajo demanda, lo que significa que solo genera las clases que realmente usas. Esto reduce drásticamente el tamaño del CSS final y permite utilidades personalizadas sin configuración adicional.</p>

<h2>Diseño responsive</h2>
<p>TailwindCSS utiliza prefijos de breakpoint de forma intuitiva: sm:, md:, lg:, xl:. Esto hace que el diseño responsive sea más natural y fácil de mantener.</p>

<h2>Componentes reutilizables</h2>
<p>Aunque TailwindCSS es utility-first, puedes crear componentes reutilizables usando la extracción de componentes o el plugin @apply para patrones que se repiten frecuentemente.</p>

<p>TailwindCSS no es para todos, pero si valoras la velocidad de desarrollo y la consistencia visual, es una herramienta transformadora.</p>`,
    coverImage: "/assets/tailwindcss.webp",
    author: "Laura García",
    category: "Frontend",
    tags: ["tailwind", "css", "frontend", "utility-first"],
    featured: false,
    views: 670,
  },
  {
    title: "CI/CD con Jenkins: Pipeline completo para aplicaciones Node.js",
    excerpt: "Configura un pipeline de integración y despliegue continuo con Jenkins para tus aplicaciones Node.js, desde testing hasta deploy en producción.",
    content: `<p>Jenkins es uno de los servidores de automatización más populares y extensibles del mundo. Con miles de plugins disponibles, puede integrarse con prácticamente cualquier herramienta en tu cadena de desarrollo.</p>

<h2>Instalación y configuración</h2>
<p>Jenkins puede ejecutarse como servicio del sistema, en Docker, o en un clúster Kubernetes. Para empezar rápidamente, la opción Docker es la más conveniente y portable.</p>

<h2>Pipelines como código</h2>
<p>Los Pipelines como Código (Jenkinsfile) definen el flujo de trabajo de CI/CD en un archivo versionado en el repositorio. Esto permite revisiones de código del propio pipeline y trazabilidad completa de los cambios.</p>

<h2>Fases de un pipeline típico</h2>
<ul>
<li>Checkout: obtener el código fuente</li>
<li>Instalación: instalar dependencias</li>
<li>Linting: verificar calidad del código</li>
<li>Testing: ejecutar tests automatizados</li>
<li>Build: construir artefactos</li>
<li>Deploy: desplegar en el entorno objetivo</li>
</ul>

<h2>Integración con Docker</h2>
<p>Jenkins puede construir imágenes Docker, ejecutar tests en contenedores, y desplegar directamente en orquestadores como Kubernetes o Docker Swarm.</p>

<p>Jenkins requiere inversión inicial para configurarlo, pero su flexibilidad y ecosistema lo hacen ideal para equipos que necesitan una solución robusta y personalizable.</p>`,
    coverImage: "/assets/jenkins-cicd.webp",
    author: "Miguel Torres",
    category: "DevOps",
    tags: ["jenkins", "ci-cd", "pipeline", "devops"],
    featured: false,
    views: 410,
  },
  {
    title: "Visión por computadora: Introducción con PyTorch",
    excerpt: "Aprende los fundamentos de la visión por computadora usando PyTorch. Desde convoluciones hasta redes pre-entrenadas para clasificación de imágenes.",
    content: `<p>La visión por computadora es una de las áreas más emocionantes de la inteligencia artificial. Con PyTorch, implementar modelos de visión es accesible y flexible.</p>

<h2>Convoluciones: Los ojos de la red</h2>
<p>Las capas convolucionales son la base de las redes de visión. Funcionan como filtros que detectan patrones: bordes, texturas, formas y objetos. Cada capa aprende a detectar patrones cada vez más complejos.</p>

<h2>Redes CNN populares</h2>
<p>ResNet, VGG, EfficientNet y Vision Transformer (ViT) son arquitecturas ampliamente utilizadas. Cada una tiene trade-offs entre precisión, velocidad y tamaño del modelo.</p>

<h2>Transfer Learning</h2>
<p>En lugar de entrenar una red desde cero, utiliza un modelo pre-entrenado en ImageNet y ajústalo para tu tarea específica. Esto reduce drásticamente los datos y tiempo de entrenamiento necesarios.</p>

<h2>Data Augmentation</h2>
<p>La augmentación de datos artificiales (rotaciones, flips, cambios de color) mejora la generalización del modelo y reduce el overfitting, especialmente cuando tienes pocos datos de entrenamiento.</p>

<p>La visión por computadora tiene aplicaciones en medicina, agricultura, seguridad, vehículos autónomos y muchas más industrias. Es un campo con un enorme potencial.</p>`,
    coverImage: "/assets/vision-pytorch.webp",
    author: "Ana Rodríguez",
    category: "IA",
    tags: ["computer-vision", "pytorch", "deep-learning", "ai"],
    featured: false,
    views: 530,
  },
  {
    title: "Node.js Streams: Procesamiento eficiente de datos",
    excerpt: "Domina los streams en Node.js para procesar archivos grandes, datos en tiempo real y operaciones de E/S de alto rendimiento sin saturar la memoria.",
    content: `<p>Los streams son una de las características más poderosas y subutilizadas de Node.js. Permiten procesar datos de forma incremental, sin necesidad de cargar todo en memoria.</p>

<h2>¿Qué son los streams?</h2>
<p>Un stream es una secuencia de datos disponible de forma incremental. En lugar de leer un archivo de 1GB completo en memoria, un stream lo procesa en chunks pequeños (típicamente 64KB), manteniendo el uso de memoria constante.</p>

<h2>Tipos de streams</h2>
<ul>
<li>Readable: para leer datos (fs.createReadStream)</li>
<li>Writable: para escribir datos (fs.createWriteStream)</li>
<li>Duplex: para leer y escribir (TCP socket)</li>
<li>Transform: para modificar datos en tránsito (zlib)</li>
</ul>

<h2>Piping</h2>
<p>El método pipe() conecta un stream readable con uno writable, creando un pipeline de procesamiento. Esto es extremadamente potente para cadenas de transformación de datos.</p>

<h2>Casos de uso</h2>
<p>Los streams son ideales para: procesar archivos grandes, proxy de datos, compresión/descompresión, lectura de bases de datos por lotes, y cualquier escenario donde los datos llegan de forma incremental.</p>

<p>Los streams son la forma idiomática de procesar datos en Node.js. Aprender a usarlos te permitirá construir aplicaciones más eficientes y escalables.</p>`,
    coverImage: "/assets/apis-restful-express.webp",
    author: "David López",
    category: "Backend",
    tags: ["nodejs", "streams", "performance", "backend"],
    featured: false,
    views: 380,
  },
  {
    title: "Vite: El bundler del futuro para proyectos frontend",
    excerpt: "Descubre por qué Vite se ha convertido en la herramienta de build preferida para React, Vue y Svelte. Velocidad extrema y experiencia de desarrollo óptima.",
    content: `<p>Vite ha revolucionado las herramientas de build frontend. Con su enfoque en la velocidad y la experiencia de desarrollo, se ha convertido en la opción predilecta para nuevos proyectos.</p>

<h2>¿Por qué Vite es tan rápido?</h2>
<p>A diferencia de Webpack, que bundla todo antes de iniciar el servidor de desarrollo, Vite aprovecha los módulos nativos del navegador (ESM). Solo transpila los archivos bajo demanda cuando el navegador los solicita, resultando en tiempos de inicio instantáneos.</p>

<h2>Hot Module Replacement (HMR)</h2>
<p>El HMR de Vite es excepcionalmente rápido. Los cambios en el código se reflejan en el navegador en milisegundos, sin perder el estado de la aplicación. Esto transforma la experiencia de desarrollo.</p>

<h2>Producción con Rollup</h2>
<p>Para producción, Vite utiliza Rollup, un bundler maduro y optimizado. Genera bundle splitting automático, tree-shaking agresivo, y optimizaciones avanzadas que resultan en archivos finales pequeños y rápidos.</p>

<h2>Framework-agnostic</h2>
<p>Vite soporta React, Vue, Svelte, Preact y más. Plugins oficiales y de la comunidad amplían su funcionalidad para casi cualquier caso de uso.</p>

<p>Vite representa el estado actual del arte en herramientas de build frontend. Si estás empezando un nuevo proyecto, debería ser tu primera opción.</p>`,
    coverImage: "/assets/vite-bundler.webp",
    author: "Laura García",
    category: "Frontend",
    tags: ["vite", "bundler", "frontend", "tooling"],
    featured: false,
    views: 550,
  },
  {
    title: "Terraform: Infraestructura como código explicada",
    excerpt: "Aprende a gestionar infraestructura en la nube con Terraform. Desde la instalación hasta la creación de entornos completos reproducibles.",
    content: `<p>Terraform de HashiCorp es la herramienta líder para infraestructura como código (IaC). Permite definir, versionar y aprovisionar infraestructura de forma declarativa y reproducible.</p>

<h2>El enfoque declarativo</h2>
<p>En Terraform, describes el estado deseado de tu infraestructura, no los pasos para llegar ahí. Terraform calcula automáticamente los cambios necesarios y ejecuta la secuencia de acciones correcta.</p>

<h2>Providers</h2>
<p>Los providers son plugins que permiten interactuar con diferentes proveedores de nube y servicios: AWS, Azure, GCP, Cloudflare, GitHub, y muchos más. Cada provider ofrece recursos que puedes configurar.</p>

<h2>Estado</h2>
<p>El archivo de estado de Terraform almacena el mapeo entre tu configuración y los recursos reales en la nube. Gestionar el estado correctamente es crucial para equipos que trabajan colaborativamente.</p>

<h2>Módulos</h2>
<p>Los módulos permiten reutilizar configuraciones. Puedes crear módulos para patrones comunes (una VPC, un clúster Kubernetes, una base de datos) y reutilizarlos en múltiples proyectos.</p>

<h2>Mejores prácticas</h2>
<ul>
<li>Utiliza backends remotos para el estado (S3, Terraform Cloud)</li>
<li>Habilita state locking para evitar concurrent modifications</li>
<li>Versiona tu infraestructura junto con el código de la aplicación</li>
<li>Implementa CI/CD para planos y applies automáticos</li>
</ul>

<p>Terraform transforma la gestión de infraestructura de un proceso manual y propenso a errores en un proceso automatizado y auditable.</p>`,
    coverImage: "/assets/apis-restful-express.webp",
    author: "Miguel Torres",
    category: "DevOps",
    tags: ["terraform", "iac", "infrastructure", "devops"],
    featured: false,
    views: 480,
  },
  {
    title: "Transformers en NLP: Attention is All You Need",
    excerpt: "Entiende la arquitectura Transformer que revolucionó el procesamiento de lenguaje natural y dio origen a modelos como BERT, GPT y T5.",
    content: `<p>"Attention is All You Need" es el paper que cambió para siempre el campo del procesamiento de lenguaje natural. La arquitectura Transformer eliminó las RNNs y estableció un nuevo paradigma.</p>

<h2>Mecanismo de atención</h2>
<p>El mecanismo de atención permite al modelo pesar la importancia de cada token de entrada al procesar cada token de salida. Las Query, Key y Value son proyecciones lineales que permiten calcular atención de forma paralela.</p>

<h2>Self-Attention</h2>
<p>El self-attention permite que cada token en una secuencia "observe" todos los demás tokens y determine cuáles son más relevantes. Esto captura dependencias de largo alcance de forma más eficiente que las RNNs.</p>

<h2>Positional Encoding</h2>
<p>Como el Transformer procesa todos los tokens en paralelo, necesita una forma de codificar el orden. El positional encoding inyecta información de posición usando funciones seno y coseno a diferentes frecuencias.</p>

<h2>Variantes importantes</h2>
<ul>
<li>BERT: encoder-only, ideal para clasificación y extracción de información</li>
<li>GPT: decoder-only, optimizado para generación de texto</li>
<li>T5: encoder-decoder, enfoque unificado para múltiples tareas</li>
</ul>

<p>Comprender los Transformers es fundamental para entender el estado actual y futuro del procesamiento de lenguaje natural.</p>`,
    coverImage: "/assets/redes-neuronales.webp",
    author: "Sofía Ramírez",
    category: "IA",
    tags: ["transformers", "nlp", "attention", "ai"],
    featured: false,
    views: 890,
  },
  {
    title: "Express.js middleware: El patrón fundamental de Express",
    excerpt: "Domina el sistema de middleware de Express.js para crear aplicaciones modulares, seguras y mantenibles. Aprende a crear tus propios middlewares.",
    content: `<p>Los middlewares son el corazón de Express.js. Cada función de middleware tiene acceso al objeto request, response y al siguiente middleware en la cadena. Comprender este patrón es clave para dominar Express.</p>

<h2>¿Qué es un middleware?</h2>
<p>Un middleware es una función que ejecuta código entre la recepción de la petición y la envío de la respuesta. Puede: ejecutar código, modificar req/res, terminar el ciclo de petición, o llamar al siguiente middleware con next().</p>

<h2>Middleware de aplicación</h2>
<p>Se ejecuta para todas las rutas o un prefijo específico. Ejemplos: body-parser, CORS, logging, autenticación. Se registra con app.use().</p>

<h2>Middleware de ruta</h2>
<p>Se ejecuta solo para rutas específicas. Se pasa como segundo argumento a app.get(), app.post(), etc.</p>

<h2>Crear middlewares custom</h2>
<p>Los middlewares personalizados son extremadamente útiles para: validación de datos, autenticación, logging, manejo de errores, rate limiting, y lógica de negocio reutilizable.</p>

<h2>Patrones comunes</h2>
<ul>
<li>Middleware de autenticación que verifica tokens JWT</li>
<li>Middleware de validación que usa express-validator</li>
<li>Middleware de logging que registra cada petición</li>
<li>Middleware de roles que controla acceso por permisos</li>
</ul>

<p>El patrón de middleware es lo que hace a Express tan flexible y extensible. Domínalo, y podrás construir cualquier tipo de aplicación web.</p>`,
    coverImage: "/assets/nodejs-intro.webp",
    author: "Carlos Méndez",
    category: "Backend",
    tags: ["express", "nodejs", "middleware", "backend"],
    featured: false,
    views: 710,
  },
  {
    title: "Progressive Web Apps: Experiencia nativa en el navegador",
    excerpt: "Construye Progressive Web Apps que funcionen offline, se instalen en el escritorio y ofrezcan una experiencia similar a una app nativa.",
    content: `<p>Las Progressive Web Apps (PWAs) combinan lo mejor de la web y las aplicaciones nativas. Son rápidas, funcionan offline, y se pueden instalar en cualquier dispositivo.</p>

<h2>Características clave</h2>
<p>Una PWA debe ser: rápida (carga inicial < 3s), instalable (manifest.json), offline-capable (Service Workers), segura (HTTPS), y responsiva.</p>

<h2>Service Workers</h2>
<p>Los Service Workers son scripts que se ejecutan en background, separados de la página web. Interceptan peticiones de red, cachean recursos, y permiten que la app funcione sin conexión.</p>

<h2>Web App Manifest</h2>
<p>El manifest.json define cómo se ve la app cuando se instala: nombre, íconos, colores, orientación y URL de inicio. Es lo que permite la instalación en el escritorio y la pantalla de inicio móvil.</p>

<h2>Estrategias de cache</h2>
<ul>
<li>Cache First: ideal para assets estáticos</li>
<li>Network First: ideal para contenido dinámico</li>
<li>Stale While Revalidate: equilibrio entre velocidad y frescura</li>
<li>Cache Only: para funcionalidad offline completa</li>
</ul>

<h2>Lighthouse</h2>
<p>Google Lighthouse audita tu PWA y proporciona puntuaciones en rendimiento, accesibilidad, SEO y mejores prácticas. Es la herramienta de referencia para evaluar la calidad de tu PWA.</p>

<p>Las PWAs representan el futuro de la distribución de software: sin tiendas de aplicaciones, sin actualizaciones forzadas, y con alcance global inmediato.</p>`,
    coverImage: "/assets/progressive-web-apps.webp",
    author: "David López",
    category: "Frontend",
    tags: ["pwa", "service-workers", "frontend", "web-apps"],
    featured: false,
    views: 440,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Post.deleteMany({});
    console.log("Cleared existing posts");

    const postsWithSlugs = posts.map((p) => ({
      ...p,
      slug: slugify(p.title, { lower: true, strict: true }),
      readingTime: Math.max(1, Math.ceil(p.content.replace(/<[^>]*>/g, "").split(/\s+/).length / 200)),
    }));

    await Post.insertMany(postsWithSlugs);
    console.log(`Seeded ${postsWithSlugs.length} posts`);

    await mongoose.connection.close();
    console.log("Done. Connection closed.");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seed();
