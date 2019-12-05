package kit.personal.ssoresourceserver.dto;

import org.springframework.data.repository.CrudRepository;

public interface AwApplicantRepo extends CrudRepository<AwApplicant, String> {
    AwApplicant findFirstBy();
}
