package lad.sys.api.dto.itemOrcamento;

import jakarta.validation.constraints.NotNull;
import lad.sys.api.dto.insumo.DadosListagemInsumo;
import lad.sys.api.model.ItemOrcamento;

public record DadosListagemItemOrcamento(

        @NotNull
        Long id,

        Long idOrcamento,

        Long idInsumo,

        Float precoUnitario,

        Long quantidade,

        Float custoTotalItem
) {

        public DadosListagemItemOrcamento(ItemOrcamento item) {
                this(item.getId(), item.getIdOrcamento(), item.getIdInsumo(), item.getPrecoUnitario(), item.getQuantidade(), item.getCustoTotalItem());
        }
}
