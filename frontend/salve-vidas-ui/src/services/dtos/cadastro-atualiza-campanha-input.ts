export interface CadastroAtualizaCampanhaInput {
    id_campanha?:  number;
    id_instituicao?: number;
    nome: string;
    descricao: string;
    data_inicio: Date;
    data_fim: Date
}