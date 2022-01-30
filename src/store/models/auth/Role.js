import Base from "@/store/models/Base";
export default  function Role(){
    Base.call(this); //extend
    this.id = null;
    this.name = null;
    this.permissions =  [];
    this.fromJson =(json) =>{
        this.id = json.id;
        this.name = json.name;
        this.permissions = json.permissions;
    };
}
