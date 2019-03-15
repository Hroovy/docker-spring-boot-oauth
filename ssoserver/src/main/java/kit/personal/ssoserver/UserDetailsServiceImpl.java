package kit.personal.ssoserver;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import kit.personal.ssoserver.entity.AppUser;
import kit.personal.ssoserver.entity.AppUserRole;
import kit.personal.ssoserver.entity.AuthUserAdapter;
import kit.personal.ssoserver.repo.AppUserRepository;
import kit.personal.ssoserver.repo.AppUserRoleRepository;
import kit.personal.ssoserver.repo.SubstituicaoRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private AppUserRepository userRepository;
    private AppUserRoleRepository roleRepository;
    private SubstituicaoRoleRepository substituicaoRoleRepository;
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
//
//        List<SubstituicaoRole> extendRoleList = substituicaoRoleRepository.findAllByPkFuncNo(Integer.valueOf(staffNo));
//        for (SubstituicaoRole role : extendRoleList){
//            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.getAppId() + "_" + role.getAppRole()));
//        }
//
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        String password = appUser.getPassword();
        LOG.warn(password);

//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        LOG.warn(encoder.encode("456"));
//        return new User(appUser.getUsername(), encoder.encode("456"), grantedAuthorities);

        //return new User(appUser.getUsername(), appUser.getPassword(), grantedAuthorities);
        appUser.setPassword(null);
        return new AuthUserAdapter(appUser.getUsername(), password, grantedAuthorities, appUser);
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
    public UserDetailsServiceImpl setSubstituicaoRoleRepository(SubstituicaoRoleRepository substituicaoRoleRepository) {
        this.substituicaoRoleRepository = substituicaoRoleRepository;
        return this;
    }
}
