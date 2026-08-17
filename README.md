# 📸 Cloudinary Media Bank - Next.js App

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind%20CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

Um aplicativo de banco de imagens de alta performance e interface escura customizada, desenvolvido com **Next.js** e **TypeScript**. O projeto consome recursos de mídia diretamente da API do **Cloudinary**, garantindo compressão automática, carregamento sob demanda (*lazy-loading*) e otimização visual responsiva com suporte do framework Tailwind CSS.

---

## ✨ Funcionalidades Principais

- **🌌 Tema Dark Customizado:** Interface polida com design escuro focado na experiência do usuário (UI/UX) para exibição de mídias de forma elegante.
- **☁️ Cloudinary Sync:** Galeria alimentada dinamicamente por uma API externa ou SDK nativo do Cloudinary para armazenamento e distribuição de imagens via CDN.
- **⚡ Performance Otimizada:** Uso intensivo de componentes e hooks estruturados do ecossistema Next.js para renderização rápida do lado do servidor ou do cliente.
- **📱 Layout Fluido:** Organização em categorias e grades dinâmicas criadas com Tailwind CSS para se adaptar perfeitamente a dispositivos móveis e desktops.

---

## 🛠️ Variáveis de Ambiente Necessárias

Para que a conexão com o Cloudinary funcione corretamente, você deve criar um arquivo `.env.local` na raiz do seu projeto e preenchê-lo com as suas credenciais obtidas no painel do Cloudinary:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

---

## 🎮 Como Executar o Projeto Localmente

1. Clone o repositório em sua máquina:
   ```bash
   git clone https://github.com
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd aleatorio
   ```
3. Instale todas as dependências necessárias:
   ```bash
   npm install
   # ou yarn install / pnpm install / bun install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o navegador e acesse a aplicação em [http://localhost:3000](http://localhost:3000).

---

## 📂 Estrutura de Pastas Essenciais

A arquitetura interna segue o padrão recomendado do Next.js moderno:

```text
├── public/                # Arquivos estáticos locais (ex: favicons, ícones base)
├── src/
│   ├── app/              # Estrutura de roteamento de páginas (App Router)
│   │   ├── page.tsx      # Página principal do banco de imagens
│   │   └── layout.tsx    # Layout global do app e fontes aplicadas
│   ├── styles/
│   │   └── style.css     # Arquivo de estilos importados
├── next.config.ts        # Permissões de domínios externos de imagens (Cloudinary)
├── tailwind.config.ts    # Configuração e paleta de cores customizada do Tailwind
└── tsconfig.json         # Mapeamentos e regras estritas do TypeScript
```

---

## 🔒 Configuração do Next Image

Lembre-se de que, para carregar imagens externas no Next.js usando o componente `<Image />`, o domínio do Cloudinary deve estar explicitamente liberado no seu arquivo `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "://cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```
