package lad.sys.api.repository;

import lad.sys.api.model.Orcamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Long> {

    Orcamento getReferenceByIdAndDeletadoFalse(Long id);

    Page<Orcamento> findAllByDeletadoFalse(Pageable pageable);

    Boolean existsByIdAndDeletadoFalse(Long id);

    Long countByDeletadoFalse();

    @Query("SELECT AVG(o.margemLucro) FROM orcamento o WHERE o.deletado = false")
    Double calcularMediaLucro();

}
