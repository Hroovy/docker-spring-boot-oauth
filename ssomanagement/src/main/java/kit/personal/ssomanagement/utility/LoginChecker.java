package kit.personal.ssomanagement.utility;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class LoginChecker {
	@Value("${application.disable_api_auth}")
	private boolean isDisableAPIAuth;
	@Value("${application.dummy_login_role}")
	private String dummyLoginRole;
	@Value("${application.dummy_login_name}")
	private String dummyLoginName;

	public String getLoginName(Authentication auth) {
		if (isDisableAPIAuth){
			return dummyLoginName;
		} else {
			return auth.getName();
		}
	}

	public String getLoginName(Principal auth) {
		if (isDisableAPIAuth){
			return dummyLoginName;
		} else {
			return auth.getName();
		}
	}

	public String getModifier(Authentication auth){
		return this.getLoginName(auth);
	}
}
