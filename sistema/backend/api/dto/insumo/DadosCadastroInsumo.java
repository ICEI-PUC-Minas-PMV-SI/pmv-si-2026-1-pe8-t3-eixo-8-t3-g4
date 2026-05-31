package lad.sys.api.dto.insumo;

import jakarta.validation.constraints.*;

public record DadosCadastroInsumo(
        @NotBlank
        @Size(min = 3, max = 100)
        String nome,

        @NotBlank
        @Size(min = 1, max = 20)
        String unidade,

        @NotNull
        Float precoAtual,

        Long idFornecedor
) {
}
