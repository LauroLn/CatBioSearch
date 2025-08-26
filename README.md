# 🧬 CatBioSearch - Documentação Geral

CatBioSearch é um sistema voltado para clínicas veterinárias que realizam **sequenciamento genético em gatos da raça Persa**.  
O objetivo principal do projeto é **auxiliar na geração de relatórios que identificam doenças genéticas**, como a **policistose renal (PKD)**, além de fornecer ferramentas para análise e comparação de resultados.

O sistema foi projetado para ser **modular e escalável**, utilizando diferentes camadas que se integram de forma transparente para entregar valor tanto ao usuário final quanto às clínicas veterinárias.

---

## 📌 Visão Geral do Projeto

O projeto foi desenvolvido utilizando **quatro partes principais**:

- **Front-end**:  
  - Exposição de uma **tela atrativa e facilitadora**, garantindo melhor experiência de uso.  
  - Disponibilização de uma **tela de fácil acesso a recursos e acessibilidade**.  

- **Back-end**:  
  - Responsável pelo gerenciamento de usuários, clínicas e relatórios.  
  - Sistema de autenticação seguro.  
  - Exposição de métricas e estatísticas do uso do sistema.  

- **Back-end Fasta**:  
  - Responsável pela **análise de arquivos FASTA enviados pelas clínicas veterinárias**, identificando possíveis mutações genéticas nos animais.  

- **Inteligência Artificial (IA)**:  
  - **Comparação automática com genes de gatos saudáveis**, fornecendo insights clínicos e auxiliando na **geração de relatórios mais precisos**.  

---

## ⚙️ Requisitos do Sistema

O projeto roda totalmente em **containers Docker**, garantindo portabilidade e facilidade de execução.  
Portanto, é necessário apenas ter o **Docker** e o **Docker Compose** instalados.

> 💡 Para ambientes de desenvolvimento mais avançados, podem ser necessários:
> - **Node.js** (para o front-end e back-end principal)  
> - **Python** (para o back-end FASTA e módulos de IA)  

Contudo, ao utilizar Docker, essas dependências já estarão inclusas nos containers.

---

## 🚀 Instruções de Instalação e Execução

> 🔧 Esta seção será preenchida posteriormente.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end**  
  - React.js ou Next.js (UI moderna e responsiva)

- **Back-end**  
  - Node.js  
  - Express.js  
  - Sequelize (ORM)  
  - Banco de dados SQL (PostgreSQL/MySQL/MariaDB)

- **Back-end Fasta**  
  - Python  
  - Bibliotecas para análise genética e manipulação de arquivos FASTA  

- **Inteligência Artificial (IA)**  
  - Python  
  - Modelos de Machine Learning para análise comparativa de genes  

- **Infraestrutura**  
  - Docker & Docker Compose  

---
