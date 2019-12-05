package kit.personal.ssoresourceserver;

import kit.personal.ssoresourceserver.dto.AwApplicant;
import kit.personal.ssoresourceserver.dto.AwApplicantRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Controller
public class UserController {
    private static Logger LOG = LoggerFactory.getLogger(UserController.class);
    @Autowired
    AwApplicantRepo repo;


    @GetMapping("/user/sep")
    @ResponseBody
    public Principal user(Principal principal) {
        // TODO how to update info if token is a long term token?
        return principal;
    }

    @GetMapping("/user/first")
    @ResponseBody
    public AwApplicant testDB(Principal principal) {
        return repo.findFirstBy();
    }
}