
export interface Doacao {
    id_doacao: number; // SERIAL PRIMARY KEY
    id_usuario: number; // INTEGER, FOREIGN KEY REFERENCES Usuarios(id)
    id_instituicao: number; // INTEGER, FOREIGN KEY REFERENCES Instituicoes(id_Instituicao)
    data_doacao: Date;
    quantidade: number;
}

export interface DoacaoDetalhadaComUsuarioEInstituicao {
    id_doacao: number;
    data_doacao: Date;
    quantidade: number;
    nome_usuario: string;
    sobrenome_usuario: string;
    email_usuario: string;
    nome_instituicao: string;
    endereco_instituicao: string;
    telefone_instituicao: string;
}


