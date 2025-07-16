import api from "./api";

/**
 * Faz fetch ao seu endpoint e retorna a Promise com o array mergeado de relatórios.
 *
 * @param {Object} filters - Objeto com os filtros opcionais:
 *   {
 *     DataInicio: string,        // ex: "2025-07-01"
 *     DataFim: string,           // ex: "2025-07-15"
 *     TipoProdutoID: number|string,
 *     AcademicoTipoMatricula: number|string,
 *     primeiraPaga: 0|1|"1"|"true",
 *     academicoSituacao: number|string,
 *     academicoSituacaoExcluir: number|string,
 *     academicoSituacaoExcluir2: number|string,
 *     academicoSituacaoExcluir3: number|string,
 *     // ... e qualquer outro filtro que você tenha
 *   }
 */
export async function fetchVendas(filters = {}) {
  return api.get("report/vendas", { params: filters }).then((res) => res.data);
}
