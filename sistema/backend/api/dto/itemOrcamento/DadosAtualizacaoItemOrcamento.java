package lad.sys.api.dto.itemOrcamento;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoItemOrcamento(

        @NotNull
        Long id,

        Float precoUnitario,

        Long quantidade
) {
}
