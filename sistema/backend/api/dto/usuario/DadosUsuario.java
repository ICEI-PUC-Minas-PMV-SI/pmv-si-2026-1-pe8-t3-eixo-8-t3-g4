package lad.sys.api.dto.usuario;

import lad.sys.api.model.Usuario;

public record DadosUsuario(Long id, String nome, String senha, String email, Tipo tipo) {

    public DadosUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getSenha(), usuario.getEmail(), usuario.getTipo());
    }
}
