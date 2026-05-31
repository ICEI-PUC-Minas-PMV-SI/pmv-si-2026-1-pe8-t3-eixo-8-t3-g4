package lad.sys.api.dto.itemOrcamento;

import jakarta.validation.constraints.NotNull;
import lad.sys.api.model.ItemOrcamento;

public record DadosItemOrcamento(

        @NotNull
        Long id,

        Long idOrcamento,

        Long idInsumo,

        Float precoUnitario,

        Long quantidade,

        Float custoTotalItem
) {

        public DadosItemOrcamento(ItemOrcamento item) {
                this(item.getId(), item.getIdOrcamento(), item.getIdInsumo(), item.getPrecoUnitario(), item.getQuantidade(), item.getCustoTotalItem());
        }
}
