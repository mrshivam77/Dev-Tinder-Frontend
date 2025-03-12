import axios from "axios"
import {BASEURL} from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=> store.feed);
  

  
  const getFeed=async()=>{
    if(feed) return;
    try   
    {
      const res=await axios.get(BASEURL+"/user/feed",{  
        withCredentials:true,
      })
    dispatch(addFeed(res.data));
    

    } catch (error) {
      console.log(error);
      
  }
  
}
 
useEffect(()=>{
getFeed(); 
},[])
if(!feed) return;
if(feed.length<=0) 
      return <h1 className="text-center text-xl font-semibold text-gray-700 my-5">No Connections Found</h1>;

  return  (
    feed &&(
    <div className="flex justify-center my-10" >
    
    <UserCard user={feed[0]}/>
    </div>
  )
)
}

export default Feed
