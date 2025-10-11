# 🚀 **Setup Completo do Sistema de Horários com Supabase**

## 📋 **Pré-requisitos**
- Conta no [Supabase](https://supabase.com)
- Node.js instalado
- Projeto clonado localmente

---

## 🎯 **Passo 1: Criar Projeto no Supabase**

### **1.1 Acesse o Supabase**
1. Vá para [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**

### **1.2 Configure o Projeto**
- **Nome**: `personal-trainer-horarios`
- **Organização**: Sua organização
- **Região**: `South America (São Paulo)` (mais próxima do Brasil)
- **Senha do Banco**: Crie uma senha forte e **ANOTE**

### **1.3 Aguarde a Criação**
- Processo leva 2-3 minutos
- Aguarde até aparecer "Project is ready"

---

## 🗄️ **Passo 2: Executar Script SQL**

### **2.1 Abrir SQL Editor**
1. No dashboard do Supabase, clique em **"SQL Editor"** (ícone </> na sidebar)
2. Clique em **"New Query"**

### **2.2 Executar o Script**
1. Abra o arquivo `supabase-setup.sql` deste projeto
2. **Copie TODO o conteúdo** do arquivo
3. **Cole** no SQL Editor do Supabase
4. Clique em **"Run"** (ou Ctrl+Enter)

### **2.3 Verificar Execução**
- Deve aparecer "Success. No rows returned"
- Se houver erro, verifique se copiou o script completo

---

## 🔑 **Passo 3: Obter Credenciais**

### **3.1 Acessar Configurações**
1. Clique em **"Settings"** (ícone ⚙️ na sidebar)
2. Clique em **"API"**

### **3.2 Copiar Informações**
Você verá duas informações importantes:

#### **Project URL:**
```
https://xyzabcdef.supabase.co
```

#### **API Keys - anon/public:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANTE:** Copie a chave `anon` (pública), NÃO a `service_role`!

---

## ⚙️ **Passo 4: Configurar o Projeto**

### **4.1 Criar Arquivo .env**
1. Vá para a pasta `client/` do projeto
2. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

### **4.2 Preencher Variáveis**
Abra o arquivo `.env` e preencha:

```env
VITE_SUPABASE_URL=https://xyzabcdef.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Substitua pelos seus dados reais!**

---

## 🧪 **Passo 5: Testar a Aplicação**

### **5.1 Instalar Dependências**
```bash
npm install
```

### **5.2 Executar em Desenvolvimento**
```bash
npm run dev
```

### **5.3 Testar Funcionalidades**

#### **Teste 1: Visualização de Horários**
1. Abra `http://localhost:5173`
2. Vá até os planos presenciais
3. Clique em **"Ver Horários Disponíveis"**
4. Deve abrir modal com horários padrão

#### **Teste 2: Painel Administrativo**
1. Acesse `http://localhost:5173/admin-horarios`
2. Faça login com senha: `jefferson2024`
3. Deve carregar horários existentes
4. Teste adicionar/remover horários
5. Clique em **"Salvar"**
6. Deve aparecer "✅ Horários salvos com sucesso!"

#### **Teste 3: Sincronização**
1. Mude alguns horários no admin
2. Salve as alterações
3. Volte para a página principal
4. Abra o modal de horários novamente
5. Deve mostrar os horários atualizados

---

## 🔍 **Passo 6: Verificar no Supabase**

### **6.1 Ver Dados na Tabela**
1. No Supabase, clique em **"Table Editor"**
2. Selecione a tabela **"horarios"**
3. Deve ver os registros salvos pelo admin

### **6.2 Testar Função SQL**
1. Vá para **"SQL Editor"**
2. Execute: `SELECT get_horarios_formatados();`
3. Deve retornar JSON com horários agrupados por dia

---

## ✅ **Indicadores de Sucesso**

### **🟢 Tudo Funcionando:**
- Modal de horários carrega rapidamente
- Admin mostra ícone WiFi verde (conectado)
- Salvamento funciona sem erros
- Dados aparecem no Supabase

### **🟡 Modo Offline:**
- Admin mostra ícone WiFi amarelo
- Horários padrão são exibidos
- Salvamento pode falhar

### **🔴 Problemas:**
- Erros no console do navegador
- Modal não carrega
- Admin não salva

---

## 🚀 **Passo 7: Deploy (Opcional)**

### **7.1 Variáveis no Vercel**
Ao fazer deploy, configure as mesmas variáveis:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### **7.2 Testar em Produção**
- Acesse seu site em produção
- Teste todas as funcionalidades
- Verifique se dados são salvos corretamente

---

## 🆘 **Solução de Problemas**

### **Erro: "Failed to fetch"**
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo
- Teste a URL do projeto no navegador

### **Erro: "Row Level Security"**
- Verifique se executou o script SQL completo
- Confirme se as políticas foram criadas

### **Horários não salvam**
- Verifique logs no console do navegador
- Teste a conexão com Supabase
- Confirme se a chave API está correta

### **Modal não carrega**
- Verifique se a função `get_horarios_formatados()` existe
- Teste executar a função manualmente no SQL Editor

---

## 📞 **Suporte**

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Teste as credenciais do Supabase
3. Confirme se o script SQL foi executado
4. Verifique se as variáveis de ambiente estão corretas

---

## 🎉 **Pronto!**

Seu sistema de horários está configurado e funcionando com:
- ✅ Banco de dados profissional (Supabase)
- ✅ Interface mobile para Jefferson
- ✅ Visualização para clientes
- ✅ Sincronização em tempo real
- ✅ Backup automático na nuvem

**Jefferson pode agora gerenciar horários de qualquer lugar! 📱⏰**
