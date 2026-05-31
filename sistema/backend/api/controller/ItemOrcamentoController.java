package lad.sys.api.controller;


import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lad.sys.api.dto.itemOrcamento.DadosAtualizacaoItemOrcamento;
import lad.sys.api.dto.itemOrcamento.DadosCadastroItemOrcamento;
import lad.sys.api.dto.itemOrcamento.DadosItemOrcamento;
import lad.sys.api.dto.itemOrcamento.DadosListagemItemOrcamento;
import lad.sys.api.model.ItemOrcamento;
import lad.sys.api.repository.InsumoRepository;
import lad.sys.api.repository.ItemOrcamentoRepository;
import lad.sys.api.repository.OrcamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/item_orcamento")
public class ItemOrcamentoController {

    @Autowired
    private ItemOrcamentoRepository repository;

    @Autowired
    private OrcamentoRepository orcamentoRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    @GetMapping
    public ResponseEntity<Page<DadosListagemItemOrcamento>> listar(@PageableDefault(size = 50) Pageable pageable) {
        var res = repository.findAllByDeletadoFalse(pageable).map(DadosListagemItemOrcamento::new);
        return ResponseEntity.ok(res);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> post(@RequestBody @Valid DadosCadastroItemOrcamento dados, UriComponentsBuilder uriBuilder) {

        if (!insumoRepository.existsById(dados.idInsumo())) {
            return ResponseEntity.badRequest()
                    .body("Insumo com ID " + dados.idInsumo() + " não encontrado");
        }

        if (!orcamentoRepository.existsById(dados.idOrcamento())) {
            return ResponseEntity.badRequest()
                    .body("Orçamento com ID " + dados.idOrcamento() + " não encontrado");
        }

        System.out.println(dados);
        var itemOrcamento = new ItemOrcamento(dados);
        repository.save(itemOrcamento);

        var uri = uriBuilder.path("/item_orcamento/{id}").buildAndExpand(itemOrcamento.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosItemOrcamento(itemOrcamento));
    }


    @PutMapping
    @Transactional
    public ResponseEntity<Object> put(@RequestBody @Valid DadosAtualizacaoItemOrcamento dados) {
        var item = repository.getReferenceById(dados.id());
        item.atualizarRegistro(dados);

        var res = new DadosItemOrcamento(item);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosItemOrcamento> getById(@PathVariable Long id){
        ItemOrcamento item = repository.getReferenceByIdAndDeletadoFalse(id);

        return item != null ? ResponseEntity.ok(new DadosItemOrcamento(item)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<Object> deleteById(@RequestBody @Valid DadosItemOrcamento dados) {
        ItemOrcamento itemOrcamento = repository.getReferenceById(dados.id());
        itemOrcamento.deletarItem();

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/orcamento/{id}")
    public ResponseEntity<Page<DadosListagemItemOrcamento>> getByOrcamentoId(@PathVariable Long id, @PageableDefault(size = 50) Pageable pageable) {
        var res = repository.findAllByIdOrcamentoAndDeletadoFalse(id, pageable).map(DadosListagemItemOrcamento::new);
        return ResponseEntity.ok(res);
    }

}
