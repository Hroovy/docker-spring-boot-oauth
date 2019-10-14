package kit.personal.ssoserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    @Qualifier("userDetailsServiceImpl")
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    private ADUserDetailsContextMapper adUserDetailsContextMapper;

    @Value("${ad.domain}")
    private String AD_DOMAIN;

    @Value("${ad.url}")
    private String AD_URL;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/vendor/**").permitAll()
                .antMatchers("/js/**").permitAll()
                .antMatchers("/css/**").permitAll()
                .antMatchers("/actuator/**").permitAll()
                .and()
            .authorizeRequests().anyRequest().authenticated()
                .and()
            .formLogin().loginPage("/login").failureUrl("/login-error").permitAll();
    }

    @Autowired
    public void globalUserDetails(final AuthenticationManagerBuilder auth) throws Exception {
        if (this.AD_URL != null && !"".equals(this.AD_URL)){
        	auth.authenticationProvider(activeDirectoryLdapAuthenticationProvider());
				}
        //auth.authenticationProvider(customAuthenticationProvider);
        auth.userDetailsService(userDetailsService);
    }

    protected ActiveDirectoryLdapAuthenticationProvider activeDirectoryLdapAuthenticationProvider(){
        ActiveDirectoryLdapAuthenticationProvider provider = new ActiveDirectoryLdapAuthenticationProvider(AD_DOMAIN, AD_URL);
        provider.setConvertSubErrorCodesToExceptions(true);
        provider.setUseAuthenticationRequestCredentials(true);
        provider.setUserDetailsContextMapper(adUserDetailsContextMapper);

        return provider;
    }

    // TODO extract resource server into different project
    @Configuration
    @EnableResourceServer
    protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
        @Autowired
        private TokenStore tokenStore;
//        private Environment env;
        private String resourceIds= "resource-server-rest-api";

        @Override
        public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
            resources.resourceId(resourceIds).tokenStore(tokenStore);
        }
        @Override
        public void configure(HttpSecurity http) throws Exception {
            http.requestMatchers()
                    .antMatchers("/user/**", "/app/**")
                    .and()
                    .authorizeRequests().anyRequest().authenticated();
        }
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
