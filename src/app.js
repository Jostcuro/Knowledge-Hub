const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("mongo-sanitize");

const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const viewRoutes = require("./routes/viewRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize(req.body);
  if (req.query) req.query = mongoSanitize(req.query);
  if (req.params) req.params = mongoSanitize(req.params);
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/newsletter", subscriberRoutes);
app.use("/", viewRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
