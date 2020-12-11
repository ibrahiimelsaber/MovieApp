/* eslint-disable no-use-before-define */
/* eslint-disable no-fallthrough */
import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createNewMovie, updateMovieById } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  let [errorMessage, setErrorMessage] = useState("none");
  
  const [postData, setPostData] = useState({ name: "", category: "", description: "", actors: "", movieImage: "" });
  useEffect(() => {
    setErrorMessage(() => {
      switch (postData) {
        case postData.name === "":
          setErrorMessage("block");
        case postData.category === "":
          setErrorMessage("block");
        case postData.description === "":
          setErrorMessage("block");
        case postData.actors === "":
          setErrorMessage("block");
        case postData.movieImage === "":
          setErrorMessage("block");
        default:
          setErrorMessage("block");
      }
    });
  }, [postData]);
 
  const post = useSelector((state) => (currentId ? state.posts.find((description) => description._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: "", category: "", description: "", actors: "", movieImage: "" });
  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (currentId === 0) {
      dispatch(createNewMovie(postData));
      clear();
    } else {
      dispatch(updateMovieById(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" Validate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.category}"` : "Adding new Movie"}</Typography>
        <TextField
          name="name"
          variant="outlined"
          label="Movie Name"
          fullWidth
          value={postData.name}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
        />
        <Box component="span" className={`${classes.errorMessage}`} display={errorMessage}>
          {" "}
          You must enter movie name
        </Box>

        <TextField
          name="category"
          variant="outlined"
          label="Movie Category"
          fullWidth
          value={postData.category}
          onChange={(e) => setPostData({ ...postData, category: e.target.value })}
        />
        <Box component="span" className={`${classes.errorMessage}`} display={errorMessage}>
          {" "}
          You must enter movie category
        </Box>

        <TextField
          name="message"
          variant="outlined"
          label="Movie Description"
          fullWidth
          multiline
          rows={4}
          value={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e.target.value })}
        />
        <Box component="span" className={`${classes.errorMessage}`} display={errorMessage}>
          {" "}
          <Box component="span" className={`${classes.errorMessage}`} display={errorMessage}>
            {" "}
            You must enter movie description
          </Box>
        </Box>
        <TextField
          name="actors"
          variant="outlined"
          label="Actors (coma separated)"
          fullWidth
          value={postData.actors}
          onChange={(e) => setPostData({ ...postData, actors: e.target.value.split(",") })}
        />
        <Box component="span" className={`${classes.errorMessage}`} display={errorMessage}>
          {" "}
          You must enter movie actors
        </Box>
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, movieImage: base64 })} />
        </div>
        <Box component="span" className={`${classes.errorMessage}`} display={errorMessage}>
          {" "}
          You must enter movie image
        </Box>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
