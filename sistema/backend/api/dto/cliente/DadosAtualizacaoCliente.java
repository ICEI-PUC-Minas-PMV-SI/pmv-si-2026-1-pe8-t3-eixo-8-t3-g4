package lad.sys.api.dto.cliente;

import jakarta.validation.constraints.*;

public record DadosAtualizacaoCliente(
        @NotNull
        Long id,

        @Size(min = 3, max = 100)
        String nome,

        @Email
        @Size(max = 100)
        String email,

        @Pattern(regexp = "\\d{8,13}")
        String telefone
) {
}