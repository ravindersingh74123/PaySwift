import { Signin } from "@/components/Signin";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";




export default async function() {
      const session = await getServerSession(authOptions);
    
    console.log(session);
    return <Signin/>
}