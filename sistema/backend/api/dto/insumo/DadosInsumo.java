package lad.sys.api.dto.insumo;

import lad.sys.api.model.Insumo;

public record DadosInsumo(Long id, String nome, String unidade, Float precoAtual, Long idFornecedor) {

    public DadosInsumo(Insumo insumo) {
        this(insumo.getId(), insumo.getNome(), insumo.getUnidade(), insumo.getPrecoAtual(), insumo.getIdFornecedor());
    }
}
