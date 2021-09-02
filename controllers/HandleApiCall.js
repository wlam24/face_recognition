import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "e53d9c45d1524054baf1c67c1b316b30",
});

const HandleApiCall = (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL, req.body.input
  ).then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('unable to work with API')
  )}

  export default HandleApiCall;