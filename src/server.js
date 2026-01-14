import app from "./app.js";
app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on ${process.env.PORT || 5000}`)
);
