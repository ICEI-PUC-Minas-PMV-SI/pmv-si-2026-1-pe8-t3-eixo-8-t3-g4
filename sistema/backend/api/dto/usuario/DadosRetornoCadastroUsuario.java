package lad.sys.api.dto.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DadosRetornoCadastroUsuario(

        @NotBlank
        String nome,

        @Email
        @NotBlank
        String email,

        Tipo tipo) {
}