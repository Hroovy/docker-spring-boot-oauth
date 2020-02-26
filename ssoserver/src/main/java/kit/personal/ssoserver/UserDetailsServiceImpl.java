package kit.personal.ssoserver;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import kit.personal.ssoentity.entity.ActingRole;
import kit.personal.ssoentity.entity.AppUser;
import kit.personal.ssoentity.entity.AppUserRole;
import kit.personal.ssoentity.repo.AppUserRepository;
import kit.personal.ssoentity.repo.AppUserRoleRepository;
import kit.personal.ssoentity.repo.ActingRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private AppUserRepository userRepository;
    private AppUserRoleRepository roleRepository;
    private ActingRoleRepository actingRoleRepository;
    private static Logger LOG = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    /*
    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String staffNo) throws UsernameNotFoundException {
			Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			return new User("john", encoder.encode("123"), grantedAuthorities);
		}
    */
    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findOneByUsername(username);

        if (appUser == null){
            throw new UsernameNotFoundException("Staff no not found");
        }

        List<AppUserRole> roleList = roleRepository.findAllByUsername(username);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
        for (AppUserRole role : roleList){
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.getAppId() + "_" + role.getAppRole()));
        }

        List<ActingRole> extendRoleList = actingRoleRepository.findAllByPkUsernameAndDate(username, new Date());

        for (ActingRole role : extendRoleList){
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.getAppId() + "_" + role.getAppRole()));
        }

        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        String password = appUser.getPassword();
        LOG.warn(password);

        appUser.setPassword(null);

        return new User(appUser.getUsername(), password, grantedAuthorities);
    }

    @Autowired
    public void setUserRepository(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public UserDetailsServiceImpl setRoleRepository(AppUserRoleRepository roleRepository) {
        this.roleRepository = roleRepository;
        return this;
    }

    @Autowired
    public UserDetailsServiceImpl setActingRoleRepository(ActingRoleRepository actingRoleRepository) {
        this.actingRoleRepository = actingRoleRepository;
        return this;
    }
}
