package lad.sys.api.dto.insumo;

import lad.sys.api.model.Insumo;

public record DadosListagemInsumo(Long id, String nome, String unidade, Float precoAtual, Long idFornecedor) {

    public DadosListagemInsumo(Insumo insumo) {
        this(insumo.getId(), insumo.getNome(), insumo.getUnidade(), insumo.getPrecoAtual(), insumo.getIdFornecedor());
    }
}
