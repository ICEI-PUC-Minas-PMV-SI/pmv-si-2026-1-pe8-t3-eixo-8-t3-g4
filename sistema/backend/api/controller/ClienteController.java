package lad.sys.api.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lad.sys.api.dto.cliente.*;
import lad.sys.api.model.Cliente;
import lad.sys.api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @GetMapping
    public ResponseEntity<Page<DadosListagemCliente>> listar(@PageableDefault(size = 50, sort = {"nome"}) Pageable pageable) {
        var res = repository.findAllByDeletadoFalse(pageable).map(DadosListagemCliente::new);

        return ResponseEntity.ok(res);
    }

    @GetMapping
    @RequestMapping("/nomes")
    public ResponseEntity<Page<DadosListagemClienteNome>> listarnomes(Pageable pageable) {
        var res = repository.findAllByDeletadoFalse(pageable).map(DadosListagemClienteNome::new);

        return ResponseEntity.ok(res);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> post(@RequestBody @Valid DadosCadastroCliente dados, UriComponentsBuilder uriBuilder) {

        System.out.println(dados);
        var cliente = new Cliente(dados);
        repository.save(cliente);

        var uri = uriBuilder.path("/cliente/{id}").buildAndExpand(cliente.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosCliente(cliente));
    }

    @PutMapping
    @Transactional
    public ResponseEntity<Object> put(@RequestBody @Valid DadosAtualizacaoCliente dados) {
        var cliente = repository.getReferenceById(dados.id());
        cliente.atualizarRegistro(dados);

        var res = new DadosCliente(cliente);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosCliente> getById(@PathVariable Long id){
        Cliente cliente = repository.getReferenceByIdAndDeletadoFalse(id);

        return cliente != null ? ResponseEntity.ok(new DadosCliente(cliente)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<Object> deleteById(@RequestBody @Valid DadosAtualizacaoCliente dados) {
        Cliente cliente = repository.getReferenceById(dados.id());
        cliente.deletarCliente();

        return ResponseEntity.noContent().build();
    }
}
