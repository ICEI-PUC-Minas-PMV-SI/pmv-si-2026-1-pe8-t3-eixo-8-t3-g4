package lad.sys.api.dto.projeto;

import jakarta.validation.constraints.NotNull;

public record DadosExclusaoProjeto(
        @NotNull
        Long id_projeto
) {
}
