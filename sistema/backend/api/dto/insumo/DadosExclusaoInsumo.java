package lad.sys.api.dto.insumo;

import jakarta.validation.constraints.NotNull;

public record DadosExclusaoInsumo(
        @NotNull
        Long id

) {
}
