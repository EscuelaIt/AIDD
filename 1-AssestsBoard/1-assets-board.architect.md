# Assets Board Architect

> Product Requirements Document

AssetsBoard es una plataforma para la gestión de activos financieros como acciones y criptomonedas.

## Funcionalidades

### Crear portfolio

- Permite al usuario crear un portfolio de activos financieros con un email y una aportación inicial.

### Compar y vender activos

- Permite al usuario comprar y vender activos financieros en el portfolio. Para cada uno se entrará:

  - Tipo de operación: compra o venta.
  - Símbolo del activo: ejemplo BTC, ETH, AAPL, MSFT, etc.
  - Cantidad: ejemplo 0.05 BTC, 10 ETH, 100 AAPL, 50 MSFT, etc.
  - Precio: ejemplo 95800 USD por BTC, 20 USD por ETH, 15 USD por AAPL, 250 USD por MSFT, etc.
  - Fecha: ejemplo 2025-10-01, 2026-11-02, etc.

    Debe impedir la compra de un activo si no hay suficiente saldo en el portfolio.
    Debe impedir la venta de un activo si no hay suficiente cantidad en el portfolio.

### Consultar portfolio

- Permite al usuario consultar el estado del portfolio, incluyendo:
  - Saldo total en USD.
  - Lista de activos con su cantidad y valor de comprado.

### Especificaciones técnicas

- Interfaz: La plataforma se ofrecerá como un API RESTful.
- Seguridad: Inicialmente, la plataforma no requiere autenticación.
- Persistencia: Los datos se almacenarán en el sistema de archivos local.

## Dominio

### Portfolio

- **ID**: Identificador único del portfolio.
- **Email**: Correo electrónico del propietario del portfolio.
- **Cash**: Saldo en efectivo del portfolio.
- **Assets**: Lista de activos financieros en el portfolio. Calculado bajo demanda a partir de las operaciones realizadas.

### Operation

- **ID**: Identificador único de la operación.
- **Type**: Tipo de operación (compra o venta).
- **Symbol**: Símbolo del activo (ejemplo: BTC, ETH, AAPL, MSFT).
- **Amount**: Cantidad del activo (ejemplo: 0.05 BTC, 10 ETH, 100 AAPL, 50 MSFT).
- **Price**: Precio del activo en el momento de la operación (ejemplo: 95800 USD por BTC, 20 USD por ETH, 15 USD por AAPL, 250 USD por MSFT).
- **Date**: Fecha de la operación (ejemplo: 2025-10-01, 2026-11-02).
- **PortfolioID**: Identificador del portfolio al que pertenece la operación.

### Asset

- **Symbol**: Símbolo del activo (ejemplo: BTC, ETH, AAPL, MSFT).
- **Amount**: Cantidad del activo en el portfolio.
- **Price**: Precio del activo en el momento de la compra (ejemplo: 95800 USD por BTC, 20 USD por ETH, 15 USD por AAPL, 250 USD por MSFT).
