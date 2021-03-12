package kit.personal.ssoresourceserver;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;

@EnableWebSecurity
public class ResourceServerConfiguration extends WebSecurityConfigurerAdapter {
    @Value("${oauth.check_token.uri}")
    private String checkTokenUri;
    protected void configure(HttpSecurity http) {
        try {
            http.authorizeRequests(
                    authorizeRequests -> authorizeRequests
                        .antMatchers("/user/read").hasAuthority("SCOPE_read")
                        .antMatchers("/user/write").hasAuthority("SCOPE_write")
                        .anyRequest().authenticated())
                .oauth2ResourceServer(
                    oauth2 -> oauth2
                        .opaqueToken(opaqueToken -> opaqueToken.introspector(introspector())                        
                    ));
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    @Bean
    public OpaqueTokenIntrospector introspector() {
        return new CustomIntrospector(checkTokenUri);
    }
}
