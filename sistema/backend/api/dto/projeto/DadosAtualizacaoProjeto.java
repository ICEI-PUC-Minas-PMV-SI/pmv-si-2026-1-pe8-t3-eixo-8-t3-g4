package lad.sys.api.dto.projeto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DadosAtualizacaoProjeto(
        @NotNull
        Long id_projeto,

        @Size(min = 3, max = 150)
        String nome,

        Long id_cliente,

        String tipo_obra,

        String descricao,

        String data_inicio,

        String data_fim

) {
}
