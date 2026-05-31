package lad.sys.api.repository;

import lad.sys.api.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository  extends JpaRepository<Cliente, Long> {
    Page<Cliente> findAllByDeletadoFalse(Pageable pageable);

    Cliente getReferenceByIdAndDeletadoFalse(Long id_cliente);

    boolean existsByIdAndDeletadoFalse(Long id);

}
