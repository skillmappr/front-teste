// const neo4j = require('neo4j-driver');

// const uri = 'neo4j+s://3d32b423.databases.neo4j.io'; // Substitua pelo URL do seu servidor Neo4j
// const user = 'neo4j'; // Substitua pelo seu nome de usuário
// const password = 'OWJn1NapdsRNvjT79PM56XYA6FLKqRnRJyO-jD6BCSo'; // Substitua pela sua senha

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


// const session = driver.session();

// session
//   .run('MATCH (n) RETURN n LIMIT 5')
//   .then(result => {
//     result.records.forEach(record => {
//       console.log(record.get(0).properties);
//     })
//   })
//   .catch(error => {
//     console.error('Erro ao executar a consulta:', error);
//   })
//   .finally(() => {
//     session.close();
//     driver.close();
//   });

let neoViz;

function draw() {
  const config = {
    containerId: "viz",
    neo4j: {
      serverUrl: "neo4j://3d32b423.databases.neo4j.io",
      serverUser: "neo4j",
      serverPassword: "OWJn1NapdsRNvjT79PM56XYA6FLKqRnRJyO-jD6BCSo",
      driverConfig: {
        encrypted: "ENCRYPTION_ON",
        trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES"
      }
    },
    labels: {
      BNCC_AreaDeConhecimento: {
        label: "nome",
      },
      BNCC_CompetenciaEspecifica: {
        label: "tipo",
      },
      BNCC_CompetenciaGeral: {
        label: "tipo",
      },
      BNCC_Componente: {
        label: "nome",
      },
      BNCC_Habilidade: {
        label: "tipo",
      },
      BNCC_HabilidadeDeComponente: {
        label: "tipo",
      },
      BNCC_UnidadeDeEstudo: {
        label: "nome",
      },
      SBC_CompetenciaDerivada: {
        label: "codigo",
      },
      SBC_CompetenciaEspecificaEgresso: {
        label: "tipo",
      },
      SBC_CompetenciaGeralEgresso: {
        label: "tipo",
      },
      SBC_Conteudo: {
        label: "nome",
      },
      SBC_Eixo: {
        label: "tipo",
      }
    },
    relationships: {
    },

    initialCypher:
     // "MATCH (n)-[r]-(m) RETURN n, r, m"
     "MATCH (n:BNCC_UnidadeDeEstudo)-[r1:POSSUI]->(e:BNCC_Habilidade) RETURN n AS node, r1 AS relationship, e AS target UNION MATCH (n:BNCC_UnidadeDeEstudo)<-[r2:PERTENCE]-(e:BNCC_Habilidade) RETURN n AS node, r2 AS relationship, e AS target"
    // "MATCH p = (:BNCC_AreaDeConhecimento)-[:PERTENCE]-> () RETURN p;"

    //MATCH (a:SBC_CompetenciaGeralEgresso) RETURN a as Node, "CompetenciaGeralEgresso" as Type UNION MATCH (b:SBC_Conteudo) RETURN b as Node, "Conteudo" as Type UNION MATCH (c:SBC_Eixo) RETURN c as Node, "Eixo" as Type UNION MATCH (d:SBC_CompetenciaEspecificaEgresso) RETURN d as Node, "CompetenciaEspecificaEgresso" as Type UNION MATCH (e:SBC_CompetenciaDerivada) RETURN e as Node, "CompetenciaDerivada" as Type;

  };

  neoViz = new NeoVis.default(config);
  neoViz.render();
}