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

## 📂 Estrutura Geral do Projeto

O projeto CatBioSearch é dividido em **quatro grandes módulos principais**: `back-end`, `back-end-fasta`, `ia` e `front-end`.  
Cada módulo possui responsabilidades específicas dentro do sistema, garantindo modularidade e organização.

---

### 🖥️ Back-end

Responsável por toda a **lógica principal da aplicação**, manipulação de banco de dados, autenticação de usuários, gerenciamento de relatórios e clínicas veterinárias.
```
back-end/
│── db/ # Configurações de manipulação do banco de dados
│ └── ... # Scripts de criação e inicialização automática do banco
│
│── models/ # Definições das tabelas do banco de dados (Sequelize)
│ └── ... # Arquivos de modelos representando as entidades do sistema
│
│── routes/ # Definição de todas as rotas da API
│ └── ... # Endpoints organizados por contexto (usuários, relatórios, clínicas)
│
│── index.js # Arquivo principal do back-end
# - Configurações de rotas padrão
# - Requisição das funções
# - Inicialização do servidor

```
---

### 🧬 Back-end FASTA

Módulo responsável por processar **arquivos FASTA** enviados pelas clínicas veterinárias.  
Realiza a leitura, extração de sequências e análise genética, identificando mutações relacionadas ao **gene PKD1**.


```
back-end-fasta/
│── services.py # Processa arquivos FASTA
│ # - Identifica o gene PKD1
│ # - Realiza análises de alinhamento com BLAST local
│
│── utils.py # Manipulação de arquivos FASTA
│ # - Leitura de arquivos enviados
│ # - Salvamento em local temporário
│ # - Extração de sequências genéticas para processamento

```


---

### 🤖 Inteligência Artificial (IA)

Módulo dedicado à **classificação de mutações genéticas** utilizando **modelos de Machine Learning**.  
Baseia-se principalmente nas sequências do **exon 29**.

```
ia/
│── app.py # API responsável por receber sequências do exon 29
│ # - Classificação utilizando modelo de ML treinado
│
│── train-model/ # Treinamento e salvamento do modelo de ML
│ └── ... # Scripts de preparação, treino e persistência do modelo

```

---

### 🎨 Front-end

Responsável pela **interface com o usuário**.  
Aqui será desenvolvida a tela atrativa, de fácil acesso e com recursos de acessibilidade.


