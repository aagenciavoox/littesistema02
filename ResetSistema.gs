// ═══════════════════════════════════════════════════════════════════════════════
//                    RESET_SISTEMA.GS - RESET DESTRUTIVO SEGURO
//                    Sistema Litte v3.5
//
//                    ARQUIVO GERADO POR ANALISE REVERSA DO CODIGO EXISTENTE
//                    NAO ALTERA NENHUM ARQUIVO DO SISTEMA ORIGINAL
//
//                    FONTE DE VERDADE: Code.gs e Html (funcoes de leitura/escrita)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 *                         METODOLOGIA DA ANALISE REVERSA
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Esta estrutura foi inferida EXCLUSIVAMENTE a partir do codigo existente:
 *
 * 1. ASSESSORADOS (24 colunas)
 *    - Fonte: getAllAssessorados() le 24 colunas
 *    - Fonte: criarAssessorado() escreve 24 colunas
 *    - Fonte: atualizarAssessorado() atualiza ate coluna 24
 *
 * 2. ANDAMENTOS (22 colunas)
 *    - Fonte: getAllAndamentos() le 22 colunas
 *    - Fonte: criarAndamentoBasico() escreve 22 colunas
 *
 * 3. CAMPANHAS_ATIVAS (8 colunas)
 *    - Fonte: setupCampanhasAtivasSheet() define 8 headers
 *
 * 4. CHECKLIST_COMPLETE (57 colunas)
 *    - Fonte: getChecklistCompleto() le 57 colunas (row[0] a row[56])
 *    - Fonte: criarChecklistCompleto() cria array de 57 posicoes
 *
 * 5. FINANCEIRO_COMPLETE (10 colunas)
 *    - Fonte: getAllFinanceirosCompletos() le 10 colunas
 *    - Fonte: criarFinanceiroCompleto() escreve valores correspondentes
 *
 * 6. TEMPLATES (6 colunas)
 *    - Fonte: setupTemplatesSheet() define 6 headers
 *
 * 7. HISTORICO (8 colunas)
 *    - Fonte: setupHistoricoSheet() define 8 headers
 *    - Fonte: registrarHistorico() escreve 8 valores
 *
 * 8. NOTAS (9 colunas)
 *    - Fonte: getAllNotas() le 9 colunas
 *    - Fonte: criarNota() escreve 9 valores
 *
 * 9. NOTIFICACOES (11 colunas)
 *    - Fonte: setupNotificacoesSheet() define 11 headers
 *    - Fonte: criarNotificacao() escreve correspondente
 *
 * 10. CONFIG (2 colunas)
 *     - Fonte: setupConfigSheet() define 2 headers
 *
 * ABAS AUXILIARES (mencionadas em setupSheets mas sem estrutura definida):
 * - Checklist_Execucao (usada para leitura de prazos - 7 colunas inferidas)
 * - Financeiro_Master (sincronizacao - sem estrutura clara)
 * - Divisao_Socios (mencionada apenas)
 * - Controle_Repasses (sincronizacao - sem estrutura clara)
 * - FollowUps (mencionada apenas)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */


// ═══════════════════════════════════════════════════════════════════════════════
//                         FUNCAO PRINCIPAL DE RESET
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Reset completo do sistema por analise reversa.
 *
 * ATENCAO: Esta funcao APAGA todas as abas existentes e recria
 * apenas as que o sistema realmente utiliza, com dados de teste.
 *
 * EXECUCAO:
 * 1. Cria aba temporaria _TEMP_RESET (obrigatoria pelo Sheets)
 * 2. Apaga TODAS as outras abas
 * 3. Recria as abas conforme estrutura inferida do codigo
 * 4. Insere dados de teste coerentes
 * 5. Apaga _TEMP_RESET
 *
 * @returns {Object} {success, message, abasCriadas}
 */
