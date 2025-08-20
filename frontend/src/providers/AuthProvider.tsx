import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";


const updateApiToken = (token:string | null) => {
    if (token) 
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
     else 
        delete axiosInstance.defaults.headers.common['Authorization']   
}

const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken, userId} = useAuth()
    const [loading, setLoading] = useState(true)
    const {checkAdminStatus} = useAuthStore()
    const {initSocket, disconnectSocket} = useChatStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if(token) {
                   await checkAdminStatus();
                   //initSocket();
                   if(userId) {
                       initSocket(userId);
                   }
                }
            } catch (error) {
                updateApiToken(null);
                console.log("Error in AuthProvider: ", error)
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Clean up the socket connection when the component unmounts
        return () => 
            disconnectSocket();
        }, [getToken, userId, disconnectSocket, initSocket, checkAdminStatus]);

    if (loading) return (
    
    <div className="w-full h-screen flex items-center justify-center">
        <Loader className="size-32 text-emerald-500 animate-spin"/>
    </div>
    )
    return <div>{children}</div>;
};

export default AuthProvider