export interface Song {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    albumId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
    currentAlbum: Album | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Stats {
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
}

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    _id: string;
    clerkId: string;
    fullName: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}