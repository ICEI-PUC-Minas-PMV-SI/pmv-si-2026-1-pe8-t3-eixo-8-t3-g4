package lad.sys.api.dto.cliente;

import lad.sys.api.model.Cliente;

public record DadosCliente(Long id, String nome, String email, String telefone) {

    public DadosCliente(Cliente cliente) {
        this(cliente.getId(), cliente.getNome(), cliente.getEmail(), cliente.getTelefone());
    }
}
