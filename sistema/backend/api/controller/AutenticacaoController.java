package lad.sys.api.controller;

import jakarta.validation.Valid;
import lad.sys.api.dto.usuario.DadosAutenticacao;
import lad.sys.api.model.Usuario;
import lad.sys.api.infra.security.DadosTokenJWT;
import lad.sys.api.infra.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/login")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<Object> efetuarLogin(@RequestBody @Valid DadosAutenticacao dados) {

        System.out.println("Tentativa de login: " + dados.email());
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha());
        Authentication authentication = manager.authenticate(authenticationToken);

        var tokenJWT = tokenService.gerarToken((Usuario) Objects.requireNonNull(authentication.getPrincipal()));

        return ResponseEntity.ok().body(new DadosTokenJWT(tokenJWT));
    }
}
