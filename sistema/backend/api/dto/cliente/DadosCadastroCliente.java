package lad.sys.api.dto.cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record DadosCadastroCliente(
        @NotBlank
        @Size(min = 3, max = 100)
        String nome,

        @NotBlank
        @Email
        @Size(max = 100)
        String email,

        @NotBlank
        @Pattern(regexp = "\\d{8,13}")
        String telefone
) {
}
