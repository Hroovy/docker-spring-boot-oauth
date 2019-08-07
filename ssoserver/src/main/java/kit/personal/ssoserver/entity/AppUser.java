package kit.personal.ssoserver.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonView;
//import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class AppUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private BigInteger id;
    @JsonView(EntityJsonView.PUBLIC_VIEW.class)
    private String username;
    private String password;
    @JsonView(EntityJsonView.PUBLIC_VIEW.class)
    private String email;
    //@DateTimeFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private Date lastModifiedDate;
    private String lastModifiedBy;

    public BigInteger getId() {
        return id;
    }

    public AppUser setId(BigInteger id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public AppUser setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public AppUser setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public AppUser setEmail(String email) {
        this.email = email;
        return this;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public AppUser setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public AppUser setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }
}
