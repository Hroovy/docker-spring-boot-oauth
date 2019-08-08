package kit.personal.ssoserver;

import kit.personal.ssoserver.entity.ActingRole;
import kit.personal.ssoserver.entity.AppUser;
import kit.personal.ssoserver.entity.AppUserRole;
import kit.personal.ssoserver.repo.ActingRoleRepository;
import kit.personal.ssoserver.repo.AppUserRepository;
import kit.personal.ssoserver.repo.AppUserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ADUserDetailsContextMapper implements UserDetailsContextMapper {
    private static Logger LOG = LoggerFactory.getLogger(ADUserDetailsContextMapper.class);
    @Autowired
    private AppUserRoleRepository roleRepository;
    @Autowired
    private ActingRoleRepository actingRoleRepository;
    @Autowired
    private AppUserRepository userRepo;

    @Override
    public UserDetails mapUserFromContext(DirContextOperations ctx, String adUsername, Collection<? extends GrantedAuthority> authorities) {
        String username = swapADUsernameToLocalUsername(adUsername);
        if (username == null) {
            username = adUsername;
        }
        List<AppUserRole> roleList = roleRepository.findAllByUsername(username);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>();
        for (AppUserRole role : roleList) {
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.getAppId() + "_" + role.getAppRole()));
        }

        List<ActingRole> extendRoleList = actingRoleRepository.findAllByPkUsernameAndDate(username, new Date());

        for (ActingRole role : extendRoleList) {
            grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + role.getAppId() + "_" + role.getAppRole()));
        }

        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return new User(username, "[AD MASKED]", grantedAuthorities);
    }

    @Override
    public void mapUserToContext(UserDetails user, DirContextAdapter ctx) {

    }

    private String swapADUsernameToLocalUsername(String adUsername) {
        AppUser user = userRepo.findOneByEmail(adUsername + "@ias.gov.mo");
        if (user != null) {
            return user.getUsername();
        } else {
            return null;
        }
    }
}
