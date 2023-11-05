const express = require('express');
const neo4j = require('neo4j-driver');
const app = express();
const port = 3000;

const NEO4J_URI = 'neo4j+s://3d32b423.databases.neo4j.io';
const NEO4J_USERNAME = 'neo4j';
const NEO4J_PASSWORD = 'OWJn1NapdsRNvjT79PM56XYA6FLKqRnRJyO-jD6BCSo';

// Criar uma instância do driver
const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD));

// Permitir o acesso a arquivos estáticos na pasta 'public'
app.use(express.static('public'));

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Rota para obter os dados do Neo4j e transformar para o formato do Arbor.js
app.get('/data', async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (n:SBC_Eixo) RETURN n;');
        const nodes = result.records.map(record => {
            const n = record.get('n').properties;
            console.log(n)
            //const m = record.get('m').properties;
            return {
                nodes: {
                    [n.id]: { label: n.nome },
                    //[m.id]: { label: m.nome }
                },
                edges: {
                    [n.id]: {
                        //[m.id]: {}
                    }
                }
            };
        });


        const data = nodes.reduce((acc, node, index) => {
            const angle = (2 * Math.PI * index) / nodes.length; // Calcula o ângulo para o posicionamento em círculo
            const radius = 200; // Raio do círculo
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            acc.nodes[node.id] = {
                label: node.nome,
                x: x,
                y: y
            };

            acc.nodes = { ...acc.nodes, ...node.nodes };
            acc.edges = { ...acc.edges, ...node.edges };

            return acc;
        }, { nodes: {}, edges: {} });


        /*
        const data = nodes.reduce((acc, node) => {
            acc.nodes = { ...acc.nodes, ...node.nodes };
            acc.edges = { ...acc.edges, ...node.edges };
            return acc;
        }, { nodes: {}, edges: {} });
        */

        res.json(data);

    } catch (error) {
        console.error('Erro ao acessar o Neo4j:', error.message);
        res.status(500).send('Erro ao acessar o Neo4j: ' + error.message);
    } finally {
        await session.close();
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});