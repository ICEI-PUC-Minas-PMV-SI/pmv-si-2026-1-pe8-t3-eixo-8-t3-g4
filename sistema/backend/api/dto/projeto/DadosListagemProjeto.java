package lad.sys.api.dto.projeto;

import lad.sys.api.model.Projeto;

public record DadosListagemProjeto(Long id_projeto, Long id_cliente, String nome, String tipo_obra, String descricao, String data_inicio, String data_fim) {

    public DadosListagemProjeto(Projeto projeto) {
        this(projeto.getId(), projeto.getIdCliente(), projeto.getNome(), projeto.getTipoObra(), projeto.getDescricao(), projeto.getDataInicio(), projeto.getDataFim());
    }

}
