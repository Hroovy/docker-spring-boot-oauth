package kit.personal.ssoentity.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name = "oauth_client_details")
public class App {
	@Id
	private String clientId;

	public String getClientId() {
		return clientId;
	}

	public App setClientId(String clientId) {
		this.clientId = clientId;
		return this;
	}
}
