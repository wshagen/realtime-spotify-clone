import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";


const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null>(null);

    const {currentSong,isPlaying, playNext} = usePlayerStore();

    // handle play/pause
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);

    // handle song ending
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio?.addEventListener("ended", handleEnded)

        return () => {
            audio?.removeEventListener("ended", handleEnded);
        };
    }, [playNext]);

    // handle song change
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        const audio = audioRef.current;
        
        const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

        if(isSongChange) {
            audio.src = currentSong?.audioUrl;
            //reset the playback position
            audio.currentTime = 0;
            if(isPlaying) audio.play();
            prevSongRef.current = currentSong?.audioUrl;
        }
    }, [currentSong, isPlaying]);
  return <audio ref={audioRef}/>;


}
export default AudioPlayer