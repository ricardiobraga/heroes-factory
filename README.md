# 🦸 Sistema de Gerenciamento de Heróis - Full Stack

Um sistema completo de CRUD para gerenciamento de super heróis , seguindo boas práticas de arquitetura e design patterns.

## 📋 Visão Geral

Projeto full-stack implementando um sistema robusto com:

- **Backend**: API RESTful em Node.js/TypeScript com Express e Prisma ORM
- **Frontend**: Aplicação Next.js com App Router e Ant Design
- **Banco de Dados**: MySQL com Docker
- **Infraestrutura**: Docker Compose para ambiente completo

## 🏗️ Arquitetura Técnica

### **Backend Structure**

```bash
backend/
├── src/
│ ├── modules/
│ │ └── heroes/
│ │ ├── controller.ts
│ │ ├── service.ts
│ │ ├── repository.ts
│ │ └── validations.ts
│ ├── shared/
| │ ├── config/
│ │ ├── database/
│ │ └── errors/
│ ├── app.ts
│ └── server.ts
├── prisma/
│ ├── schema.prisma
│ ├── migrations/
│ └── seed.ts
└── prisma.config.ts
```

### **Frontend Structure**

```bash
frontend/
├── app/
│ ├── heroes/
│ │ ├── page.tsx
│ │ ├── HeroList.tsx
│ │ ├── HeroCard.tsx
│ │ └── components/
│ ├── components/
│ │ ├── HeroFormModal/
│ │ ├── HeroDetailsModal/
│ │ └── SearchBar/
│ ├── services/
│ │ └── heroes.service.ts
│ ├── types/
│ │ └── hero.ts
│ ├── layout.tsx
│ └── page.tsx
├── config/
│ └── themeConfig.ts
└── public/
```

### 🧪 Testes Automatizados

Este projeto possui testes unitários no backend focados na camada de serviços (Services), garantindo que as regras de negócio funcionem de forma isolada, sem dependência de banco de dados ou infraestrutura externa.

```bash
backend
├── backend/tests
│   ├── backend/tests/unit
│   │   └── backend/tests/unit/heroes
│   │       └── backend/tests/unit/heroes/services
│   │           ├── backend/tests/unit/heroes/services/CreateHeroService.spec.ts
│   │           ├── backend/tests/unit/heroes/services/ListHeroesService.spec.ts
│   │           ├── backend/tests/unit/heroes/services/UpdateHeroService.spec.ts
│   │           ├── backend/tests/unit/heroes/services/UpdateHeroStatusService.spec.ts
│   │           └── backend/tests/unit/heroes/services/DeleteHeroService.spec.ts
│   ├── backend/tests/integration
│   │   └── backend/tests/integration/heroes
│   │       ├── backend/tests/integration/heroes/create-hero.spec.ts
│   │       ├── backend/tests/integration/heroes/list-heroes.spec.ts
│   │       ├── backend/tests/integration/heroes/update-hero.spec.ts
│   │       └── backend/tests/integration/heroes/delete-hero.spec.ts
├── backend/jest.config.ts
└── backend/jest.setup.ts
```

## 🚀 Stacks

### **Backend**

- **Node.js** + **TypeScript**
- **Express.js**
- **Prisma ORM**
- **MySQL/MariaDB**
- **Docker**

### **Frontend**

- **Next.js 16**
- **Ant Design**
- **TypeScript**
- **CSS Modules**

## ✨ Features Implementadas

### **Funcionalidades de Negócio**

- ✅ **CRUD Completo** - Create, Read, Update, Delete de heróis
- ✅ **Paginação Server-Side** - Performance otimizada com controle no backend
- ✅ **Busca em Tempo Real** - Filtro por nome e apelido
- ✅ **Status Ativo/Inativo** - Toggle com validação de regras de negócio

### **Experiência do Usuário**

- ✅ **Interface Responsiva** - Mobile-first design
- ✅ **Modais Contextuais** - Confirmações para ações destrutivas
- ✅ **Feedback Visual** - Toasts e loadings para todas as operações
- ✅ **Validação em Tempo Real** - Prevenção de erros do usuário

### **Qualidade de Código**

- ✅ **Separação de Responsabilidades** - Clean Architecture
- ✅ **Type Safety** - TypeScript em todo o projeto
- ✅ **Error Handling** - Tratamento consistente de erros
- ✅ **Code Splitting** - Otimização de bundle
- ✅ **Environment Config** - Variáveis por ambiente

## 🔧 Configuração e Execução do Projeto

### 1. Clone e Acesse o Projeto

```bash
git clone git@github.com:ricardiobraga/heroes-factory.git
cd heroes-factory
```

### 2. 2. Suba o Banco de Dados com Docker

```bash
docker-compose up -d
```

### 3. Inicie o Backend

```bash
# Acesse a pasta do backend
cd backend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Copie o arquivo .env.example para .env
cp .env.example .env

# O arquivo .env já vem pré-configurado com:
# DATABASE_URL="mysql://root:root@localhost:3306/heroes_db"
# PORT=3001
# CORS_ORIGIN="http://localhost:3000"

# Execute as migrações do Prisma
npx prisma migrate dev

# Popule o banco de dados com dados iniciais
npm run seed

# Inicie o servidor de desenvolvimento
npm run dev

# O backend estará disponível em: http://localhost:3001
```

## Para executar os testes unitários

```bash
# Acesse a pasta do backend
cd backend

npm run test:unit
```

## Para executar os testes de integração

```bash
# Acesse a pasta do backend
cd backend

npm run test:integration
```

### 4. Inicie o Frontend

```bash
# Acesse a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# O arquivo .env já vem pré-configurado com:
# NEXT_PUBLIC_API_URL="http://localhost:3001"

# Inicie o servidor de desenvolvimento
npm run dev

# O frontend estará disponível em: http://localhost:3000
```
