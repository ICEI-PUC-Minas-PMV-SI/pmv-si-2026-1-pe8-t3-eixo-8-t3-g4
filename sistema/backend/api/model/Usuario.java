package lad.sys.api.model;


import jakarta.persistence.*;
import lad.sys.api.dto.usuario.DadosCadastroUsuario;
import lad.sys.api.dto.usuario.Tipo;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name="usuarios")
@Entity(name = "Usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    public Usuario(DadosCadastroUsuario usuario, String senha) {
        this.id = null;
        this.nome = usuario.nome();
        this.email = usuario.email();
        this.senha = senha;
        this.tipo = usuario.tipo() != null ? usuario.tipo() : Tipo.orcamentista;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
