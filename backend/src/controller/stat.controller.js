import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";



export const getStats = async (req, res, next) => {
	try {
		const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
			Song.countDocuments(),
			Album.countDocuments(),
			User.countDocuments(),

			// Correct aggregation pipeline for unique artist count
			Song.aggregate([
                { $unionWith: { coll: "albums" } },
                { $group: { _id: "$artist" } },
                { $count: "count" }
            ]),
		]);

		res.status(200).json({
			totalSongs,
			totalAlbums,
			totalUsers,
			totalArtists: uniqueArtists[0]?.count || 0, // fix typo too
		});
	} catch (error) {
		next(error);
	}
};
