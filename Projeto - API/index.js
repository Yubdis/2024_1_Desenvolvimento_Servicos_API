const knex = require("knex");
const restify = require("restify");
const errors = require("restify-errors");

const server = restify.createServer({
  name: "game_night",
  version: "1.0.0",
});

const corsMiddleware = require("restify-cors-middleware2");
const cors = corsMiddleware({
  origins: ["*"],
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.pre(cors.preflight);
server.use(cors.actual);

server.listen(8001, function () {
  console.log("%s executando em %s", server.name, server.url);
});

const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "game_night",
  },
});

server.get("/", (req, res, next) => {
  res.send("Get ready for a game night!");
});

// USERS ROUTES
server.get("/users", (req, res, next) => {
  db("Users").then(
    (data) => {
      res.send(data);
    },
    next
  );
});

server.get("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;
  db("Users")
    .where("user_id", userId)
    .first()
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("User not found"));
        }
        res.send(data);
      },
      next
    );
});

server.post("/users", (req, res, next) => {
  db("Users")
    .insert(req.body)
    .then(
      (data) => {
        res.send(data);
      },
      next
    );
});

server.put("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;
  db("Users")
    .where("user_id", userId)
    .update(req.body)
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("User not found"));
        }
        res.send("User updated");
      },
      next
    );
});

server.del("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;
  db("Users")
    .where("user_id", userId)
    .delete()
    .then(
      (data) => {
        res.send("User deleted");
      },
      next
    );
});

// GAMES ROUTES
server.get("/games", (req, res, next) => {
  db("Games").then(
    (data) => {
      res.send(data);
    },
    next
  );
});

server.get("/games/:gameId", (req, res, next) => {
  const gameId = req.params.gameId;
  db("Games")
    .where("game_id", gameId)
    .first()
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("Game not found"));
        }
        res.send(data);
      },
      next
    );
});

server.post("/games", (req, res, next) => {
  db("Games")
    .insert(req.body)
    .then(
      (data) => {
        res.send(data);
      },
      next
    );
});

server.put("/games/:gameId", (req, res, next) => {
  const gameId = req.params.gameId;
  db("Games")
    .where("game_id", gameId)
    .update(req.body)
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("Game not found"));
        }
        res.send("Game updated");
      },
      next
    );
});

server.del("/games/:gameId", (req, res, next) => {
  const gameId = req.params.gameId;
  db("Games")
    .where("game_id", gameId)
    .delete()
    .then(
      (data) => {
        res.send("Game deleted");
      },
      next
    );
});

// GAME NIGHTS ROUTES
server.get("/gamenights", (req, res, next) => {
  db("GameNights").then(
    (data) => {
      res.send(data);
    },
    next
  );
});

server.get("/gamenights/:gameNightId", (req, res, next) => {
  const gameNightId = req.params.gameNightId;
  db("GameNights")
    .where("game_night_id", gameNightId)
    .first()
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("Game night not found"));
        }
        res.send(data);
      },
      next
    );
});

server.post("/gamenights", (req, res, next) => {
  db("GameNights")
    .insert(req.body)
    .then(
      (data) => {
        res.send(data);
      },
      next
    );
});

server.put("/gamenights/:gameNightId", (req, res, next) => {
  const gameNightId = req.params.gameNightId;
  db("GameNights")
    .where("game_night_id", gameNightId)
    .update(req.body)
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("Game night not found"));
        }
        res.send("Game night updated");
      },
      next
    );
});

server.del("/gamenights/:gameNightId", (req, res, next) => {
  const gameNightId = req.params.gameNightId;
  db("GameNights")
    .where("game_night_id", gameNightId)
    .delete()
    .then(
      (data) => {
        res.send("Game night deleted");
      },
      next
    );
});

// PARTICIPANTS ROUTES
server.get("/participants", (req, res, next) => {
  db("Participants")
    .join("Users", "Participants.user_id", "=", "Users.user_id")
    .join("GameNights", "Participants.game_night_id", "=", "GameNights.game_night_id")
    .select("Participants.participant_id", "Users.username", "GameNights.name AS GameNight")
    .then(
      (data) => {
        res.send(data);
      },
      next
    );
});

server.get("/participants/:participantId", (req, res, next) => {
  const participantId = req.params.participantId;
  db("Participants")
    .where("participant_id", participantId)
    .first()
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("Participant not found"));
        }
        res.send(data);
      },
      next
    );
});

server.post("/participants", (req, res, next) => {
  db("Participants")
    .insert(req.body)
    .then(
      (data) => {
        res.send(data);
      },
      next
    );
});

server.put("/participants/:participantId", (req, res, next) => {
  const participantId = req.params.participantId;
  db("Participants")
    .where("participant_id", participantId)
    .update(req.body)
    .then(
      (data) => {
        if (!data || data === "") {
          return res.send(new errors.BadRequestError("Participant not found"));
        }
        res.send("Participant updated");
      },
      next
    );
});

server.del("/participants/:participantId", (req, res, next) => {
  const participantId = req.params.participantId;
  db("Participants")
    .where("participant_id", participantId)
    .delete()
    .then(
      (data) => {
        res.send("Participant deleted");
      },
      next
    );
});
