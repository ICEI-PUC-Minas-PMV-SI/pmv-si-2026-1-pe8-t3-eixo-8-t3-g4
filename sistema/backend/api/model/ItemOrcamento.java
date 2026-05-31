package lad.sys.api.model;

import jakarta.persistence.*;
import lad.sys.api.dto.itemOrcamento.DadosAtualizacaoItemOrcamento;
import lad.sys.api.dto.itemOrcamento.DadosCadastroItemOrcamento;
import lombok.*;

@Table(name = "item_orcamento")
@Entity(name = "item_orcamento")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class ItemOrcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item")
    private Long id;

    @Column(name = "id_orcamento")
    private Long idOrcamento;

    @Column(name = "id_insumo")
    private Long idInsumo;

    private Long quantidade;

    @Column(name = "preco_unitario")
    private Float precoUnitario;

    @Column(name = "custo_total_item")
    private Float custoTotalItem;

    private Boolean deletado = false;


    public ItemOrcamento(DadosCadastroItemOrcamento dados) {
        this.idOrcamento = dados.idOrcamento();
        this.idInsumo = dados.idInsumo();
        this.quantidade = dados.quantidade();
        this.precoUnitario = dados.precoUnitario();
        this.custoTotalItem = (dados.quantidade() != null && dados.precoUnitario() != null) ? dados.quantidade() * dados.precoUnitario() : null;
    }

    public void atualizarRegistro(DadosAtualizacaoItemOrcamento dados) {

        var precoUnitarioNotNull = (dados.precoUnitario() != null);
        var quantidadeNotNull = (dados.quantidade() != null);

        this.precoUnitario = precoUnitarioNotNull ? dados.precoUnitario() : this.precoUnitario;
        this.quantidade = quantidadeNotNull ? dados.quantidade() : this.quantidade;

        var precoTotalNotNull = (this.precoUnitario != null && this.quantidade != null);

        this.custoTotalItem = precoTotalNotNull ? this.precoUnitario * this.quantidade : this.custoTotalItem;

    }

    public void deletarItem() {
        this.deletado = true;
    }



}
