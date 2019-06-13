package kit.personal.ssoserver;

import kit.personal.ssoserver.entity.AppUser;
import kit.personal.ssoserver.entity.AppUserActing;
import kit.personal.ssoserver.entity.AppUserRole;
import kit.personal.ssoserver.repo.AppUserActingRepository;
import kit.personal.ssoserver.repo.AppUserRepository;
import kit.personal.ssoserver.repo.AppUserRoleRepository;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;


import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;






import javax.transaction.Transactional;

import java.util.Calendar;
import java.util.Date;

import static org.assertj.core.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@TestPropertySource(locations="classpath:test.properties")
@AutoConfigureMockMvc
@Transactional
public class SsoserverApplicationTests {
	@Autowired
	private AppUserRepository appUserRepository;
	@Autowired
	private AppUserActingRepository appUserActingRepository;
	@Autowired
	private AppUserRoleRepository appUserRoleRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Test
	public void testFetchData() {
		long count = appUserRepository.count();
		assertThat(count).isEqualTo(2);
	}

	@Autowired
	private MockMvc mockMvc;

	@Test
	public void testPasswordGrant() throws Exception {
//		curl -X POST \
//		http://localhost:8081/auth/oauth/token \
//		-F grant_type=password \
//		-F username=john \
//		-F password=456 \
//		-F client_id=spring-security-oauth2-read-write-client \
//		-F client_secret=spring-security-oauth2-read-write-client-password1234
		MvcResult result = this.mockMvc.perform(
				post("/oauth/token")
						.param("grant_type", "password")
						.param("username", "user1")
						.param("password", "1resu")
						.param("client_id", "spring-security-oauth2-read-write-client")
						.param("client_secret", "spring-security-oauth2-read-write-client-password1234")
		).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("bearer")))
				.andReturn();

		String jsonStr = result.getResponse().getContentAsString();
		JSONObject jsonObject = new JSONObject(jsonStr);
		String accessToken = (String)jsonObject.get("access_token");
		String tokenType = (String)jsonObject.get("token_type");
		assertThat(tokenType).isEqualTo("bearer");
		assertThat(accessToken).isNotEmpty();

		// curl http://localhost:8081/auth/user/me -H "Authorization: Bearer 5a428f4c-3356-41c3-9a57-ca54971d75e0"
		this.mockMvc.perform(
			get("/user/me").header("Authorization", "Bearer " + accessToken)
		).andDo(print()).andExpect(status().isOk());
	}

	@Test
	public void testClientCredentialsGrant() throws Exception {
//		curl -X POST \
//		http://localhost:8081/auth/oauth/token \
//		-F grant_type=client_credentials \
//		-F client_id=spring-security-oauth2-read-write-client \
//		-F client_secret=spring-security-oauth2-read-write-client-password1234
		MvcResult result = this.mockMvc.perform(
				post("/oauth/token")
						.param("grant_type", "client_credentials")
						.param("client_id", "spring-security-oauth2-read-write-client")
						.param("client_secret", "spring-security-oauth2-read-write-client-password1234")
		).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("bearer")))
				.andReturn();

		String jsonStr = result.getResponse().getContentAsString();
		JSONObject jsonObject = new JSONObject(jsonStr);
		String accessToken = (String)jsonObject.get("access_token");
		String tokenType = (String)jsonObject.get("token_type");
		assertThat(tokenType).isEqualTo("bearer");
		assertThat(accessToken).isNotEmpty();

		// curl http://localhost:8081/auth/app/fullUserList -H "Authorization: Bearer 5a428f4c-3356-41c3-9a57-ca54971d75e0"
		this.mockMvc.perform(
				get("/app/fullUserList").header("Authorization", "Bearer " + accessToken)
		).andDo(print()).andExpect(status().isOk());

		this.mockMvc.perform(
				get("/app/usersEmail")
						.header("Authorization", "Bearer " + accessToken)
						.param("username[]", "user1")
						.param("username[]", "user2")
		).andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("user1@sso.localhost")))
				.andExpect(content().string(containsString("user2@sso.localhost")))
		;

		this.mockMvc.perform(
				post("/app/addUserRole")
						.header("Authorization", "Bearer " + accessToken)
						.param("username", "user1")
						.param("appRole", "shit")
		).andDo(print())
				.andExpect(status().isOk())
				.andExpect(content().string(containsString("true")))
		;
	}



	@Before
	public void setUp() throws Exception {
		this.appUserRepository.deleteAll();
		AppUser user1 = new AppUser();
		user1.setEmail("user1@sso.localhost")
				.setUsername("user1")
				.setPassword(passwordEncoder.encode("1resu"));
		AppUser user2 = new AppUser();
		user2.setEmail("user2@sso.localhost")
				.setUsername("user2")
				.setPassword(passwordEncoder.encode("2resu"));
		//save user, verify has ID value after save
		assertThat(user1.getId()).isNull();
		assertThat(user2.getId()).isNull();
		this.appUserRepository.save(user1);
		this.appUserRepository.save(user2);
		assertThat(user1.getId()).isNotNull();
		assertThat(user2.getId()).isNotNull();


		Date current = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(current);
		c.add(Calendar.DATE, 1);
		Date tomorrow = c.getTime();
		c.add(Calendar.DATE, -2);
		Date yesterday = c.getTime();

		AppUserActing appUserActing = new AppUserActing();
		appUserActing.setUsername("user2").setActingForUsername("user1")
				.setFromDate(yesterday)
				.setToDate(tomorrow)
		;

		this.appUserActingRepository.save(appUserActing);

		AppUserRole role = new AppUserRole();
		role.setAppId("spring-security-oauth2-read-write-client");
		role.setAppRole("original");
		role.setUsername("user1");
		this.appUserRoleRepository.save(role);
	}

}
