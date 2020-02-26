package kit.personal.ssomanagement.controller;

import kit.personal.ssoentity.entity.App;
import kit.personal.ssoentity.repo.AppRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api")
public class AppApiController {
	@Autowired
	AppRepository appRepository;
	private static Logger LOG = LoggerFactory.getLogger(AppApiController.class);

	@GetMapping( value = "/app", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Page<App> getAppList(
			@RequestParam(value = "pageNumber", required = false, defaultValue = "0") String page,
			@RequestParam(value = "pageSize", required = false, defaultValue = "10") String limit
	){
		int pageNum = Integer.valueOf(page);
		int limitNum = Integer.valueOf(limit);
		Sort sort = Sort.by(Sort.Direction.DESC, "clientId");

		Page<App> roleList = appRepository.findAllBy(PageRequest.of(pageNum, limitNum, sort));
		return roleList;
	}
}
