import {apiUrl,config,client} from "@/store/api/axios";
import Credential from "@/store/models/auth/Credential";
import User from "@/store/models/User";
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export default  function create(){
    return{
        namespaced:true,
        state:{

            credential: new Credential(),
        },
        getters:{
                ///Current logged-in user
                auth(state){
                return state.credential.user;
                },
                ///Current access token
                token(state){
                  return  state.credential.access_token;
                },
                ///User login state
                check(state,getter){
                    return !!getter.token;
                },

        },
        ///Set value
        mutations:{
       setCredential(state,payload){
           const {authUser} = payload;
           const credential = new Credential();
           const user = new User();
            user.fromJSON({
                id:authUser.userId,
                email: authUser.userEmail,
                name: authUser.userName,
                profile_url: authUser.userProfile,
                notification_token:payload.payload,
            })
           credential.fromJSON(
               {
                   ...payload,...{user}
               }
           );
            state.credential = credential;
           // state.credential =new Credential.fromJSON({...payload,
           //     user:{
           //         id:authUser.userId,
           //         email: authUser.userEmail,
           //         name: authUser.userName,
           //         profile_url: authUser.userProfile,
           //         notification_token:payload.payload,
           //     }
           //
           // })
       },
            ///Set Local storage
           setLocalStorage(){
               localStorage.setItem(ACCESS_TOKEN_KEY, this.state.credential.access_token)
           },
            removeToken(){
                localStorage.removeItem(ACCESS_TOKEN_KEY)
            }
       ///Call Api && function
        },
        actions:{
        login(context,user){
            console.log(user);
            return new Promise(((resolve,reject) =>{
                ///Request to server api
             client.post(`${apiUrl}admin/sign-in`,user,config.getHeaders()).then(
                 (response) => {
                     const {data} = response;
                     /// Commit credential to data
                     context.commit('setCredential',data);
                     /// Make then get called
                     resolve(data)
                 }
             ).catch((error) =>{
                 ///Make Catch tet called
                 reject(error);
                 if(error.response){
                     console.log(error.response)
                 }
             })
            }));
        }
        }
    }
}
