package lad.sys.api.repository;

import lad.sys.api.model.ItemOrcamento;
import lad.sys.api.model.Projeto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemOrcamentoRepository extends JpaRepository<ItemOrcamento, Long> {


    Page<ItemOrcamento> findAllByDeletadoFalse(Pageable pageable);

    ItemOrcamento getReferenceByIdAndDeletadoFalse(Long id);

    @Query("SELECT p FROM item_orcamento p WHERE p.idOrcamento = :idOrcamento AND p.deletado = false")
    Page<ItemOrcamento> findAllByIdOrcamentoAndDeletadoFalse(Long idOrcamento, Pageable pageable);
}
