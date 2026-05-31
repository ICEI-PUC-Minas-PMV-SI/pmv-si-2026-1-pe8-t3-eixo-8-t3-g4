package lad.sys.api.dto.cliente;

import lad.sys.api.model.Cliente;

public record DadosListagemCliente(Long id, String nome, String email, String telefone) {

    public DadosListagemCliente(Cliente cliente) {
        this(cliente.getId(),cliente.getNome(), cliente.getEmail(), cliente.getTelefone());
    }
}