function resetSistemaPorAnaliseReversa() {
  try {
    Logger.log('═══════════════════════════════════════════════════════════════');
    Logger.log('          RESET DO SISTEMA POR ANALISE REVERSA');
    Logger.log('          Sistema Litte v3.5');
    Logger.log('═══════════════════════════════════════════════════════════════');
    Logger.log('');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const TEMP_SHEET_NAME = '_TEMP_RESET';

    // ═══════════════════════════════════════════════════════════════
    // PASSO 1: CRIAR ABA TEMPORARIA
    // ═══════════════════════════════════════════════════════════════
    Logger.log('[1/5] Criando aba temporaria...');

    let tempSheet = ss.getSheetByName(TEMP_SHEET_NAME);
    if (!tempSheet) {
      tempSheet = ss.insertSheet(TEMP_SHEET_NAME);
    }
    Logger.log('   OK - Aba temporaria criada: ' + TEMP_SHEET_NAME);

    // ═══════════════════════════════════════════════════════════════
    // PASSO 2: APAGAR TODAS AS OUTRAS ABAS
    // ═══════════════════════════════════════════════════════════════
    Logger.log('');
    Logger.log('[2/5] Apagando abas existentes...');

    const todasAbas = ss.getSheets();
    let abasRemovidas = 0;

    for (let i = 0; i < todasAbas.length; i++) {
      const aba = todasAbas[i];
      if (aba.getName() !== TEMP_SHEET_NAME) {
        Logger.log('   Removendo: ' + aba.getName());
        ss.deleteSheet(aba);
        abasRemovidas++;
      }
    }

    Logger.log('   OK - ' + abasRemovidas + ' abas removidas');

    // ═══════════════════════════════════════════════════════════════
    // PASSO 3: CRIAR ABAS COM ESTRUTURA CORRETA
    // ═══════════════════════════════════════════════════════════════
    Logger.log('');
    Logger.log('[3/5] Criando abas com estrutura inferida...');

    // Lista de abas a criar (ordem conforme setupSheets)
    const abasParaCriar = [
      'Assessorados',
      'Andamentos',
      'Campanhas_Ativas',
      'Checklist_Complete',
      'Checklist_Execucao',
      'Financeiro_Complete',
      'Financeiro_Master',
      'Divisao_Socios',
      'Controle_Repasses',
      'Templates',
      'Historico',
      'Notas',
      'Notificacoes',
      'FollowUps',
      'Config'
    ];

    const abasCriadas = [];

    for (let i = 0; i < abasParaCriar.length; i++) {
      const nomeAba = abasParaCriar[i];
      const novaAba = ss.insertSheet(nomeAba);
      abasCriadas.push(nomeAba);
      Logger.log('   Criada: ' + nomeAba);
    }

    Logger.log('   OK - ' + abasCriadas.length + ' abas criadas');

    // ═══════════════════════════════════════════════════════════════
    // PASSO 4: CONFIGURAR HEADERS E DADOS DE TESTE
    // ═══════════════════════════════════════════════════════════════
    Logger.log('');
    Logger.log('[4/5] Configurando headers e dados de teste...');

    configurarAbaAssessorados(ss);
    configurarAbaAndamentos(ss);
    configurarAbaCampanhasAtivas(ss);
    configurarAbaChecklistComplete(ss);
    configurarAbaChecklistExecucao(ss);
    configurarAbaFinanceiroComplete(ss);
    configurarAbaFinanceiroMaster(ss);
    configurarAbaDivisaoSocios(ss);
    configurarAbaControleRepasses(ss);
    configurarAbaTemplates(ss);
    configurarAbaHistorico(ss);
    configurarAbaNotas(ss);
    configurarAbaNotificacoes(ss);
    configurarAbaFollowUps(ss);
    configurarAbaConfig(ss);

    Logger.log('   OK - Todas as abas configuradas');

    // ═══════════════════════════════════════════════════════════════
    // PASSO 5: REMOVER ABA TEMPORARIA
    // ═══════════════════════════════════════════════════════════════
    Logger.log('');
    Logger.log('[5/5] Removendo aba temporaria...');

    tempSheet = ss.getSheetByName(TEMP_SHEET_NAME);
    if (tempSheet) {
      ss.deleteSheet(tempSheet);
      Logger.log('   OK - Aba temporaria removida');
    }

    // ═══════════════════════════════════════════════════════════════
    // FINALIZACAO
    // ═══════════════════════════════════════════════════════════════
    SpreadsheetApp.flush();

    Logger.log('');
    Logger.log('═══════════════════════════════════════════════════════════════');
    Logger.log('          RESET CONCLUIDO COM SUCESSO!');
    Logger.log('          Abas criadas: ' + abasCriadas.length);
    Logger.log('═══════════════════════════════════════════════════════════════');

    return {
      success: true,
      message: 'Reset concluido! ' + abasCriadas.length + ' abas criadas.',
      abasCriadas: abasCriadas
    };

  } catch (e) {
    Logger.log('ERRO NO RESET: ' + e);
    Logger.log('Stack: ' + e.stack);
    return {
      success: false,
      message: 'Erro: ' + e.toString()
    };
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
//                         CONFIGURACAO DE CADA ABA
// ═══════════════════════════════════════════════════════════════════════════════


/**
 * ASSESSORADOS - 24 colunas
 * Fonte: getAllAssessorados() linhas 1200-1228 do Code.gs
 */
function configurarAbaAssessorados(ss) {
  const sheet = ss.getSheetByName('Assessorados');

  // Headers baseados em getAllAssessorados (24 colunas)
  const headers = [
    'ID',                    // 1 - row[0]
    'Nome',                  // 2 - row[1]
    'Usuario',               // 3 - row[2]
    'Email',                 // 4 - row[3]
    'Telefone',              // 5 - row[4]
    'Idade',                 // 6 - row[5]
    'Sapato',                // 7 - row[6]
    'Camiseta',              // 8 - row[7]
    'Calca',                 // 9 - row[8]
    'Endereco Nome',         // 10 - row[9]
    'Rua',                   // 11 - row[10]
    'Numero',                // 12 - row[11]
    'Complemento',           // 13 - row[12]
    'Bairro',                // 14 - row[13]
    'Cidade',                // 15 - row[14]
    'Estado',                // 16 - row[15]
    'CEP',                   // 17 - row[16]
    'Status',                // 18 - row[17]
    'Data Cadastro',         // 19 - row[18]
    'Observacoes',           // 20 - row[19]
    'URL Pasta Drive',       // 21 - row[20]
    'Link Planilha Espelho', // 22 - row[21]
    'Data Criacao',          // 23 - row[22]
    'Ultima Atualizacao'     // 24 - row[23]
  ];

  // Adicionar headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#284239')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste (3 assessorados)
  const hoje = new Date();
  const dadosTeste = [
    [
      'ASS001001', 'Maria Oliveira', '@maria.oli', 'maria@email.com', '11999998888',
      '28', '38', 'M', '40', 'Residencia', 'Rua das Flores', '123', 'Apto 45',
      'Jardim Paulista', 'Sao Paulo', 'SP', '01310-100', 'Ativo', hoje,
      'Influenciadora de lifestyle', '', '', hoje, hoje
    ],
    [
      'ASS002002', 'Carlos Santos', '@carlos.santos', 'carlos@email.com', '21988887777',
      '32', '42', 'G', '44', 'Casa', 'Av. Brasil', '500', '',
      'Centro', 'Rio de Janeiro', 'RJ', '20040-020', 'Ativo', hoje,
      'Youtuber de tecnologia', '', '', hoje, hoje
    ],
    [
      'ASS003003', 'Ana Paula Costa', '@ana.costa', 'ana@email.com', '31977776666',
      '25', '36', 'P', '38', 'Trabalho', 'Rua da Bahia', '1000', 'Sala 301',
      'Funcionarios', 'Belo Horizonte', 'MG', '30112-000', 'Ativo', hoje,
      'Criadora de conteudo de moda', '', '', hoje, hoje
    ]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Assessorados: 24 colunas, 3 registros de teste');
}


/**
 * ANDAMENTOS - 22 colunas
 * Fonte: getAllAndamentos() linhas 1879-1911 do Code.gs
 * Fonte: criarAndamentoBasico() linhas 1997-2020 do Code.gs
 */
function configurarAbaAndamentos(ss) {
  const sheet = ss.getSheetByName('Andamentos');

  // Headers baseados em getAllAndamentos (22 colunas)
  const headers = [
    'ID Campanha',           // 1 - row[0]
    'ID Assessorado',        // 2 - row[1]
    'Marca',                 // 3 - row[2]
    'Objeto Campanha',       // 4 - row[3]
    'Fase',                  // 5 - row[4]
    'Status Detalhado',      // 6 - row[5]
    'Remetente',             // 7 - row[6]
    'Responsavel Litte',     // 8 - row[7]
    'Valor Proposto',        // 9 - row[8]
    'Valor Fechado',         // 10 - row[9]
    'Data Criacao',          // 11 - row[10]
    'Link Pasta Campanha',   // 12 - row[11]
    'Ultimo Retorno',        // 13 - row[12]
    'Observacoes',           // 14 - row[13]
    'Descricao Escopo',      // 15 - row[14]
    'Concluida',             // 16 - row[15]
    'Data Conclusao',        // 17 - row[16]
    'Ultima Atualizacao',    // 18 - row[17]
    'Data Primeiro Contato', // 19 - row[18]
    'Proximo Follow-Up',     // 20 - row[19]
    'Ultima Interacao',      // 21 - row[20]
    'Ultima Mensagem'        // 22 - row[21]
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#284239')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();
  const amanha = new Date(hoje.getTime() + 24*60*60*1000);
  const semanaQueVem = new Date(hoje.getTime() + 7*24*60*60*1000);

  const dadosTeste = [
    [
      'CAM001001', 'ASS001001', 'Nike Brasil', 'Post Instagram Stories',
      'Fechada', 'Fechado', 'Marca', 'Anne', 8000, 8000,
      hoje, '', hoje, 'Campanha de lancamento', '3 stories + 1 reels',
      'NAO', '', hoje, hoje, amanha, hoje, 'Proposta aceita, aguardando contrato'
    ],
    [
      'CAM002002', 'ASS002002', 'Samsung', 'Review YouTube',
      'Negociacao', 'Em negociacao', 'Litte', 'Anne', 15000, 0,
      hoje, '', hoje, '', '',
      'NAO', '', hoje, hoje, semanaQueVem, hoje, 'Aguardando resposta sobre valores'
    ],
    [
      'CAM003003', 'ASS003003', 'Zara', 'Lookbook Verao',
      'Fechada', 'Fechado', 'Marca', 'Anne', 5000, 5000,
      hoje, '', hoje, 'Colecao verao 2025', '5 fotos + 2 reels',
      'NAO', '', hoje, hoje, '', hoje, 'Contrato assinado'
    ]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Andamentos: 22 colunas, 3 registros de teste');
}


/**
 * CAMPANHAS_ATIVAS - 8 colunas
 * Fonte: setupCampanhasAtivasSheet() linhas 391-394 do Code.gs
 */
function configurarAbaCampanhasAtivas(ss) {
  const sheet = ss.getSheetByName('Campanhas_Ativas');

  const headers = [
    'ID Campanha',
    'Influenciador',
    'Marca',
    'Valor Total',
    'Status Geral',
    'Proximo Prazo',
    'Responsavel',
    'Ultima Atualizacao'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste - campanhas ativas sincronizadas com Andamentos fechados
  const hoje = new Date();
  const semanaQueVem = new Date(hoje.getTime() + 7*24*60*60*1000);

  const dadosTeste = [
    ['CAM001001', 'Maria Oliveira', 'Nike Brasil', 8000, 'Em Producao', semanaQueVem, 'Anne', hoje],
    ['CAM003003', 'Ana Paula Costa', 'Zara', 5000, 'Aguardando Contrato', semanaQueVem, 'Anne', hoje]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Campanhas_Ativas: 8 colunas, 2 registros de teste');
}


/**
 * CHECKLIST_COMPLETE - 57 colunas
 * Fonte: getChecklistCompleto() linhas 3423-3527 do Code.gs
 * O codigo le row[0] ate row[56] = 57 colunas
 */
function configurarAbaChecklistComplete(ss) {
  const sheet = ss.getSheetByName('Checklist_Complete');

  // 57 headers baseados no mapeamento de getChecklistCompleto
  const headers = [
    // Identificacao (0-3)
    'ID Campanha', 'ID Assessorado', 'Nome Assessorado', 'Marca',
    // Contrato (4-9)
    'Precisa Contrato', 'Status Contrato', 'Data Prev Assinatura', 'Data Real Assinatura', 'Link Contrato', 'Obs Contrato',
    // Produto (10-17)
    'Precisa Produto', 'Nome Produto', 'Quantidade', 'Endereco Envio', 'Status Produto', 'Data Envio', 'Codigo Rastreio', 'Link Rastreamento',
    // Roteiro (18-26)
    'Precisa Roteiro', 'Tipo Roteiro', 'Num Versoes', 'Status Roteiro', 'Data Prev Roteiro', 'Data Real Roteiro', 'Data Aprov Roteiro', 'Link Pasta Roteiro', 'Feedback Cliente',
    // Conteudo (27-29)
    'Quantidade Conteudos', 'Conteudos JSON', 'Link Pasta Conteudo',
    // Postagem (30-36)
    'Status Postagem', 'Rede Social', 'Tipo Post', 'Data Prev Postagem', 'Horario Postagem', 'Data Real Postagem', 'Link Postagem',
    // Metricas (37-39)
    'Data Prev Coleta Metricas', 'Status Metricas', 'Link Pasta Metricas',
    // NF (40-47)
    'Status NF', 'Tipo NF', 'Numero NF', 'CNPJ', 'Data Emissao NF', 'Data Prev Pagamento', 'Valor NF', 'Link PDF NF',
    // Repasse (48-53)
    'Valor Total Campanha', 'Repasse 80%', 'Taxa Litte 20%', 'Status Repasse', 'Data Repasse', 'Comprovante Repasse',
    // Observacoes e Metadata (54-56)
    'Observacoes Campanha', 'Data Criacao', 'Ultima Atualizacao'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#284239')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste - campanha Nike
  const hoje = new Date();
  const semanaQueVem = new Date(hoje.getTime() + 7*24*60*60*1000);
  const daquiDuasSemanas = new Date(hoje.getTime() + 14*24*60*60*1000);

  const dadosTeste1 = [
    'CAM001001', 'ASS001001', 'Maria Oliveira', 'Nike Brasil',
    'SIM', 'ASSINADO', hoje, hoje, '', 'Contrato padrao',
    'SIM', 'Tenis Air Max', 1, 'Rua das Flores 123, Sao Paulo', 'ENVIADO', hoje, 'BR123456789', '',
    'SIM', 'Roteiro breve', 1, 'APROVADO', hoje, hoje, hoje, '', 'Aprovado sem alteracoes',
    3, '[]', '',
    'PENDENTE', 'Instagram', 'Stories + Reels', semanaQueVem, '18:00', '', '',
    daquiDuasSemanas, 'PENDENTE', '',
    'A EMITIR', '', '', '', '', semanaQueVem, 0, '',
    8000, 6400, 1600, 'AGUARDANDO NF', '', '',
    'Campanha de lancamento Air Max', hoje, hoje
  ];

  // Dados de teste - campanha Zara
  const dadosTeste2 = [
    'CAM003003', 'ASS003003', 'Ana Paula Costa', 'Zara',
    'SIM', 'PENDENTE', semanaQueVem, '', '', '',
    'NAO', '', '', '', '', '', '', '',
    'SIM', 'Brief criativo', 2, 'EM REVISAO', hoje, '', '', '', '',
    5, '[]', '',
    'PENDENTE', 'Instagram', 'Feed + Reels', daquiDuasSemanas, '12:00', '', '',
    daquiDuasSemanas, 'PENDENTE', '',
    'A EMITIR', '', '', '', '', daquiDuasSemanas, 0, '',
    5000, 4000, 1000, 'AGUARDANDO NF', '', '',
    'Lookbook verao 2025', hoje, hoje
  ];

  sheet.getRange(2, 1, 1, headers.length).setValues([dadosTeste1]);
  sheet.getRange(3, 1, 1, headers.length).setValues([dadosTeste2]);

  Logger.log('   - Checklist_Complete: 57 colunas, 2 registros de teste');
}


/**
 * CHECKLIST_EXECUCAO - 7 colunas (inferido de getProximosPrazosDoChecklistExecucao)
 * Fonte: getProximosPrazosDoChecklistExecucao() linhas 3155-3197 do Code.gs
 * O codigo le colunas 1-7: row[0] a row[6]
 */
function configurarAbaChecklistExecucao(ss) {
  const sheet = ss.getSheetByName('Checklist_Execucao');

  // Headers inferidos da funcao getProximosPrazosDoChecklistExecucao
  const headers = [
    'ID Campanha',     // row[0]
    'Etapa',           // row[1]
    'Data Prevista',   // row[2]
    'Data Real',       // row[3]
    'Status',          // row[4]
    'Responsavel',     // row[5] - inferido
    'Observacoes'      // row[6] - inferido
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#284239')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();
  const amanha = new Date(hoje.getTime() + 24*60*60*1000);
  const semanaQueVem = new Date(hoje.getTime() + 7*24*60*60*1000);

  const dadosTeste = [
    ['CAM001001', 'Contrato', hoje, hoje, 'CONCLUIDO', 'Anne', 'Contrato assinado'],
    ['CAM001001', 'Produto', hoje, hoje, 'CONCLUIDO', 'Anne', 'Enviado'],
    ['CAM001001', 'Roteiro', hoje, '', 'EM ANDAMENTO', 'Anne', ''],
    ['CAM001001', 'Conteudo', semanaQueVem, '', 'PENDENTE', 'Anne', ''],
    ['CAM003003', 'Contrato', amanha, '', 'PENDENTE', 'Anne', ''],
    ['CAM003003', 'Roteiro', semanaQueVem, '', 'PENDENTE', 'Anne', '']
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Checklist_Execucao: 7 colunas, 6 registros de teste');
}


/**
 * FINANCEIRO_COMPLETE - 10 colunas
 * Fonte: getAllFinanceirosCompletos() linhas 4070-4097 do Code.gs
 */
function configurarAbaFinanceiroComplete(ss) {
  const sheet = ss.getSheetByName('Financeiro_Complete');

  // Headers baseados em getAllFinanceirosCompletos (10 colunas)
  const headers = [
    'ID Campanha',              // row[0]
    'ID Assessorado',           // row[1]
    'Nome Assessorado',         // row[2]
    'Marca',                    // row[3]
    'Valor Total',              // row[4]
    'Status Pagamento Cliente', // row[5]
    'Status Repasse',           // row[6]
    'Status NF',                // row[7]
    'Data Criacao',             // row[8]
    'Ultima Atualizacao'        // row[9]
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#284239')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();

  const dadosTeste = [
    ['CAM001001', 'ASS001001', 'Maria Oliveira', 'Nike Brasil', 8000, 'PENDENTE', 'AGUARDANDO NF', 'A EMITIR', hoje, hoje],
    ['CAM003003', 'ASS003003', 'Ana Paula Costa', 'Zara', 5000, 'PENDENTE', 'AGUARDANDO NF', 'A EMITIR', hoje, hoje]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Financeiro_Complete: 10 colunas, 2 registros de teste');
}


/**
 * FINANCEIRO_MASTER - Aba de sincronizacao
 * Fonte: sincronizarFinanceiroMaster() menciona a aba mas nao define estrutura
 * Criando estrutura minima
 */
function configurarAbaFinanceiroMaster(ss) {
  const sheet = ss.getSheetByName('Financeiro_Master');

  // Headers minimos para sincronizacao
  const headers = [
    'ID Campanha',
    'Marca',
    'Influenciador',
    'Valor Total',
    'Status',
    'Ultima Atualizacao'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  Logger.log('   - Financeiro_Master: 6 colunas, vazia (sera sincronizada)');
}


/**
 * DIVISAO_SOCIOS - Aba mencionada sem estrutura definida
 * Criando estrutura basica
 */
function configurarAbaDivisaoSocios(ss) {
  const sheet = ss.getSheetByName('Divisao_Socios');

  const headers = [
    'ID Campanha',
    'Valor Total',
    'Socio 1',
    'Percentual 1',
    'Valor 1',
    'Socio 2',
    'Percentual 2',
    'Valor 2',
    'Data'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  Logger.log('   - Divisao_Socios: 9 colunas, vazia');
}


/**
 * CONTROLE_REPASSES - Aba de sincronizacao
 * Fonte: sincronizarControleRepasses() menciona a aba
 */
function configurarAbaControleRepasses(ss) {
  const sheet = ss.getSheetByName('Controle_Repasses');

  const headers = [
    'ID Campanha',
    'Influenciador',
    'Valor Repasse',
    'Status',
    'Data Prevista',
    'Data Realizada',
    'Comprovante'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  Logger.log('   - Controle_Repasses: 7 colunas, vazia (sera sincronizada)');
}


/**
 * TEMPLATES - 6 colunas
 * Fonte: setupTemplatesSheet() linhas 438-452 do Code.gs
 */
function configurarAbaTemplates(ss) {
  const sheet = ss.getSheetByName('Templates');

  const headers = [
    'ID',
    'Nome',
    'Categoria',
    'Assunto',
    'Corpo',
    'Data Criacao'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();

  const dadosTeste = [
    ['TPL001', 'Primeiro Contato', 'Prospeccao', 'Parceria com [MARCA]',
     'Ola [NOME],\n\nEsperamos que esteja bem!\n\nTemos interesse em uma parceria...\n\nAtenciosamente,\nEquipe Litte', hoje],
    ['TPL002', 'Follow-up', 'Prospeccao', 'Re: Parceria [MARCA]',
     'Ola [NOME],\n\nGostaríamos de dar continuidade a nossa conversa...\n\nAtenciosamente,\nEquipe Litte', hoje],
    ['TPL003', 'Confirmacao Fechamento', 'Contrato', 'Confirmacao de Parceria - [MARCA]',
     'Ola [NOME],\n\nConfirmamos o fechamento da parceria!\n\nValor: [VALOR]\nEscopo: [ESCOPO]\n\nAtenciosamente,\nEquipe Litte', hoje]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Templates: 6 colunas, 3 registros de teste');
}


/**
 * HISTORICO - 8 colunas
 * Fonte: setupHistoricoSheet() linhas 462 do Code.gs
 */
function configurarAbaHistorico(ss) {
  const sheet = ss.getSheetByName('Historico');

  const headers = [
    'Tipo',
    'ID Campanha',
    'Acao',
    'Usuario',
    'Valor Antes',
    'Valor Depois',
    'Detalhes',
    'Data Hora'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const agora = new Date();

  const dadosTeste = [
    ['Assessorado', 'ASS001001', 'Criou', 'Sistema', '', '', 'Assessorado cadastrado: Maria Oliveira', agora],
    ['Assessorado', 'ASS002002', 'Criou', 'Sistema', '', '', 'Assessorado cadastrado: Carlos Santos', agora],
    ['Assessorado', 'ASS003003', 'Criou', 'Sistema', '', '', 'Assessorado cadastrado: Ana Paula Costa', agora],
    ['Andamento', 'CAM001001', 'Criou', 'Sistema', '', '', 'Prospeccao criada: Nike Brasil', agora],
    ['Andamento', 'CAM001001', 'Atualizou', 'Sistema', 'Em negociacao', 'Fechado', 'Status alterado para Fechado', agora],
    ['Campanha', 'CAM001001', 'Ativou', 'Sistema', '', '', 'Campanha ativada: Nike Brasil', agora]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Historico: 8 colunas, 6 registros de teste');
}


/**
 * NOTAS - 9 colunas
 * Fonte: getAllNotas()/criarNota() linhas 7785-7857 do Code.gs
 */
function configurarAbaNotas(ss) {
  const sheet = ss.getSheetByName('Notas');

  const headers = [
    'ID',
    'Titulo',
    'Tipo',
    'Conteudo',
    'ID Relacionado',
    'Data Criacao',
    'Ultima Atualizacao',
    'Criado Por',
    'Status'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#0F172A')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();

  const dadosTeste = [
    ['NOTE001', 'Preferencias Maria', 'assessorado', 'Prefere contato por WhatsApp. Horario: apos 14h.', 'ASS001001', hoje, hoje, 'Sistema', 'ativo'],
    ['NOTE002', 'Nike - Briefing', 'campanha', 'Foco em lifestyle urbano. Cores: preto e branco.', 'CAM001001', hoje, hoje, 'Sistema', 'ativo'],
    ['NOTE003', 'Zara - Restricoes', 'campanha', 'Nao pode usar outras marcas no mesmo post.', 'CAM003003', hoje, hoje, 'Sistema', 'ativo']
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Notas: 9 colunas, 3 registros de teste');
}


/**
 * NOTIFICACOES - 11 colunas
 * Fonte: setupNotificacoesSheet() linhas 480-483 do Code.gs
 */
function configurarAbaNotificacoes(ss) {
  const sheet = ss.getSheetByName('Notificacoes');

  const headers = [
    'ID Notificacao',
    'Tipo',
    'Titulo',
    'Mensagem',
    'ID Campanha',
    'ID Destinatario',
    'Lida',
    'Data Criacao',
    'Data Leitura',
    'Prioridade',
    'Icone'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();

  const dadosTeste = [
    ['NOT001001', 'SISTEMA', 'Novo influenciador cadastrado', 'O influenciador Maria Oliveira foi adicionado ao sistema', '', 'TODOS', 'NAO', hoje, '', 'BAIXA', 'user-plus'],
    ['NOT002002', 'SISTEMA', 'Nova prospeccao iniciada', 'Prospeccao com Nike Brasil foi iniciada', 'CAM001001', 'TODOS', 'NAO', hoje, '', 'MEDIA', 'target'],
    ['NOT003003', 'SISTEMA', 'Campanha ativada', 'Campanha Nike Brasil foi ativada e esta em producao', 'CAM001001', 'TODOS', 'NAO', hoje, '', 'ALTA', 'rocket']
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Notificacoes: 11 colunas, 3 registros de teste');
}


/**
 * FOLLOWUPS - Aba mencionada sem estrutura definida
 * generateId() menciona 'followup' como tipo
 */
function configurarAbaFollowUps(ss) {
  const sheet = ss.getSheetByName('FollowUps');

  const headers = [
    'ID',
    'ID Campanha',
    'ID Assessorado',
    'Tipo',
    'Data Agendada',
    'Status',
    'Descricao',
    'Data Criacao'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de teste
  const hoje = new Date();
  const amanha = new Date(hoje.getTime() + 24*60*60*1000);
  const semanaQueVem = new Date(hoje.getTime() + 7*24*60*60*1000);

  const dadosTeste = [
    ['FUP001', 'CAM002002', 'ASS002002', 'Email', amanha, 'PENDENTE', 'Enviar follow-up sobre proposta Samsung', hoje],
    ['FUP002', 'CAM001001', 'ASS001001', 'WhatsApp', semanaQueVem, 'PENDENTE', 'Confirmar recebimento do produto', hoje]
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - FollowUps: 8 colunas, 2 registros de teste');
}


/**
 * CONFIG - 2 colunas
 * Fonte: setupConfigSheet() linhas 501 do Code.gs
 */
function configurarAbaConfig(ss) {
  const sheet = ss.getSheetByName('Config');

  const headers = [
    'Lista',
    'Valor'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#667eea')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  // Dados de configuracao
  const dadosTeste = [
    ['TIMEZONE', 'America/Sao_Paulo'],
    ['VERSAO', '3.5'],
    ['ULTIMO_RESET', new Date().toISOString()],
    ['RESPONSAVEIS', 'Anne,Clara,Lucas'],
    ['REMETENTES', 'Litte,Marca,Influenciador']
  ];

  sheet.getRange(2, 1, dadosTeste.length, headers.length).setValues(dadosTeste);

  Logger.log('   - Config: 2 colunas, 5 registros de configuracao');
}


// ═══════════════════════════════════════════════════════════════════════════════
//                         FIM DO ARQUIVO RESET_SISTEMA.GS
// ═══════════════════════════════════════════════════════════════════════════════
