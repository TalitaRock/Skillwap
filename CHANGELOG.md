# 📝 CHANGELOG — SkillSwap
> **Registro Cronológico de Decisões Técnicas, Correções de Código, Refatorações e Revisões de Engenharia**  
> **Projeto:** SkillSwap — Plataforma Colaborativa de Troca de Conhecimentos  
> **Padrão:** Baseado no formato *Keep a Changelog* e versionamento semântico (*SemVer*).

---

## 📌 Sumário de Versões

* [Versão 1.0.1 (Atual) — 13/11/2026](#versão-101---13112026-release-candidate)
* [Versão 1.0.0 — Outubro de 2026](#versão-100---outubro-de-2026-baseline-sdd)

---

## [Versão 1.0.1] - 13/11/2026 (Release Candidate)

Esta versão representa a consolidação da camada de acesso e autenticação, resolução de exceções de tempo de execução (*null-safety*), proteção de rotas restritas e entrega da documentação técnica e funcional final da plataforma.

### 🎯 1. Principais Decisões de Arquitetura e Design Tomadas

1. **Implementação de Tela de Acesso Unificada (`renderAuthView`)**:
   * *Decisão:* Em vez de criar páginas HTML separadas (`login.html` e `cadastro.html`), optou-se por manter a arquitetura **SPA (Single-Page Application)** pura, criando um componente funcional com abas interativas (*segmented control*) em [app.js](file:///c:/xampp/htdocs/skillswap/app.js).
   * *Motivo:* Garantir transição visual fluida, preservar o estado em memória (`appState`), manter o mesmo tema visual escuro com *Glassmorphism* e não exigir recarregamento da janela do navegador.

2. **Adoção do Padrão "Guest Mode" vs "Authenticated Mode" na Navbar**:
   * *Decisão:* A barra superior de navegação ([app.js](file:///c:/xampp/htdocs/skillswap/app.js#L700-L750)) agora detecta se `appState.currentUser` está nulo. Caso esteja nulo, renderiza apenas o logo institucional e os botões de ação rápida (*"Entrar"* e *"Cadastrar-se"*). Caso esteja logado, exibe os links de navegação, contadores de trocas, XP pill, notificações e menu de avatar.
   * *Motivo:* Evitar que visitantes tenham acesso aos controles restritos antes de se identificarem.

3. **Inclusão de Contas de Demonstração Rápidas (1 Clique)**:
   * *Decisão:* Inserir na aba de login uma seção com botões das personas do sistema (*Ana Silva*, *Carlos Mendes* e *Rodrigo Admin*).
   * *Motivo:* Facilitar os testes do cliente e avaliadores durante demonstrações locais, permitindo validar o fluxo sem precisar digitar credenciais manualmente.

4. **Medidor Dinâmico de Força de Senha no Cadastro**:
   * *Decisão:* Implementar a função `updatePasswordStrength(pwd)` vinculada ao evento `oninput` do campo de senha, calculando um índice de complexidade (comprimento, dígitos numéricos, caracteres especiais) e refletindo em uma barra com feedback visual (*Fraca*, *Média*, *Forte*).
   * *Motivo:* Cumprir o requisito de incentivo a credenciais seguras sem bloquear cadastros em ambiente de homologação.

5. **Gamificação no Cadastro (+50 XP de Boas-vindas)**:
   * *Decisão:* Ao finalizar o cadastro, o usuário recebe imediatamente 50 XP, notificação in-app de acolhimento e animação de confetes na tela via `canvas-confetti`.
   * *Motivo:* Alinhamento integral ao requisito funcional **RF01** da especificação.

---

### 🛠️ 2. Correções de Código e Ajustes de Robustez (Bug Fixes)

1. **Correção de `TypeError: Cannot read properties of null (reading 'xp')`**:
   * *Problema Anterior:* O código original de `renderAppNavbar()` acessava diretamente `const user = appState.currentUser; const xpPercentage = (user.xp % 250) / 2.5;`. Se o usuário fizesse logout ou entrasse sem sessão ativa, ocorria uma quebra de execução fatal no console.
   * *Correção:* Adicionada cláusula de guarda inicial em `renderAppNavbar()`: se `!user`, renderiza a barra limpa de convidado e retorna imediatamente, prevenindo qualquer tentativa de leitura em objeto nulo.

2. **Correção de Senhas Ausentes nos Dados Mockados**:
   * *Problema Anterior:* Os usuários pré-cadastrados no código (`defaultState.users`) possuíam dados de perfil e habilidades, porém não possuíam o atributo `password` declarado, impossibilitando a validação de login por senha.
   * *Correção:* Adicionado explicitamente o atributo `password: '123456'` em todos os 5 usuários mockados (`user-1`, `user-2`, `user-3`, `user-4`, `user-admin`).

3. **Resiliência na Hidratação do `LocalStorage` (`loadState`)**:
   * *Problema Anterior:* Usuários que já tivessem o `appState` salvo em cache no navegador com a versão anterior poderiam ficar presos com objetos de usuário sem o campo `password`.
   * *Correção:* A função `loadState()` em [app.js](file:///c:/xampp/htdocs/skillswap/app.js) foi aprimorada para percorrer a lista de usuários desserializada e atribuir o valor padrão `'123456'` caso `u.password` esteja indefinido.

4. **Interceptação e Proteção de Rotas em `switchView`**:
   * *Problema Anterior:* Um usuário deslogado podia digitar `#trocas` ou `#chat` diretamente na barra de endereço da URL e abrir telas que dependiam do ID do usuário autenticado.
   * *Correção:* Adicionada regra no topo de `switchView(viewName)`:
     ```javascript
     if (!appState.currentUser && viewName !== 'certificado' && viewName !== 'auth' && viewName !== 'login' && viewName !== 'cadastro') {
       viewName = 'auth';
     }
     ```
     Qualquer tentativa de acesso restrito sem sessão redireciona imediatamente para a tela de autenticação.

5. **Inicialização no Carregamento da Página (`DOMContentLoaded`)**:
   * *Problema Anterior:* O bootstrap da aplicação abria obrigatoriamente a rota `#explorar` mesmo sem usuário logado.
   * *Correção:* Atualizada a lógica de inicialização:
     ```javascript
     let hash = window.location.hash.replace('#', '');
     if (!hash) {
       hash = appState.currentUser ? 'explorar' : 'auth';
     }
     switchView(hash);
     ```

---

### 🔍 3. O que foi Revisado e Aprimorado das Propostas Iniciais do Agente

Durante a concepção e implementação pelo agente, diversos pontos foram criticamente revisados e aprimorados:

1. **Revisão da Alternância de Abas vs. Telas Separadas**:
   * *Proposta Inicial:* Cogitou-se criar duas telas distintas no roteador: uma rota `#login` e uma rota `#cadastro`.
   * *Revisão Aplicada:* Unificou-se em uma única tela de acesso (`#auth`), na qual os painéis de Login e Cadastro coexistem no mesmo cartão e alternam sua visibilidade instantaneamente por classes CSS (`hidden`), com botões de abas estilizados. As rotas `#login` e `#cadastro` foram mantidas como aliases transparentes para conveniência do usuário.

2. **Revisão da Visibilidade de Senhas (Campo Password)**:
   * *Proposta Inicial:* Utilizar campos `input[type="password"]` convencionais sem botão de alternância.
   * *Revisão Aplicada:* Adicionado botão de olho (*Lucide `eye` / `eye-off`*) em ambos os formulários (Login e Cadastro), permitindo ao usuário conferir a senha digitada antes de submeter, reduzindo drasticamente erros de digitação.

3. **Revisão da Recuperação de Senha (RF03)**:
   * *Proposta Inicial:* Criar um link estático sem ação prática.
   * *Revisão Aplicada:* Implementado o modal interativo `openForgotPasswordModal()` com validação de e-mail e exibição de alerta de sucesso simulando o envio de token seguro com tempo limitado, cumprindo com fidelidade a especificação.

4. **Revisão das Ações de Sessão no Menu do Perfil**:
   * *Proposta Inicial:* O menu dropdown do usuário possuía apenas o simulador de persona.
   * *Revisão Aplicada:* Foram criadas opções formais de gestão de conta:
     * Botão com ícone de troca: *"Tela de Acesso / Trocar Conta"* (`switchView('auth')`);
     * Botão em tom carmim: *"Sair da Conta (Logout)"* (`handleLogout()`).

---

### 📂 4. Rastreabilidade de Arquivos Modificados / Criados

| Arquivo | Natureza da Alteração | Descrição das Modificações |
| :--- | :--- | :--- |
| [app.js](file:///c:/xampp/htdocs/skillswap/app.js) | **Modificação Substancial** | • Adicionada a função `renderAuthView()` com layout responsivo de login e cadastro.<br>• Adicionadas funções de controle: `switchAuthTab()`, `showAuthAlert()`, `togglePasswordVisibility()`, `updatePasswordStrength()`, `fillQuickLogin()`, `handleLoginSubmit()`, `handleRegisterSubmit()`, `handleLogout()`, `openForgotPasswordModal()` e `handleForgotPasswordSubmit()`.<br>• Correção do `renderAppNavbar()` com suporte a visitantes.<br>• Adicionadas opções de logout e troca de conta no dropdown do usuário.<br>• Adicionadas senhas aos usuários mockados e hidratação resiliente em `loadState()`.<br>• Interceptor de proteção de rotas em `switchView()`. |
| [styles.css](file:///c:/xampp/htdocs/skillswap/styles.css) | **Modificação** | • Adicionadas regras de animação `@keyframes fadeInSlideUp` e classe `.auth-panel-anim`.<br>• Estilização e transições suaves da barra dinâmica de força de senha (`#pwd-strength-bar`). |
| [index.html](file:///c:/xampp/htdocs/skillswap/index.html) | **Inspeção / Validação** | • Validada a integridade dos pontos de montagem (`#navbar-container`, `#main-content`, `#modal-container`, `#xp-toasts-container`) e dependências CDN (Tailwind, Lucide, Canvas Confetti). |
| [README.md](file:///c:/xampp/htdocs/skillswap/README.md) | **Criação** | • Documentação consolidada de apresentação, resumo executivo, guia de execução via XAMPP ou navegador direto, e tabela de credenciais de teste. |
| [SPEC_FINAL.md](file:///c:/xampp/htdocs/skillswap/SPEC_FINAL.md) | **Criação** | • Especificação técnica e funcional completa de engenharia de software para entrega ao cliente (11 tópicos formais, matrizes RF/RNF, diagramas de fluxo, regras de negócio e plano de testes). |
| [CHANGELOG.md](file:///c:/xampp/htdocs/skillswap/CHANGELOG.md) | **Criação** | • Este documento formal de rastreabilidade de decisões, correções e revisões de engenharia. |

---

## [Versão 1.0.0] - Outubro de 2026 (Baseline SDD)

* **Release Inicial**: Versão preliminar construída com base na especificação inicial *Spec-Driven Development (SDD)* contida em [Desenvolvimento do trabalho.md](file:///c:/xampp/htdocs/skillswap/Desenvolvimento%20do%20trabalho.md).
* **Módulos Criados**:
  * Motor do Algoritmo IA Match 2.0 (`calculateMatchScore`);
  * Painel de Trocas Bilaterais com abas de status;
  * Chat direto integrado com mensagens persistidas;
  * Sala de Aula WebRTC com áudio, vídeo, tela e notas compartilhadas;
  * Agenda de aulas com integração a salas virtuais;
  * Painel de Conquistas e Gamificação estilo Duolingo;
  * Painel Administrativo restrito (`role === 'ADMIN'`);
  * Emissão de Certificados Digitais com hash criptográfico e suporte a impressão.

