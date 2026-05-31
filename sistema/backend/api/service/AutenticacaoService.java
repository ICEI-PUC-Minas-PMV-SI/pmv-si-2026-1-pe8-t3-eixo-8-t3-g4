package lad.sys.api.service;

import lad.sys.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Buscando usuário com email: " + email);
        var usuario = repository.findByEmail(email);

        if (usuario == null) {
            System.out.println("Usuário não encontrado!");
            throw new UsernameNotFoundException("Usuário não encontrado com o email: " + email);
        }

        System.out.println("Usuário encontrado: " + usuario.getUsername());
        return usuario;
    }
}

/*@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        return repository.findByEmail(email);
    }
}*/