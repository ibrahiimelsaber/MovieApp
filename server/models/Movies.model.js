import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  category: String,
  description: String,
  name: String,
  actors: [String],
  movieImage: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Movies = mongoose.model("Movies", movieSchema);

export default Movies;
