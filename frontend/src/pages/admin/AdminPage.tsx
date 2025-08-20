import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Album, Music } from "lucide-react";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";


const AdminPage = () => {

    const {isAdmin, isLoading} = useAuthStore();

    const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore();

    useEffect(() => {
        fetchAlbums();
        fetchSongs();
        fetchStats();
    },[ fetchAlbums, fetchSongs, fetchStats]);

    if(!isAdmin && !isLoading) 
        return <div>Unauthorized</div>
    return <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
        <Header />

        <DashboardStats />

        <Tabs defaultValue="Songs" className="space-y-6">
            <TabsList className="inline-flex p-1 bg-zinc-800/50 gap-2">
                <TabsTrigger value="songs" className="flex items-center data-[state=active]:bg-zinc-700">
                    <Music className="mr-2 size-4"/>
                    Songs
                </TabsTrigger>

                <TabsTrigger value="albums" className="flex items-center data-[state=active]:bg-zinc-700">
                    <Album className="mr-2 size-4"/>
                    Albums
                </TabsTrigger>
              
            </TabsList>

            <TabsContent value="songs" className="space-y-4">
                <SongsTabContent />
            </TabsContent>
           
            <TabsContent value="albums" className="space-y-4">
                <AlbumsTabContent />
             </TabsContent>
        
        </Tabs>
    </div>; 
};
export default AdminPage