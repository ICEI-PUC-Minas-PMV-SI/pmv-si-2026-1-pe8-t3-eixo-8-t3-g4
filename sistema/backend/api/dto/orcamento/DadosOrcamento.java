package lad.sys.api.dto.orcamento;

import lad.sys.api.model.Orcamento;

public record DadosOrcamento(Long id, Long id_usuario, Long id_projeto, String data_criacao, Float custo_total, Float valor_final, Float margem_lucro, Float impostos) {

    public DadosOrcamento(Orcamento orcamento) {
        this(orcamento.getId(), orcamento.getIdProjeto(), orcamento.getIdUsuario(), orcamento.getDataCriacao(), orcamento.getCustoTotal(), orcamento.getValorFinal(),  orcamento.getMargemLucro(), orcamento.getImpostos());
    }

}
