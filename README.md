## Backend : Michael, Guilherme e Felipe
## Frontend: Samuel e Alan

## Frontend em ANGULAR
- Versão do angular CLI: 15.2.11

## Backend em Typescript com express
### Integração com banco de dados
- Os dados para conexão do banco estão definidos no arquivo “enviroment.ts“;
- Com esses dados, o server.ts inicia a conexão com o banco de dados e as APIs que o frontend vai consumir.

## Banco de dados em Postgres, com o conteinêr feito no Docker

## DBeaver utilizado para modificar o banco de dados

As informações utilizadas no docker para utilização do PostGres, caso queira reutilizar.

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    Nome VARCHAR(255),
    Sobrenome VARCHAR(255),
    email VARCHAR(255),
    endereco VARCHAR(255),
    Tipo_Sanguinio VARCHAR(50),
    Telefone VARCHAR(20),
    Senha VARCHAR(20)
);

-- Table: Instituicoes
CREATE TABLE Instituicoes (
    id_Instituicao SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    Endereco VARCHAR(255),
    Telefone VARCHAR(20),
    id_usuario INTEGER,
    foreign key (id_usuario) references Usuarios(id)
);

-- Table: Doacoes
CREATE TABLE Doacoes (
    id_doacao SERIAL PRIMARY KEY,
    id_usuario INTEGER,
    id_instituicao INTEGER,
    data_doacao DATE,
    Quantidade DECIMAL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_instituicao) REFERENCES Instituicoes(id_Instituicao)
);

-- Table: Campanhas
CREATE TABLE Campanhas (
    id_campanha SERIAL PRIMARY KEY,
    id_instituicao INTEGER,
    id_Nome VARCHAR(255),
    Descricao TEXT,
    Data_inicio DATE,
    Data_Fim DATE,
    FOREIGN KEY (id_instituicao) REFERENCES Instituicoes(id_Instituicao)
)
