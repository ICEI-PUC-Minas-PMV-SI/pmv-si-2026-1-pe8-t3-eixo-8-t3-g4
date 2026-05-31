package lad.sys.api.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lad.sys.api.dto.insumo.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "insumo")
@Entity(name = "insumo")
@EqualsAndHashCode(of = "id")
public class Insumo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_insumo")
    private Long id;
    private String nome;
    private String unidade;
    private float precoAtual;
    private Long idFornecedor;
    private boolean deletado;


    public Insumo(DadosCadastroInsumo dados) {
        this.id = null;
        this.nome = dados.nome();
        this.unidade = dados.unidade();
        this.precoAtual = dados.precoAtual();
        this.idFornecedor = dados.idFornecedor();
        this.deletado = false;
    }

    public void atualizarRegistro(@Valid DadosAtualizacaoInsumo dados) {
        this.nome = dados.nome() != null ? dados.nome() : this.nome;
        this.unidade = dados.unidade() != null ? dados.unidade() : this.unidade;
        this.precoAtual = dados.precoAtual() != null ? dados.precoAtual() : this.precoAtual;
        this.idFornecedor = dados.idFornecedor()  != null ? dados.idFornecedor() : this.idFornecedor;
    }

    public void deletarInsumo() {
        this.deletado = true;
    }
}
