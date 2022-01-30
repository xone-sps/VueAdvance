import Base from "@/store/models/Base";
/**
 *
 * @constructor
 */
export default  function User(){
    Base.call(this); //extend
    this.id = null;
    this.email = null;
    this.password = null;
    this.notification_token = null;

    this.fromJSON =(json) =>{
      this.id = json.id;
      this.email = json.email;
      this.password = json.password;
      this.notification_token = json.notification_token;

    };
}
