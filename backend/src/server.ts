import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Pool, QueryResult } from 'pg';
import { environment } from './env/environment';
import { CadastroUsuarioInput } from './dtos/cadastro-usuario-input';
import { LoginInput } from './dtos/login-input';
import { CadastroAtualizaCampanhaInput } from './dtos/cadastro-atualiza-campanha-input';

// Configuração base do express
const app = express();
const port = process.env.PORT || 5000;

// Conexão com postgres
const pool = new Pool({
    host: environment.DB_HOST,
    port: environment.DB_PORT,
    user: environment.DB_USER,
    password: environment.DB_PASSWORD,
    database: environment.DB_NAME,
});

// Necessário para evitar problemas de comunicação entre o front e o backend
app.use(cors());

app.use(bodyParser.json());

// METODOS DE LISTAGEM:

app.get('/api/listar-usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

app.get('/api/listar-instituicoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM instituicoes');
        res.json(result.rows);
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

app.get('/api/listar-doacoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM doacoes');
        res.json(result.rows);
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

app.get('/api/listar-campanhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM campanhas');
        res.json(result.rows);
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

// METODOS DE LISTAGEM PERSONALIZADOS
app.get('/api/listar-doacoes-detalhado', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                D.id_doacao,
                D.data_doacao,
                D.Quantidade,
                U.Nome AS nome_usuario,
                U.Sobrenome AS sobrenome_usuario,
                U.email AS email_usuario,
                I.nome AS nome_instituicao,
                I.Endereco AS endereco_instituicao,
                I.Telefone AS telefone_instituicao
            FROM
                Doacoes AS D
            JOIN
                Usuarios AS U ON D.id_usuario = U.id
            JOIN
                Instituicoes AS I ON D.id_instituicao = I.id_Instituicao;
            `);
        res.json(result.rows);
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

app.get('/api/listar-campanhas-com-instituicao', async (req, res) => {
    try {
        const result = await pool.query(`
            select 
                c.id_campanha,
                c.id_nome,
                c.descricao,
                i.id_instituicao,
                i.nome as nome_instituicao,
                c.data_inicio,
                c.data_fim 
            from
                campanhas as c
            join
                instituicoes as i on i.id_instituicao = c.id_instituicao 
            `);
        res.json(result.rows);
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});


// METODOS DE POST
app.post('/api/cadastrar-novo-usuario', async (req, res) => {
    try {
        const input = req.body as CadastroUsuarioInput

        if (!input.email || !input.senha) {
            res.status(400).json({ error: 'Faltou campos a serem preenchidos' });
            return;
        }

        const result = await pool.query(`
            INSERT INTO USUARIOS (nome, sobrenome, email, tipo_sanguinio, senha)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *    
        `,
            [input.nome, input.sobrenome, input.email, input.tipoSanguinio, input.senha]);

        res.status(201).json({
            message: 'Cadastro feito com sucesso',
            cadastro: result.rows[0],
        });
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

app.post('/api/login-usuario', async (req, res) => {
    try {
        const input = req.body as LoginInput

        if (!input.login || !input.senha) {
            res.status(400).json({ error: 'Faltou campos a serem preenchidos' });
            return;
        }

        const result = await pool.query(`
            SELECT * FROM USUARIOS WHERE email = ($1) and senha = ($2)   
        `,
            [input.login, input.senha]);

        const relacaoInstituicao = result && result.rows[0] ? await pool.query(
            `
            SELECT * FROM INSTITUICOES WHERE id_usuario = ($1)
            `,
            [result.rows[0].id]
        ) : null;

        if (result && result.rows[0]) {
            res.status(201).json({
                message: 'Login efetuado',
                cadastro: result.rows[0],
                relacaoInstituicao: relacaoInstituicao?.rows[0]
            });
        } else {
            res.status(400).json({
                message: 'Usuario nao encontrado',
                cadastro: '',
            });
        }

    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

app.post('/api/cadastra-atualiza-campanha', async (req, res) => {
    try {
        const input = req.body as CadastroAtualizaCampanhaInput
        let mensagemTipoExecucao = ''

        if (!input.descricao || !input.data_inicio || !input.data_fim  ) {
            res.status(400).json({ error: 'Faltou descricao ou data inicio ou data fim' });
            return;
        }

        let result: QueryResult<any>;
        if(input.id_campanha) {
            result = await pool.query(
                `
                update campanhas set 
                id_nome = ($1), descricao = ($2), data_inicio= ($3), data_fim= ($4)
                where id_campanha = ($5)
                `,
                [input.nome, input.descricao, input.data_inicio, input.data_fim, input.id_campanha]
            )
            mensagemTipoExecucao = "Atualizado"
        } else {
            result = await pool.query(
                `
                insert into campanhas (id_instituicao, id_nome, descricao, data_inicio, data_fim) values 
                ($1, $2, $3, $4, $5)
                `,
                [input.id_instituicao, input.nome, input.descricao, input.data_inicio, input.data_fim]
            )
            mensagemTipoExecucao = "Cadastro"
        }
        
        res.status(201).json({
            message: `${mensagemTipoExecucao} com sucesso.`,
            cadastro: result.rows[0],
        });
    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});

//METODOS DE DELETE
app.delete('/api/apagar-campanha/:id', async (req, res) => {
    try {
        const input = req.params.id;

        if (!input) {
            res.status(400).json({ error: 'Favor informar um item valido' });
            return;
        }

        const result = await pool.query(`
            DELETE FROM CAMPANHAS WHERE id_campanha=($1) RETURNING *
        `,
            [input]);

        if (result && result.rows[0]) {
            res.status(201).json({
                message: 'Campanha excluida',
                cadastro: result.rows[0]
            });
        } else {
            res.status(400).json({
                message: 'Deu alguma zebra',
                cadastro: '',
            });
        }

    } catch (err) {
        console.error("errp:", err);
        res.status(500).send('Server error');
    }
});


// INICIALIZA A API
app.listen(port, () => {
    console.log(`Backend rodando em: http://localhost:${port}`);
    console.log("pool",pool)
});
