package lad.sys.api.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lad.sys.api.dto.usuario.DadosCadastroUsuario;
import lad.sys.api.dto.usuario.DadosRetornoCadastroUsuario;
import lad.sys.api.model.Usuario;
import lad.sys.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cadastro")
public class CadastroController {

    @Autowired
    public UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    @Transactional
    public ResponseEntity<Object> save(@RequestBody @Valid DadosCadastroUsuario dados) {


        String senhaCodificada = passwordEncoder.encode(dados.senha());

        var usuario = new Usuario(dados, senhaCodificada);

        repository.save(usuario);

        var retorno = new DadosRetornoCadastroUsuario(usuario.getNome(), usuario.getEmail(), usuario.getTipo());

        return ResponseEntity.ok().body(retorno);
    }
}
