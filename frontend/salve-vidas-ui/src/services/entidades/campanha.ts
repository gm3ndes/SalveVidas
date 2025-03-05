export interface Campanha {
    id_campanha: number;
    id_instituicao: number;
    id_nome: string;
    descricao: string;
    data_inicio: Date;
    data_fim: Date;
}

export interface CampanhaComInstituicao {
    id_campanha: number;
    id_nome: string;
    descricao: string;
    id_instituicao: number;
    nome_instituicao: string;
    data_inicio: Date;
    data_fim: Date;
}