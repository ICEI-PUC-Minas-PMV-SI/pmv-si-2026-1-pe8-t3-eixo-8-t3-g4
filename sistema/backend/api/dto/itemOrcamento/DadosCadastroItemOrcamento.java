package lad.sys.api.dto.itemOrcamento;

import jakarta.validation.constraints.NotNull;

public record DadosCadastroItemOrcamento(

        @NotNull
        Long idOrcamento,

        @NotNull
        Long idInsumo,

        Long quantidade,

        Float precoUnitario,

        Float custoTotalItem

) {
}
