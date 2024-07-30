function initialize(){
    fetchGames();
    fetchUsers();
    fetchGameNights();
    populateUserAndGameNightSelects();
}

function addGame() {
    const title = document.getElementById("txtGameName").value;
    const description = document.getElementById("txtGameDescription").value;

    if (title.length === 0) {
        alert("The game name must be filled out.");
    } else {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("Game " + title + " added!");
                fetchGames();
            } else if (this.readyState === 4) {
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:8001/games", true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify({ title: title, description: description }));
    }
}

function fetchGames() {
    const table = document.getElementById("tblGames");
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const games = JSON.parse(this.responseText);
            table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Description</th><th>Delete</th></tr>"; // Reset table
            games.forEach(game => {
                if (document.getElementById("g" + game.game_id) === null) {
                    const row = table.insertRow(-1);
                    row.id = "game_" + game.game_id;
                    const cellId = row.insertCell(0);
                    const cellName = row.insertCell(1);
                    const cellDescription = row.insertCell(2);
                    const cellDelete = row.insertCell(3);

                    cellId.innerHTML = game.game_id;
                    cellName.innerHTML = game.title;
                    cellDescription.innerHTML = game.description || "No description available";
                    cellDelete.innerHTML = '<button onclick="deleteGame(' + game.game_id + ')">Delete</button>';
                    cellDelete.classList.add("delete");
                }
            });
        }
    };

    ajax.open("GET", "http://localhost:8001/games", true);
    ajax.send();
}

function deleteGame(gameId) {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            fetchGames();
            populateUserAndGameNightSelects();
        }
    };

    ajax.open("DELETE", "http://localhost:8001/games/" + gameId, true);
    ajax.send();
}

function addUser() {
    const name = document.getElementById("txtUser").value;
    const email = document.getElementById("txtUserEmail").value;
    if (name.length === 0) {
        alert("The User name must be filled out.");
    } else {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("User " + name + " added!");
                fetchUsers();
                populateUserAndGameNightSelects();
            } else if (this.readyState === 4) {
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:8001/users", true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify({ username: name, email: email }));
    }
}

function fetchUsers() {
    const table = document.getElementById("tblUsers");
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const users = JSON.parse(this.responseText);
            table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Email</th><th>Delete</th></tr>"; // Reset table
            users.forEach(user => {
                if (document.getElementById("u" + user.user_id) === null) {
                    const row = table.insertRow(-1);
                    row.id = "u" + user.user_id;
                    const cellId = row.insertCell(0);
                    const cellName = row.insertCell(1);
                    const cellEmail = row.insertCell(2);
                    const cellDelete = row.insertCell(3);

                    cellId.innerHTML = user.user_id;
                    cellName.innerHTML = user.username;
                    cellEmail.innerHTML = user.email;
                    cellDelete.innerHTML = '<button onclick="deleteUser(' + user.user_id + ')">Delete</button>';
                    cellDelete.classList.add("delete");
 }
            });
        }
    };

    ajax.open("GET", "http://localhost:8001/users", true);
    ajax.send();
}

function deleteUser(userId) {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            fetchUsers();
        }
    };

    ajax.open("DELETE", "http://localhost:8001/users/" + userId, true);
    ajax.send();
}

function addGameNight() {
    const name = document.getElementById("txtGameNight").value;
    const location = document.getElementById("txtGameNightLocation").value;
    const date = document.getElementById("txtGameNightDate").value;
    const time = document.getElementById("txtGameNightTime").value;

    if (name.length === 0) {
        alert("The Game Night name must be filled out.");
    } else if (date.length === 0) {
        alert("The Game Night date must be filled out.");
    } else if (time.length === 0) {
        alert("The Game Night time must be filled out.");
    } else {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("Game Night " + name + " added!");
                fetchGameNights();
            } else if (this.readyState === 4) {
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:8001/gamenights", true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify({ name: name, location: location, date: date, time: time }));
    }
}

