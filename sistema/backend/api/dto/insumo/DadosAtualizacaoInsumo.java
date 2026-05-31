package lad.sys.api.dto.insumo;

import jakarta.validation.constraints.*;

public record DadosAtualizacaoInsumo(
        @NotNull
        Long id,

        @Size(min = 3, max = 100)
        String nome,

        @Size(min = 1, max = 20)
        String unidade,

        @NotNull
        Float precoAtual,

        Long idFornecedor
) {
}