package kit.personal.ssomanagement.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kit.personal.ssomanagement.controller.exception.WrongParameterException;
import kit.personal.ssomanagement.entity.AppUserRole;
import kit.personal.ssomanagement.repo.AppUserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.math.BigInteger;
import java.util.*;

@Controller
@RequestMapping(value = "/api")
public class RoleApiController {
	@Autowired
	AppUserRoleRepository roleRepository;
	private static Logger LOG = LoggerFactory.getLogger(RoleApiController.class);


	@GetMapping( value = "/role", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Page<AppUserRole> getRoleList(
			@RequestParam(value = "appId") String appId,
			@RequestParam(value = "pageNumber", required = false, defaultValue = "0") String page,
			@RequestParam(value = "pageSize", required = false, defaultValue = "10") String limit
	){
		int pageNum = Integer.valueOf(page);
		int limitNum = Integer.valueOf(limit);
		Sort sort = new Sort(Sort.Direction.DESC, "username");

		Page<AppUserRole> roleList = roleRepository.findAllByAppId(appId, PageRequest.of(pageNum, limitNum, sort));
		return roleList;
	}

	@RequestMapping( value = "/role", method = {RequestMethod.POST, RequestMethod.PUT}, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public AppUserRole createOrUpdate(
			@RequestBody String jsonString
	) {
		Date now = new Date();
		String modifier = "test";
		ObjectMapper objectMapper = new ObjectMapper();
		AppUserRole appUserRole;
		try {
			appUserRole = objectMapper.readValue(jsonString, AppUserRole.class);
		} catch (IOException e) {
			e.printStackTrace();
			throw new WrongParameterException("json parser fail");
		}

		appUserRole.setLastModifiedDate(now).setLastModifiedBy(modifier);

		roleRepository.save(appUserRole);
		return appUserRole;
	}

	@GetMapping( value = "/role/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public AppUserRole read(
			@PathVariable(value = "id") BigInteger id
	){
		Optional<AppUserRole> optional = roleRepository.findById(id);
		return optional.orElse(null);
	}

	@DeleteMapping( value = "/role/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Map<String, Boolean> delete(
			@PathVariable(value = "id") BigInteger id
	){
		roleRepository.deleteById(id);

		Map<String, Boolean> ret = new HashMap<>();
		ret.put("ret", true);
		return ret;
	}
}
