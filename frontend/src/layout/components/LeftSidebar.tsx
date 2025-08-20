import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HomeIcon, LibraryIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  
  const {albums, fetchAlbums, isLoading} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  },[fetchAlbums]);

  if(!isLoading && albums.length > 0) {
    console.log({ albums });
  }

  return (
    <div className="flex flex-col gap-2 h-screen">
      {/* Navigation menu */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircleIcon className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 min-h-0 rounded-lg bg-zinc-900 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <LibraryIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        {/* Scrollable playlist */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="space-y-2">{isLoading ? <PlaylistSkeleton /> : (
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    className= "p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                  >
                    <img src={album.imageUrl} alt="Playlist cover" 
                      className="size-12 rounded-md flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="font-medium truncate">
                        { album.title }
                      </p>
                      <p className="text-sm text-zinc-400 truncate">
                        Album • { album.artist }
                      </p>

                    </div>

                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

