let neoViz;

function draw(eixo) {
  EnableLoading()
  new Promise((res, rej) => {
    const config = {
      containerId: 'viz',
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
          label: "tipo",
        },
        BNCC_CompetenciaEspecifica: {
          label: "tipo",
        },
        BNCC_CompetenciaGeral: {
          label: "tipo",
        },
        BNCC_Componente: {
          label: "tipo",
        },
        BNCC_Habilidade: {
          label: "tipo",
        },
        BNCC_HabilidadeDeComponente: {
          label: "tipo",
        },
        BNCC_UnidadeDeEstudo: {
          label: "tipo",
        },
        SBC_CompetenciaDerivada: {
          label: "tipo",
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
        }
      },
      relationships: {
        INTERACTS: {
          value: "weight"
        }
      },

      initialCypher:
        // "MATCH (n)-[r]-(m) RETURN n, r, m"
        //  "MATCH (n:BNCC_UnidadeDeEstudo)-[r1:POSSUI]->(e:BNCC_Habilidade) RETURN n AS node, r1 AS relationship, e AS target UNION MATCH (n:BNCC_UnidadeDeEstudo)<-[r2:PERTENCE]-(e:BNCC_Habilidade) RETURN n AS node, r2 AS relationship, e AS target"
        // "MATCH p = (:BNCC_AreaDeConhecimento)-[:PERTENCE]-> () RETURN p;"
        "MATCH (eixo:SBC_Eixo)-[relacionamento]->(SBC_Conteudo) WHERE eixo.nome = '" + eixo + "' RETURN eixo, relacionamento, SBC_Conteudo;"
      //MATCH (a:SBC_CompetenciaGeralEgresso) RETURN a as Node, "CompetenciaGeralEgresso" as Type UNION MATCH (b:SBC_Conteudo) RETURN b as Node, "Conteudo" as Type UNION MATCH (c:SBC_Eixo) RETURN c as Node, "Eixo" as Type UNION MATCH (d:SBC_CompetenciaEspecificaEgresso) RETURN d as Node, "CompetenciaEspecificaEgresso" as Type UNION MATCH (e:SBC_CompetenciaDerivada) RETURN e as Node, "CompetenciaDerivada" as Type;

    };

    neoViz = new NeoVis.default(config);
    neoViz.render();
   
    // Register the clickNode event
    neoViz.registerOnEvent('clickNode', function (nodeId) {
      console.log("Node clicked: " + nodeId.node.raw.properties.nome);

      var nodeData = buildNode(nodeId);

      showLeftPanel(nodeData);
    });
    res(null)
  }).then(() => {
    setTimeout(() => {
      EnableLoading()
       neoViz.network.fit()
    }, 2000)
  })

}

function EnableLoading() {
  var vizElement = document.getElementById("all");
  if (vizElement.style.display == "none")
    vizElement.style.display = "block"
  else
    vizElement.style.display = "none"


  var loadingElement = document.getElementById("loading");
  if (loadingElement.style.display == "none" || !loadingElement.style.display)
    loadingElement.style.display = "block"
  else
    loadingElement.style.display = "none"
}

function hideDivs(divs) {
  const div = document.getElementById(divs);
  div.style.display = 'none';
}

function showDivs(divs) {
  const div = document.getElementById(divs);
  div.style.display = 'block';
}

function showLeftPanel(nodeData) {
  const leftPanel = document.getElementById('left-panel');
  const tipo = document.getElementById('tipo');
  const nome = document.getElementById('nome');
  const descricao = document.getElementById('descricao');

  var innerHTMLTipo = '';

  if (nodeData.tipo != '')
    innerHTMLTipo += '<label class="tipo" class="fields_panel">Tipo: ' + nodeData.tipo + '</label>';

  tipo.innerHTML = innerHTMLTipo;

  var innerHTMLDescricao = '';

  if (nodeData.descricao != '')
    innerHTMLDescricao += '<label class="descricao" class="fields_panel">Descrição: ' + nodeData.descricao + '</label>';

  descricao.innerHTML = innerHTMLDescricao;

  var innerHTMLNome = '';

  if (nodeData.nome != '')
    innerHTMLNome += '<label class="nome" class="fields_panel">Nome: ' + nodeData.nome + '</label>';

  nome.innerHTML = innerHTMLNome;

  leftPanel.style.display = 'block';
}

function hideLeftPanel() {
  const leftPanel = document.getElementById('left-panel');
  leftPanel.style.display = 'none';
}

function buildNode(node) {
  var obj = {};

  switch (node.node.label) {
    case 'SBC_Eixo':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.nome;
      obj.descricao = node.node.raw.properties.competenciaGeral;
      break;
    case 'SBC_Conteudo':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.nome;
      obj.descricao = '';
      break;
    case 'SBC_CompetenciaGeralEgresso':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = '';
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'SBC_CompetenciaEspecificaEgresso':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = '';
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'SBC_CompetenciaDerivada':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.codigo;
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'BNCC_UnidadeDeEstudo':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.nome;
      obj.descricao = '';
      break;
    case 'BNCC_HabilidadeDeComponente':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.codigo;
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'BNCC_Habilidade':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.codigo;
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'BNCC_Componente':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.nome;
      obj.descricao = '';
      break;
    case 'BNCC_CompetenciaGeral':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = '';
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'BNCC_CompetenciaEspecifica':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = '';
      obj.descricao = node.node.raw.properties.descricao;
      break;
    case 'BNCC_AreaDeConhecimento':
      obj.tipo = node.node.raw.properties.tipo;
      obj.nome = node.node.raw.properties.codigo;
      obj.descricao = '';
      break;
  }

  return obj
}

function addListeners() {
  document.getElementById('SBC_Eixo_Inovacao').addEventListener('click', function (event) {
    draw('Inovação e Empreendedorismo')
  });

  document.getElementById('SBC_Eixo_Gerenciamento').addEventListener('click', function (event) {
    draw('Gerenciamento de Sistemas Computacionais')
  });

  document.getElementById('SBC_Eixo_Sistemas').addEventListener('click', function (event) {
    draw('Desenvolvimento de Sistemas Computacionais')
  });

  document.getElementById('SBC_Eixo_Fundamentos').addEventListener('click', function (event) {
    draw('Fudamentos de Sistemas de Computação')
  });

  document.getElementById('SBC_Eixo_Pessoal').addEventListener('click', function (event) {
    draw('Desenvolvimento Pessoal e Profissional')
  });

  document.getElementById('closePanel').addEventListener('click', function (event) {
    hideLeftPanel();
  });
}