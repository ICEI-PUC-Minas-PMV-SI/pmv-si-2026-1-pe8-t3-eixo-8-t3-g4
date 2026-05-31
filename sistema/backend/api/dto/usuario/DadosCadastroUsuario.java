package lad.sys.api.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DadosCadastroUsuario(

        @NotBlank
        String nome,

        @NotBlank
        @Size(min = 3, max = 50)
        String senha,

        @Email
        @NotBlank
        String email,

        Tipo tipo) {
}
