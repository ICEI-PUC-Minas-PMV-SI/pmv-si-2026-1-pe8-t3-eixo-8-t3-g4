package lad.sys.api.repository;

import lad.sys.api.model.Insumo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsumoRepository extends JpaRepository <Insumo, Long> {

    Page<Insumo> findAllByDeletadoFalse(Pageable pageable);

    Insumo getReferenceByIdAndDeletadoFalse(Long id);

    Boolean existsByIdAndDeletadoFalse(Long id);
}
