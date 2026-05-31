package lad.sys.api.dto.cliente;

import lad.sys.api.model.Cliente;

public record DadosListagemClienteNome(Long id, String nome) {

    public DadosListagemClienteNome(Cliente cliente) {
        this(cliente.getId(), cliente.getNome());
    }
}
