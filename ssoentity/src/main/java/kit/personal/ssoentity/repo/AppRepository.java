package kit.personal.ssoentity.repo;

import kit.personal.ssoentity.entity.App;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface AppRepository extends CrudRepository<App, Integer> {
	Page<App> findAllBy(Pageable pageable);
}
