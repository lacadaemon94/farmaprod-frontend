# Guía de Configuración y Ejecución para FarmaProd FrontEnd
## Prerrequisitos
- Docker y Docker Compose.

## Configuración
1. Clonar el Repositorio:
```bash
git clone https://github.com/lacadaemon94/farmaprod-frontend
cd farmaprod-frontend
```
2. Construir Docker
```bash
docker build -t farmaprod-frontend:latest .
```
3. Correr el Docker
```bash
docker run -p 3000:3000 farmaprod-frontend:latest
```

## Estructura del Proyecto
```bash
farmaprod-frontend/
│
├── node_modules/
├── public/
├── src/
│   ├── api/
│   │   └── drugstore.jsx
│   │   └── branch.jsx
│   ├── lib/
│   │    └── SessionProvider.jsx #Wraps app to pass down critical data
│   ├── ui/
│   │   ├── components/ 
│   │   │   └── FilterDropDown.jsx
│   │   │   └── InventoryTable.jsx
│   │   │   └── ProductTable.jsx
│   │   │   └── Layout.jsx
│   │   │   ├── index.js
│   │   ├── pages/ 
│   │   │   ├── branch/ 
│   │   │   │   └── InventoryManagement.jsx
│   │   │   │   └── OrdersManagement.jsx
│   │   │   │   └── ProductManagement.jsx
│   │   │   ├── drugstore/ 
│   │   │   │   └── InventoryManagement.jsx
│   │   │   │   └── OrdersManagement.jsx
│   │   │   │   └── ProductManagement.jsx
│   │   │   ├── Branch.jsx        # To select which branch to act as
│   │   │   ├── Role.jsx          # To select whether to act as the drugstore or as a branch
│   │   │   ├── NotFound.jsx      # 404
│   │   │   ├── index.js
│   ├── App.js
│   ├── index.js
│   ├── tailwind.css
├── .env
├── .package.json
├── .tailwind.config.js
├── .postcss.config.js
└── ...
```

## Funciones:
- Drogueria
  - Ver todo los inventarios
  - Filtrar por inventarios
  - Añadir productos a bodega
  - Transferir entre tipo de inventarios
  - Ver Ordenes realizadas por sucursales
  - Ver detalles de ordenes
  - Ver Productos
  - Crear Producto, con envase, dimensiones de envase e ingredientes.
  - Modificar Producto.
- Farmacias
  - Ver inventario propio
  - Transferir entre tipos propios de inventario
  - Crear ordenes de suministro con cantidad y producto
  - Ver Productos compartidos
  - Ver Ordenes creadas (propias)
 
## Nota
- Un problema en el formato de las fechas provoca errores en las transferencias, no tuvo tiempo de depurarlo.
