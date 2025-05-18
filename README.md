# 💈 Golden Razor - Sistema de Agendamentos
**Projeto desenvolvido como trabalho acadêmico para a faculdade**  

### Créditos de Desenvolvimento  
- **Design, HTML e CSS**: [Filipe](https://github.com/Lipeh011) (colega de equipe)  
- **Conversão para Angular e Back-End**: Minha responsabilidade
  
Bem-vindo ao repositório da **Golden Razor**, uma aplicação desenvolvida com Angular para gerenciar clientes, barbeiros e agendamentos em uma barbearia moderna. O sistema é dividido em dois painéis distintos: o **Painel do Usuário (Cliente)** e o **Painel do Barbeiro (Administração)**.


## 🚀 Funcionalidades


### 👤 Painel do Cliente


- **Autenticação e Perfil**
  - Login e registro de novos clientes.
  - Edição de dados pessoais como nome, e-mail e telefone.

- **Agendamento de Serviços**
  - Agendamento de serviços como Corte, Barba e Corte + Barba.
  - Escolha da data e hora desejadas.
  - Visualização de todos os agendamentos com status.

- **Preferências**
  - Escolha e salvamento do serviço preferido.
  - Visualização da preferência atual diretamente no painel.

- **Navegação fluida**
  - Scroll suave entre seções: Perfil, Agendamentos e Preferências.
  - Design responsivo para dispositivos móveis.

---

### ✂️ Painel do Barbeiro (Admin)


- **Acesso restrito**
  - Apenas usuários com role `barber` conseguem acessar o painel `/barber`.

- **Gestão de Clientes**
  - Listagem de todos os clientes registrados.
  - Edição e exclusão de dados de clientes existentes.

- **Gestão de Barbeiros**
  - Criação de novos barbeiros (admin).
  - Edição e exclusão de barbeiros existentes.
  - Prevenção contra auto-exclusão de conta ativa.

- **CRUD completo**
  - Todas as ações (criar, editar, excluir) são persistidas localmente usando `localStorage`.


---

## 🧪 Tecnologias Utilizadas

- **Angular 17**
- **RxJS**
- **SCSS** (com variáveis globais e responsividade)
- **FontAwesome** para ícones
- **LocalStorage** para persistência de dados
- **Arquitetura Modular e Componentizada**
- **JSON Server** (opcional para persistência externa em testes locais)

# 💈 Galeria

![Screenshot 2025-05-18 125709](https://github.com/user-attachments/assets/47a868dd-1eed-408e-8473-1e4b96ba0cc8)
![Screenshot 2025-05-18 125722](https://github.com/user-attachments/assets/7293a994-b9c3-4691-ac89-c3ad8d625969)
![Screenshot 2025-05-18 125739](https://github.com/user-attachments/assets/6f052b4b-e860-4f89-936b-baf398ccac69)
![Screenshot 2025-05-18 125831](https://github.com/user-attachments/assets/b43889e6-3112-4dd4-afad-a7eb7ae21319)
![Screenshot 2025-05-18 125848](https://github.com/user-attachments/assets/8acd0495-aa4d-4c96-ab79-34f95a2a4dfd)

![Screenshot 2025-05-18 125857](https://github.com/user-attachments/assets/bd106cda-a3d7-4910-b67e-e76ba90923ff)
![Screenshot 2025-05-18 125935](https://github.com/user-attachments/assets/4ed8d96a-0744-4af7-8e8d-913bbfd2c16d)
![Screenshot 2025-05-18 125949](https://github.com/user-attachments/assets/c253dd5a-57d8-489b-ad96-62238481f3c6)
![Screenshot 2025-05-18 125915](https://github.com/user-attachments/assets/e8352cbb-8454-4e18-89dd-52ebbf6aae26)

