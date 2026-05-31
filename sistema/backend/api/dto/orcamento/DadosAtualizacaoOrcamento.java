package lad.sys.api.dto.orcamento;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoOrcamento(
        @NotNull
        Long id_orcamento,

        String data_criacao,

        Float custo_total,

        Float valor_final,

        Float margem_lucro,

        Float impostos,

        Boolean deletado

) {
}
