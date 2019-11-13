package kit.personal.ssomanagement.repo;


import kit.personal.ssomanagement.entity.App;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;

public interface AppRepository extends CrudRepository<App, BigInteger> {
	Page<App> findAllBy(Pageable pageable);
}
