package lad.sys.api.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lad.sys.api.dto.projeto.DadosAtualizacaoProjeto;
import lad.sys.api.dto.projeto.DadosCadastroProjeto;
import lombok.*;

@Table(name = "projeto")
@Entity(name = "projeto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_projeto")
    private Long id;

    @Column(name = "id_cliente")
    private Long idCliente;

    private String nome;
    @Column(name = "tipo_obra")
    private String tipoObra;
    private String descricao;
    @Column(name = "data_inicio")
    private String dataInicio;
    @Column(name = "data_fim")
    private String dataFim;
    private Boolean deletado;


    public Projeto(DadosCadastroProjeto dados) {
        this.idCliente = dados.id_cliente();
        this.nome = dados.nome();
        this.tipoObra = dados.tipo_obra();
        this.descricao = dados.descricao();
        this.dataInicio = dados.data_inicio();
        this.dataFim = dados.data_fim();
        this.deletado = false;
    }

    public void atualizarRegistro(@Valid DadosAtualizacaoProjeto dados) {
        this.nome = dados.nome() != null ? dados.nome() : this.nome;
        this.tipoObra = dados.tipo_obra() != null ? dados.tipo_obra() : this.tipoObra;
        this.descricao = dados.descricao() != null ? dados.descricao() : this.descricao;
        this.dataInicio = dados.data_inicio()  != null ? dados.data_inicio() : this.dataInicio;
        this.dataFim = dados.data_fim() != null ? dados.data_fim() : this.dataFim;
        this.idCliente = dados.id_cliente() != null ? dados.id_cliente() : this.idCliente;
    }

    public void deletarProjeto() {
        this.deletado = true;
    }
}
