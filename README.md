# Landing Page - Jefferson Vidal Personal Trainer

## 🚀 Deploy no Vercel

Esta aplicação está pronta para deploy no Vercel. Siga os passos abaixo:

### 1. Preparação
- ✅ Configuração do Vercel (`vercel.json`) criada
- ✅ Scripts de build configurados
- ✅ Output directory configurado para `client/dist`
- ✅ Build testado e funcionando

### 2. Como fazer o deploy

#### Opção 1: Via GitHub (Recomendado)
1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte sua conta GitHub
4. Importe o repositório
5. O Vercel detectará automaticamente as configurações
6. Clique em "Deploy"

#### Opção 2: Via Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel --prod
```

### 3. Configurações importantes

#### Build Settings (caso precise ajustar manualmente):
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install`

#### Variáveis de ambiente (se necessário):
- Adicione no painel do Vercel em Settings > Environment Variables

### 4. Estrutura do projeto
```
├── client/           # Frontend React + Vite
├── server/           # Backend Express (não usado no deploy estático)
├── shared/           # Código compartilhado
├── vercel.json       # Configuração do Vercel
└── package.json      # Dependências e scripts
```

### 5. Características da aplicação
- ✅ **SPA (Single Page Application)** - Otimizada para Vercel
- ✅ **Responsiva** - Funciona em todos os dispositivos
- ✅ **Performance otimizada** - Build com Vite
- ✅ **SEO friendly** - Meta tags configuradas
- ✅ **Links de pagamento** - Integração com Kiwify

### 6. Após o deploy
- O site estará disponível em uma URL do tipo: `https://seu-projeto.vercel.app`
- Configure um domínio customizado se desejar
- Teste todos os links de pagamento
- Verifique a responsividade em diferentes dispositivos

### 7. Atualizações
Para atualizar o site:
1. Faça as alterações no código
2. Commit e push para o GitHub
3. O Vercel fará o deploy automaticamente

---

## 🎯 Recursos da Landing Page

### Seções principais:
- **Hero Section** - Apresentação principal
- **Benefícios** - Vantagens do serviço
- **Sobre** - Informações do Jefferson Vidal
- **Depoimentos** - Testemunhos em vídeo
- **Resultados** - Carrossel de transformações
- **Preços** - Planos com links para pagamento
- **FAQ** - Perguntas frequentes
- **Contato** - WhatsApp

### Tecnologias utilizadas:
- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Vite** - Build tool
- **Radix UI** - Componentes acessíveis

### Links de pagamento (Kiwify):
- **Mensal**: https://pay.kiwify.com.br/iqaEF5m
- **Trimestral**: https://pay.kiwify.com.br/uhNZZBN
- **Semestral**: https://pay.kiwify.com.br/pg5M9Rb

---

## 📞 Suporte

Para dúvidas sobre o deploy ou modificações na landing page, entre em contato.

**Aplicação pronta para conversão! 🚀**
