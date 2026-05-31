package lad.sys.api.dto.orcamento;

import jakarta.validation.constraints.NotNull;

public record DadosCadastroOrcamento(

        @NotNull
        Long id_projeto,

        @NotNull
        Long id_usuario,

        String data_criacao,

        Float custo_total,

        Float valor_final,

        Float margem_lucro,

        Float impostos,

        Boolean deletado
) {
}
