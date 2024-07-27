function addGame() {
    const name = document.getElementById("txtGameName").value;
    if (name.length === 0) {
        alert("The game name must be filled out.");
    } else {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("Game " + name + " added!");
                fetchGames();
            } else if (this.readyState === 4) {
                alert(this.status + "\n" + this.responseText);
            }
        };

        ajax.open("POST", "http://localhost:8001/games", true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify({ name: name }));
    }
}

function fetchGames() {
    const table = document.getElementById("tblGames");
    const ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const games = JSON.parse(this.responseText);
            table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Delete</th></tr>"; // Reset table
            games.forEach(game => {
                if (document.getElementById("g" + game.game_id) === null) {
                    const row = table.insertRow(-1);
                    row.id = "g" + game.game_id;
                    const cellId = row.insertCell(0);
                    const cellName = row.insertCell(1);
                    const cellDelete = row.insertCell(2);

                    cellId.innerHTML = game.game_id;
                    cellName.innerHTML = game.name;
                    cellDelete.innerHTML = '<button onclick="deleteGame(' + game.game_id + ')">Delete</button>';
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
        }
    };

    ajax.open("DELETE", "http://localhost:8001/games/" + gameId, true);
    ajax.send();
}
