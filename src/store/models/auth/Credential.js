import User from "@/store/models/User";
import Role from "@/store/models/auth/Role";
import Permission from "@/store/models/auth/Permission";
export default function Credential(){
    this.token_type = "Bearer";
    this.expires_in = 0;
    this.access_token = null;
    this.refresh_token = null;
    ///User Class
    this.user = null;
    ///Role Class with transformed
    this.user_roles = [];
    ///Role Class with transformed
    this.permission_roles = [];
    this.fromJSON = (json) =>{
        this.token_type = json.token_type;
        this.expires_in = json.expires_in;
        this.access_token = json.access_token;
        this.refresh_token = json.refresh_token;
        this.user = User.fromJSON(json.user);
        this.user_roles = Role.fromJSON(json.user_roles);
        this.user_permission_roles = Permission.fromJSON(json.permission_roles);
    }
}
