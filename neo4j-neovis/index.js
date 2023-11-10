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
        label: "codigo",
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
        label: "tipo",
      },
      SBC_Eixo: {
        label: "tipo",
        tipo: "tipo",
        descricao: "competenciaGeral",
        nome: "nome",
      }
    },
    relationships: {
    },

    initialCypher:
      // "MATCH (n)-[r]-(m) RETURN n, r, m"
      //  "MATCH (n:BNCC_UnidadeDeEstudo)-[r1:POSSUI]->(e:BNCC_Habilidade) RETURN n AS node, r1 AS relationship, e AS target UNION MATCH (n:BNCC_UnidadeDeEstudo)<-[r2:PERTENCE]-(e:BNCC_Habilidade) RETURN n AS node, r2 AS relationship, e AS target"
      // "MATCH p = (:BNCC_AreaDeConhecimento)-[:PERTENCE]-> () RETURN p;"
      "MATCH (eixo:SBC_Eixo)-[relacionamento]->(SBC_Conteudo) WHERE eixo.nome = 'Inovação e Empreendedorismo' RETURN eixo, relacionamento, SBC_Conteudo;"
    //MATCH (a:SBC_CompetenciaGeralEgresso) RETURN a as Node, "CompetenciaGeralEgresso" as Type UNION MATCH (b:SBC_Conteudo) RETURN b as Node, "Conteudo" as Type UNION MATCH (c:SBC_Eixo) RETURN c as Node, "Eixo" as Type UNION MATCH (d:SBC_CompetenciaEspecificaEgresso) RETURN d as Node, "CompetenciaEspecificaEgresso" as Type UNION MATCH (e:SBC_CompetenciaDerivada) RETURN e as Node, "CompetenciaDerivada" as Type;

  };

  neoViz = new NeoVis.default(config);
  neoViz.render();

  document.getElementById('viz').addEventListener('click', function (event) {
    showLeftPanel();
  });

  document.getElementById('closePanel').addEventListener('click', function (event) {
    hideLeftPanel();
  });

  function showLeftPanel(nodeData) {
    const leftPanel = document.getElementById('left-panel');
    leftPanel.style.display = 'block';
  }

  function hideLeftPanel() {
    const leftPanel = document.getElementById('left-panel');
    leftPanel.style.display = 'none';
  }
}