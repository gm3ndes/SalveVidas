export interface Usuario {
    id: number; // SERIAL PRIMARY KEY
    nome: string;
    sobrenome: string;
    email: string;
    endereco: string;
    tipo_sanguinio: string;
    telefone: string;
}