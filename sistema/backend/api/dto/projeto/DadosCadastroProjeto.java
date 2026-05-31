package lad.sys.api.dto.projeto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DadosCadastroProjeto(

        @NotNull
        Long id_cliente,

        @NotBlank
        @Size(min = 3, max = 150)
        String nome,

        String tipo_obra,

        String descricao,

        String data_inicio,

        String data_fim
        ) {
}
