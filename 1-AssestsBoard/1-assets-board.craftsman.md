# Assets Board Craftsman

## Pruebas de aceptación

### Creación de un portfolio

```gherkin
Feature: Crear un portfolio
  Scenario: Crear un portfolio con éxito
    Given el usuario envía una solicitud POST a /portfolios con los siguientes datos:
    {
      "email": "user@acme.com",
      "cash": 1000
      }
    When el servidor procesa la solicitud
    Then el servidor responde con un código 201 Created y devuelve el portfolio creado:
    {
      "id": "portfolio-id",
      "email": "user@acme.com",
      "cash": 1000
    }
```

### Compra de un activo

```gherkin
Feature: Comprar un activo
  Scenario: Comprar un activo con éxito
    Given el usuario envía una solicitud POST a /operations con los siguientes datos:
    {
      "portfolioId": "portfolio-id",
      "type": "buy",
      "symbol": "BTC",
      "amount": 0.05,
      "price": 95800,
      "date": "2025-10-01"
    }
    When el servidor procesa la solicitud
    Then el servidor responde con un código 201 Created y devuelve la operación creada:
    {
      "id": "operation-id",
      "type": "buy",
      "symbol": "BTC",
      "amount": 0.05,
      "price": 95800,
      "date": "2025-10-01",
      "portfolioId": "portfolio-id"
    }
```

### Venta de un activo

```gherkin
Feature: Vender un activo
  Scenario: Vender un activo con éxito
    Given el usuario envía una solicitud POST a /operations con los siguientes datos:
    {
      "portfolioId": "portfolio-id",
      "type": "sell",
      "symbol": "ETH",
      "amount": 10,
      "price": 20,
      "date": "2026-11-02"
    }
    When el servidor procesa la solicitud
    Then el servidor responde con un código 201 Created y devuelve la operación creada:
    {
      "id": "operation-id",
      "type": "sell",
      "symbol": "ETH",
      "amount": 10,
      "price": 20,
      "date": "2026-11-02",
      "portfolioId": "portfolio-id"
    }
```

### Consulta del portfolio

```gherkin
Feature: Consultar un portfolio
  Scenario: Consultar el estado de un portfolio
    Given el usuario envía una solicitud GET a /portfolios/portfolio-id
    When el servidor procesa la solicitud
    Then el servidor responde con un código 200 OK y devuelve el estado del portfolio:
    {
      "id": "portfolio-id",
      "email": "user@acme.com",
      "cash": 100,
      "assets": [
        {
          "symbol": "BTC",
          "amount": 0.05,
          "price": 95800
        },
        {
          "symbol": "ETH",
          "amount": 10,
          "price": 20
        }
      ]
    }
```

## Documento de mantenimiento

- **Objetivo**: Proporcionar un documento que detalle la arquitectura, diseño y mantenimiento del sistema.

### Scaffolding

- **Estructura del proyecto**:



### Componentes

- Controladores:

  - `PortfoliosController`: Maneja las operaciones relacionadas con los portfolios.
  - `OperationsController`: Maneja las operaciones de compra y venta de activos.

- Servicios:
  - `PortfoliosService`: Lógica de negocio para manejar portfolios.
  - `BuysService`: Lógica de negocio para manejar operaciones de compra.
  - `SellsService`: Lógica de negocio para manejar operaciones de venta.
- Repositorios:
  - `PortfoliosRepository`: Interactúa con el sistema de archivos para almacenar y recuperar portfolios.
  - `OperationsRepository`: Interactúa con el sistema de archivos para almacenar y recuperar operaciones
