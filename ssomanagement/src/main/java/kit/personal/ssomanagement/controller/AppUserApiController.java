package kit.personal.ssomanagement.controller;

import kit.personal.ssoentity.entity.AppUser;
import kit.personal.ssoentity.repo.AppUserRepository;
import kit.personal.ssomanagement.controller.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.Principal;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class AppUserApiController {
	private static Logger LOG = LoggerFactory.getLogger(AppUserApiController.class);

	@Autowired
	AppUserRepository appUserRepo;

	@GetMapping( value = "/appUser", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Page<AppUser> getAppList(
			@RequestParam(value = "pageNumber", required = false, defaultValue = "0") String page,
			@RequestParam(value = "pageSize", required = false, defaultValue = "10") String limit
	){
		int pageNum = Integer.valueOf(page);
		int limitNum = Integer.valueOf(limit);
		Sort sort = Sort.by(Sort.Direction.DESC, "id");

		Page<AppUser> appUsers = appUserRepo.findAllBy(PageRequest.of(pageNum, limitNum, sort));
		return appUsers;
	}

	@RequestMapping( value = "/appUser", method = {RequestMethod.POST, RequestMethod.PUT}, produces = MediaType.APPLICATION_JSON_VALUE)
	public AppUser createOrUpdate(
			@RequestBody AppUser web,
			Principal principal
	){
		AppUser appUser = null;
		if (web.getId() != null){
			Optional<AppUser> optional = appUserRepo.findById(web.getId());
			appUser = optional.orElseThrow(() -> new ResourceNotFoundException("app User does not exist"));
		}

		appUser.setUsername(web.getUsername())
				.setDisplayName(web.getDisplayName())
				.setEmail(web.getEmail())
				.setLastModifiedDate(new Date());

		if (principal != null && principal.getName() != null){
			appUser.setLastModifiedBy(principal.getName());
		} else {
			appUser.setLastModifiedBy("test");
		}
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if (web.getPassword() != null && !"".equalsIgnoreCase(web.getPassword())){
			appUser.setPassword(passwordEncoder.encode(web.getPassword()));
		} // or else no update password
		appUserRepo.save(appUser);
		return web;
	}

	@GetMapping( value = "/appUser/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public AppUser read(@PathVariable BigInteger id){
		Optional<AppUser> optional = appUserRepo.findById(id);
		return optional.orElseThrow(() -> new ResourceNotFoundException("app User does not exist"));
	}
}
