package lad.sys.api.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lad.sys.api.dto.orcamento.DadosAtualizacaoOrcamento;
import lad.sys.api.dto.orcamento.DadosCadastroOrcamento;
import lombok.*;

@Table(name = "orcamento")
@Entity(name = "orcamento")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Orcamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_orcamento")
    private Long id;

    @Column(name = "id_projeto")
    private Long idProjeto;

    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "data_criacao")
    private String dataCriacao;

    @Column(name = "custo_total")
    private Float custoTotal;

    @Column(name = "valor_final")
    private Float valorFinal;

    @Column(name = "margem_lucro")
    private Float margemLucro;

    private Float impostos;

    @Column(name = "deletado")
    private Boolean deletado;

    public Orcamento(DadosCadastroOrcamento dados) {
        this.idProjeto = dados.id_projeto();
        this.idUsuario = dados.id_usuario();
        this.dataCriacao = dados.data_criacao();
        this.custoTotal = dados.custo_total();
        this.valorFinal = dados.valor_final();
        this.margemLucro = dados.margem_lucro();
        this.impostos = dados.impostos();
        this.deletado = false;
    }

    public void atualizarRegistro(@Valid DadosAtualizacaoOrcamento dados) {
        this.dataCriacao = dados.data_criacao() != null ? dados.data_criacao() : this.dataCriacao;
        this.custoTotal = dados.custo_total()  != null ? dados.custo_total() : this.custoTotal;
        this.valorFinal =  dados.valor_final() != null ? dados.valor_final() : this.valorFinal;
        this.margemLucro = dados.margem_lucro() != null ? dados.margem_lucro() : this.margemLucro;
        this.impostos = dados.impostos() != null ? dados.impostos() : this.impostos;
    }

    public void deletarOrcamento() {
        this.deletado = true;
    }

}
