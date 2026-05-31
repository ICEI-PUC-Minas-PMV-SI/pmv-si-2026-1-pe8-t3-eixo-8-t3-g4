package lad.sys.api.controller;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lad.sys.api.dto.orcamento.DadosAtualizacaoOrcamento;
import lad.sys.api.dto.orcamento.DadosCadastroOrcamento;
import lad.sys.api.dto.orcamento.DadosListagemOrcamento;
import lad.sys.api.dto.orcamento.DadosOrcamento;
import lad.sys.api.model.Orcamento;
import lad.sys.api.repository.OrcamentoRepository;
import lad.sys.api.repository.ProjetoRepository;
import lad.sys.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/orcamento")
public class OrcamentoController {

    @Autowired
    private OrcamentoRepository repository;

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public ResponseEntity<Page<DadosListagemOrcamento>> listar(@PageableDefault(size = 50, sort = {"dataCriacao"}) Pageable pageable) {
        var res = repository.findAllByDeletadoFalse(pageable).map(DadosListagemOrcamento::new);

        return ResponseEntity.ok(res);
    }

    @GetMapping
    @RequestMapping("/{id}")
    public ResponseEntity<Object> buscar(@PathVariable Long id) {
        var orcamento = repository.getReferenceByIdAndDeletadoFalse(id);

        return orcamento != null ? ResponseEntity.ok(orcamento) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Object> post(@RequestBody @Valid DadosCadastroOrcamento dados, UriComponentsBuilder uriBuilder){

        if (!projetoRepository.existsById(dados.id_projeto())) {
            return ResponseEntity.badRequest()
                    .body("Projeto com ID " + dados.id_projeto() + " não encontrado");
        }

        if (!usuarioRepository.existsById(dados.id_usuario())) {
            return ResponseEntity.badRequest()
                    .body("Usuário com ID " + dados.id_usuario() + " não encontrado");
        }


        var orcamento = new Orcamento(dados);
        repository.save(orcamento);

        var uri = uriBuilder.path("/orcamento/{id}").buildAndExpand(orcamento.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosOrcamento(orcamento));
    }

    @PutMapping
    @Transactional
    public ResponseEntity<Object> put(@RequestBody @Valid DadosAtualizacaoOrcamento dados) {
        var orcamento = repository.getReferenceById(dados.id_orcamento());
        orcamento.atualizarRegistro(dados);

        var res = new DadosOrcamento(orcamento);

        return ResponseEntity.ok(res);
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<Object> deleteById(@RequestBody @Valid DadosAtualizacaoOrcamento dados) {
        Orcamento orcamento = repository.getReferenceById(dados.id_orcamento());
        orcamento.deletarOrcamento();

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/quantidade")
    public ResponseEntity<Object> quantidadeOrcamentos() {
        var res = repository.countByDeletadoFalse();
        System.out.println("total de orçamentos: " + res);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/margem_media_lucro")
    public ResponseEntity<Object> margemLucro() {
        var res = repository.calcularMediaLucro();
        System.out.println("margem lucro: " + res);
        return ResponseEntity.ok(res);
    }
}
