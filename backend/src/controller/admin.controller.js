import {Song} from "../models/song.model.js";
import {Album} from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: "auto",
    });
    return result.secure_url;
};


export const createSong = async (req, res, next) => {
    console.log("=== createSong called ===");
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            console.log("Missing files:", req.files);
            return res.status(400).json({message: "Please upload all files"});
        }

        const {title, artist, albumId, duration} = req.body;
        console.log("Request body:", req.body);

        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;
        console.log("Audio file:", audioFile.name);
        console.log("Image file:", imageFile.name);

        const audioUrl = await uploadToCloudinary(audioFile);
        console.log("Audio uploaded to:", audioUrl);

        const imageUrl = await uploadToCloudinary(imageFile);
        console.log("Image uploaded to:", imageUrl);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        });

        await song.save();
        console.log("Song saved to DB with ID:", song._id);

        if(albumId) {
            const updatedAlbum = await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id },
            }, { new: true });
            console.log("Album updated:", updatedAlbum);
        }

        res.status(201).json(song);
    } catch (error) {
        console.error("Error in createSong:", error);
        next(error);
    }
};


export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params

        const song = await Song.findById(id)

        // if song belongs to an album, update that album's songs array
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id },
            })
        }

        await Song.findByIdAndDelete(id)

        res.status(200).json({ message: "Song deleted succesfully" });

    } catch (error) {
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try {
        const {title, artist, releaseYear} = req.body;
        const imageFile = req.files?.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear,
        });

        await album.save();

        res.status(201).json(album);
    } catch (error) {
        next(error);
    }
};

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params
        await Song.deleteMany({ albumId });
        await Album.findByIdAndDelete(id);

        res.status(200).json({ message: "Album deleted successfully"});

    } catch (error) {
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true });
}