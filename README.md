# Investigacion_aplicada_1_DPS

Investigación aplicada 1 para la materia de DPS en la UDB.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuir](#contribuir)
- [Licencia](#licencia)
- [Contacto](#contacto)
- [Créditos](#créditos)

## Descripción

Creación de chatbot haciendo uso de Github Copilot y React.
Se crearon dos chatbots, uno haciendo uso de una api y otro del modulo de natural para node.js para la creación de un modelo de NLP.

## Características

- Frontend con React
- Implementación de API de Gemini
- Implementación de modelo de NLP junto con su entrenamiento

## Instalación

### Prerrequisitos

- Se necesita tener la ultima version de Node.js

### Pasos de Instalación

1. Clonar el repositorio:
    ```sh
    git clone https://github.com/Franckalv/Investigacion_aplicada_1_DPS
    ```
2. Navegar al directorio del proyecto:
    ```sh
    cd Investigacion_aplicada_1_DPS
    ```
3. Escoger el chatbot a usar:
    ```sh
    cd Chatbot con modelo NLP
    ```
    o
    ```sh
    cd Chatbot con API
    ```
4. Instalar dependencias:
    ```sh
    npm install
    ```
    o
    ```sh
    pip install -r requirements.txt
    ```

## Uso
### Si haras uso del chatbot con el NLP
1. Primero necesitas ejecutar el servidor
    ```sh
    node server.js
    ```
2. Luego ya puedes ejecutar el run dev y probar el modelo
    ```sh
    npm run dev
    ```
### Si haras uso del chatbot con la API
1. Ejecutar el run dev y probar el modelo
    ```sh
    npm run dev
    ```
