import Base from "@/store/models/Base";
export default  function Permission(){
    Base.call(this); //extend
    this.id = null;
    this.name = null;

    this.fromJson =(json) =>{
        this.id = json.id;
        this.name = json.name;

    };
}
