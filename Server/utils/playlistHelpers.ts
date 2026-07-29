import mongoose from "mongoose";
import Playlist from "../models/Playlists.js";
import { NotFoundError } from "../errors/index.js";

/**
 * Resolve a client-facing playlist public id (e.g. "0", "1", "2", or a custom
 * UUID) to the playlist's Mongo _id for the given user.
 */
export const getPlaylistObjectId = async (
  publicId: string,
  userId: string | mongoose.Types.ObjectId
): Promise<mongoose.Types.ObjectId> => {
  const playlist = await Playlist.findOne({ id: publicId, userID: userId }).select("_id").lean();

  if (!playlist) {
    throw new NotFoundError(`Playlist not found: ${publicId}`);
  }

  return playlist._id as mongoose.Types.ObjectId;
};

/**
 * Return maps for converting between a user's playlist ObjectIds and public ids.
 */
export const getPlaylistIdMaps = async (userId: string | mongoose.Types.ObjectId) => {
  const playlists = await Playlist.find({ userID: userId }).select("id").lean();

  const publicToObjectId = new Map<string, mongoose.Types.ObjectId>();
  const objectIdToPublic = new Map<string, string>();

  playlists.forEach((playlist) => {
    const objectId = playlist._id as mongoose.Types.ObjectId;
    publicToObjectId.set(playlist.id, objectId);
    objectIdToPublic.set(objectId.toString(), playlist.id);
  });

  return { publicToObjectId, objectIdToPublic };
};
