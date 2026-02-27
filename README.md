#  Restaurant Management API — Orders & Inventory

API REST robusta para gestão operacional de restaurantes, focada em controle interno de pedidos, produtos, estoque e configurações administrativas.

Projetada para ambientes reais de operação (balcão, telefone, WhatsApp, PDV local), a aplicação não depende de plataformas externas de delivery e oferece controle completo do fluxo operacional.

O sistema suporta **múltiplas empresas (multi-tenant)**, permitindo que diferentes estabelecimentos utilizem a mesma infraestrutura com isolamento total de dados.

---

##  Overview

Esta API foi desenvolvida com foco em cenários reais de negócio, indo além de um CRUD básico.

O sistema implementa:

* Regras de negócio complexas e consistentes
* Controle avançado de pedidos e estoque
* Cache estratégico integrado à arquitetura
* Segurança e autenticação robustas
* Estrutura escalável para crescimento futuro
* Geração de relatórios server-side
* Base para dashboard analítico

---

## Arquitetura

A aplicação segue uma arquitetura em camadas orientada a objetos, priorizando organização, manutenibilidade e escalabilidade.

```
Controller → Service → Repository → Database
```

Características principais:

* Separação clara de responsabilidades
* Regras de negócio centralizadas na camada de serviço
* Modelagem orientada a domínio
* Código fortemente tipado
* Preparada para evolução e refatorações

---

##  Tech Stack

* **Node.js + Express** — API REST
* **TypeScript** — Tipagem estática
* **TypeORM** — ORM 
* **MySQL** — Banco de dados relacional
* **Redis** — Cache estratégico
* **JWT** — Autenticação via token
* **Yup** — Validação de dados
* **bcryptjs** — Hash de senhas
* **Handlebars (SSR)** — Geração de relatórios no servidor

---

##  Core Domains

###  Products

Gerenciamento completo de produtos com operações avançadas:

* Criação e edição de produtos
* Associação obrigatória com categorias
* Controle de status (ativo/inativo)
* Filtros e consultas avançadas
* Integração direta com regras de estoque
* Atualizações consistentes entre módulos

---

###  Categories

* Cadastro e manutenção de categorias
* Organização lógica do catálogo
* Integração com produtos
* Operações completas de gestão

---

###  Orders

Módulo central do sistema, responsável pelo fluxo operacional:

* Criação de pedidos
* Atualização e controle de status
* Filtragem avançada
* Associação com produtos
* Integração automática com estoque
* Preparado para relatórios e métricas

---

###  Settings

Gerenciamento de configurações da empresa:

* Definição de frete padrão
* Atualização de dados cadastrais
* Alteração de nome e senha
* Configurações operacionais gerais

---

###  Reports

O sistema gera relatórios server-side utilizando Handlebars:

* Geração de notas e documentos operacionais
* Processamento no servidor (SSR)
* Estrutura pronta para expansão analítica

---

###  Dashboard (em desenvolvimento)

Planejado para fornecer:

* Indicadores operacionais
* Métricas de vendas
* Relatórios consolidados
* Visão estratégica do negócio

---

##  Multi-Tenant Architecture

* Suporte a múltiplas empresas na mesma aplicação
* Isolamento completo de dados
* Controle de acesso por empresa
* Base preparada para modelo SaaS

---

##  Strategic Caching with Redis

O Redis é utilizado como camada de cache integrada à lógica da API, com objetivo de:

* Reduzir carga no banco de dados
* Otimizar endpoints críticos
* Melhorar tempo de resposta
* Aumentar escalabilidade

---

##  Security

* Autenticação baseada em JWT
* Senhas criptografadas com bcrypt
* Validação rigorosa de entradas
* Controle de acesso multiempresa

---

##  Key Characteristics

✔️ Regras de negócio complexas e integradas
✔️ Arquitetura preparada para produção
✔️ Sistema multiempresa desde a concepção
✔️ Cache estratégico aplicado na camada da API
✔️ Estrutura extensível para novas funcionalidades

---

##  Purpose

Fornecer uma base sólida e escalável para sistemas de gestão interna de restaurantes, demonstrando boas práticas modernas de desenvolvimento backend com Node.js e TypeScript.

---

## Author

**Gabriel Ribeiro**


---


