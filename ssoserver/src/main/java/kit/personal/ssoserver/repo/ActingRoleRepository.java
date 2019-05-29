package kit.personal.ssoserver.repo;

import kit.personal.ssoserver.entity.ActingRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface ActingRoleRepository extends CrudRepository<ActingRole, Integer> {
    List<ActingRole> findAllByPkUsername(String username);
    @Query(value = "select r from ActingRole r where r.pk.username = ?1 and r.pk.fromDate <= ?2 and r.pk.toDate >= ?2")
    List<ActingRole> findAllByPkUsernameAndDate(String username, Date testDate);

    @Query(value = "select r from ActingRole r where r.appId = ?1 and r.pk.fromDate <= ?2 and r.pk.toDate >= ?2")
    List<ActingRole> findAllByAppIdAndDate(String appId, Date testDate);

    List<ActingRole> findAllByAppIdAndPkUsername(String appId, String username);
    @Query(value = "select r from ActingRole r where r.appId = ?1 and r.pk.username = ?2 and r.pk.fromDate <= ?3 and r.pk.toDate >= ?3")
    List<ActingRole> findAllByAppIdAndPkUsernameAndDate(String appId, String username, Date testDate);
    List<ActingRole> findAllByAppIdAndAppRole(String appId, String AppRole);
}
