import mongoose from "mongoose";

// "mongodb://yeonje:6350@0.0.0.0:27017/myComment?authSource=admin"
mongoose.connect("mongodb://localhost:27017/myComment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB ✅ ");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
//open occurs only once
db.once("open", handleOpen);

export default db;
