import mongoose from "mongoose";

interface PLAYLIST_TYPE {
  title: string;
  id: string;
  userID: string | mongoose.Types.ObjectId;
  isDemoUserPlaylist: boolean;
}

export { PLAYLIST_TYPE };
