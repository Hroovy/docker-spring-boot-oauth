package kit.personal.ssoresourceserver.dto;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AwApplicant {
    @Id
    private String caseId;

    public String getCaseId() {
        return caseId;
    }

    public AwApplicant setCaseId(String caseId) {
        this.caseId = caseId;
        return this;
    }
}
