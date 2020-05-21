# Funcionalidades Macros

  ## Recuperação de senha

  **RF** - Requisitos Funcionais

  - O usuário deve poder recuperar sua senha informando seu e-mail;
  - O usuário deve receber um e-mail com instruções de recuperação de senha;
  - O usuário deve poder resetar sua senha;

  **RNF** - Requisitos Não Funcionais

  - Utilizar Mailtrap para testar o envio de e-mail em ambiente de desenvolvimento;
  - Utilizar o Amazon SES para envio de e-mail em produção;
  - O envio de e-mails deve acontecer em segundo plano (background job);

  **RN** - Regras de Negócios

  - O link enviado por e-mail para resetar a senha, deve expirar em 2h;
  - O usuário precisa confirmar a nova senha ao resetar a senha do usuário;

  ## Atualização do perfil

  **RF**

  - O usuário deve poder atualizar seu avatar, nome, e-mail e senha;

  **RN**

  - O usuário não pode alterar seu e-mail para um e-mail já utlizado;
  - Para atualizar sua senha, o usuário deve informar a senha antiga;
  - Para atualizar sua senha. o usuário orecisa confirmar a nova senha;

  ## Painel de Prestador

  **RF**

  - O usuário deve poder listar seus agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que hover um novo agendamento;
  - O prestador deve poder visualizar as norificações não lidas;


  **RNF**

  - A listagem de agendamentos do dia deve ser armazenado em cache;
  - As notificações de prestador devem ser armazenadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo real utilizando Socket.IO

  **RN**

  - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

  ## Agendamento de Serviços

  **RF**

  - O usuário deve poder listar todos os prestadores de serviços cadastrados;
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
  - O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
  - O usuário deve realizar um novo agendamento com um prestador;

  **RNF**

  - A listagem de prestadores deve ser armazenado em cache;

  **RN**

  - Cada agendamento deve durar 1 hora exatamente;
  - Os agendamentos  devem estar disponíveis entre 8h e 18h (Primeiro as 8h, último as 17h);
  - O usuário não pode agendar em um horário já ocupado;
  - O usuário não pode agendar em um horário que já passou;
  - O usuario não pode agendar serviços consigo mesmo;
