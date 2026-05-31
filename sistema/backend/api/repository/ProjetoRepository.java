package lad.sys.api.repository;

import lad.sys.api.model.Projeto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {

    Page<Projeto> findAllByDeletadoFalse(Pageable pageable);

    Projeto getReferenceByIdAndDeletadoFalse(Long id);

    @Query("SELECT p FROM projeto p WHERE p.idCliente = :idCliente AND p.deletado = false")
    List<Projeto> buscarProjetosPorCliente(@Param("idCliente") Long idCliente);

    long countByIdClienteAndDeletadoFalse(Long idCliente);

    Boolean existsByIdAndDeletadoFalse(Long id);

}