function fetchGameNights() {
    const table = document.getElementById("tblGameNights");
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const gameNights = JSON.parse(this.responseText);
            table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Location</th><th>Date</th><th>Time</th><th>Delete</th></tr>"; // Reset table
            gameNights.forEach(gameNight => {
                if (document.getElementById("gamenight_" + gameNight.game_night_id) === null) {
                    const row = table.insertRow(-1);
                    row.id = "gamenight_" + gameNight.game_night_id;
                    const cellId = row.insertCell(0);
                    const cellName = row.insertCell(1);
                    const cellLocation = row.insertCell(2);
                    const cellDate = row.insertCell(3);
                    const cellTime = row.insertCell(4);
                    const cellDelete = row.insertCell(5);

                    cellId.innerHTML = gameNight.game_night_id;
                    cellName.innerHTML = gameNight.name;
                    cellLocation.innerHTML = gameNight.location || "No description available";
                    cellDate.innerHTML = new Date(gameNight.date).toLocaleDateString();
                    cellTime.innerHTML = gameNight.time;
                    cellDelete.innerHTML = '<button onclick="deleteGameNight(' + gameNight.game_night_id + ')">Delete</button>';
                    cellDelete.classList.add("delete");
 }
            });
            populateUserAndGameNightSelects();
        }
    };

    ajax.open("GET", "http://localhost:8001/gamenights", true);
    ajax.send();
}

function deleteGameNight(gameNightId) {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            fetchGameNights();
        }
    };

    ajax.open("DELETE", "http://localhost:8001/gamenights/" + gameNightId, true);
    ajax.send();
}

function fetchParticipantsByGameId() {
    const gameId = document.getElementById("txtGameId").value;

    if (gameId.length === 0) {
        alert("The Game ID must be filled out.");
        return;
    }

    const table = document.getElementById("tblParticipants");
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const participants = JSON.parse(this.responseText);
            table.innerHTML = "<tr><th>ID</th><th>Username</th><th>Game Night</th><th>Delete</th></tr>"; // Reset table
            participants.forEach(participant => {
                const row = table.insertRow(-1);
                const cellId = row.insertCell(0);
                const cellUsername = row.insertCell(1);
                const cellGameNight = row.insertCell(2);
                const cellDelete = row.insertCell(3);

                cellId.innerHTML = participant.participant_id;
                cellUsername.innerHTML = participant.username;
                cellGameNight.innerHTML = participant.GameNight;
                cellDelete.innerHTML = '<button onclick="deleteParticipant(' + participant.participant_id + ')">Delete</button>';
                cellDelete.classList.add("delete");
            });
        } else if (this.readyState === 4) {
            alert(this.status + "\n" + this.responseText);
        }
    };

    ajax.open("GET", "http://localhost:8001/participants?gameId=" + gameId, true);
    ajax.send();
}

function deleteParticipant(participantId) {
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert("Participant deleted!");
            fetchParticipantsByGameId();
        }
    };

    ajax.open("DELETE", "http://localhost:8001/participants/" + participantId, true);
    ajax.send();
}

function populateUserAndGameNightSelects() {
    // Populate user dropdown
    const userSelect = document.getElementById("selectUser");
    fetch('http://localhost:8001/users')
        .then(response => response.json())
        .then(users => {
            userSelect.replaceChildren();
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.user_id;
                option.text = user.username;
                userSelect.appendChild(option);
            });
        });

    // Populate game night dropdown
    const gameNightSelect = document.getElementById("selectGameNight");
    fetch('http://localhost:8001/gamenights')
        .then(response => response.json())
        .then(gameNights => {
            gameNightSelect.replaceChildren();
            gameNights.forEach(gameNight => {
                const option = document.createElement("option");
                option.value = gameNight.game_night_id;
                option.text = gameNight.name;
                gameNightSelect.appendChild(option);
            });
        });
}

function addParticipant() {
    const userId = document.getElementById("selectUser").value;
    const gameNightId = document.getElementById("selectGameNight").value;

    if (!userId || !gameNightId) {
        alert("You must select both a user and a game night.");
        return;
    }

    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert("Participant added!");
            fetchParticipantsByGameId();
        } else if (this.readyState === 4) {
            alert(this.status + "\n" + this.responseText);
        }
    };

    ajax.open("POST", "http://localhost:8001/participants", true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(JSON.stringify({ user_id: userId, game_night_id: gameNightId }));
}