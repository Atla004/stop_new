import mainFetch from "../Slice/fetch.js";
import ROUTE from "../CONSTANT.js";

let init = async () => {
    
    
    let call = await mainFetch.request("GET", null, "/getUserData");
	if(call.status == 200){
        
        let socket = io();
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const room = urlParams.get('room');
        let roomCall = await mainFetch.request("GET", null, "/game/getRoomData");
        socket.emit("game:changeSocket", { user: call.user, room:room});


        const alertError = await slice.getInstance("ToastAlert", {color:"red", text:"Fill all Inputs before STOP", icon:"error"});
        const alertSuccess = await slice.getInstance("ToastAlert", {color:"green", text:"GAME STOP", icon:"success"});

        let gameModal = await slice.getInstance("GameModal", { alertStop:alertSuccess,alertFailStop:alertError,roomPlayers: roomCall.players ,room: room, role:call.role, user:call.user, nickname:call.nickname, socket:socket, letters: roomCall.letters, actualRound:roomCall.actualRound });

        document.body.appendChild(gameModal);
        gameModal.setUsers(room)

    }else{
        window.location.href = `http://${ROUTE}:3003/`
    }

    

    
}

await init();

