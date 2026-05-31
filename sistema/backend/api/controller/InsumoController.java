package lad.sys.api.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lad.sys.api.dto.insumo.*;
import lad.sys.api.model.Insumo;
import lad.sys.api.repository.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/insumo")
public class InsumoController {

    @Autowired
    private InsumoRepository repository;

    @GetMapping
    public ResponseEntity<Page<DadosListagemInsumo>> listar(@PageableDefault(size = 50, sort = {"nome"}) Pageable pageable) {
        var res = repository.findAllByDeletadoFalse(pageable).map(DadosListagemInsumo::new);

        return ResponseEntity.ok(res);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> post(@RequestBody @Valid DadosCadastroInsumo dados, UriComponentsBuilder uriBuilder) {

        System.out.println(dados);
        var insumo = new Insumo(dados);
        repository.save(insumo);

        var uri = uriBuilder.path("/insumo/{id}").buildAndExpand(insumo.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosInsumo(insumo));
    }

    @PutMapping
    @Transactional
    public ResponseEntity<Object> put(@RequestBody @Valid DadosAtualizacaoInsumo dados) {
        var insumo = repository.getReferenceById(dados.id());
        insumo.atualizarRegistro(dados);

        var res = new DadosInsumo(insumo);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosInsumo> getById(@PathVariable Long id){
        Insumo insumo = repository.getReferenceByIdAndDeletadoFalse(id);

        return insumo != null ? ResponseEntity.ok(new DadosInsumo(insumo)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<Object> deleteById(@RequestBody @Valid DadosExclusaoInsumo dados) {
        Insumo insumo = repository.getReferenceById(dados.id());
        insumo.deletarInsumo();

        return ResponseEntity.noContent().build();
    }

}
