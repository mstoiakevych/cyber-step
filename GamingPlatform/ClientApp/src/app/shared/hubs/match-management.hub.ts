import * as signalR from "@microsoft/signalr";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Player, Team} from "../interfaces/player";

type StringAction = (message: string) => void

@Injectable({
  providedIn: 'root'
})
export class MatchManagementHub {
  private static connection: HubConnection

  private constructor() {
    if (!MatchManagementHub.connection) {
      console.log('Construct connection')
      MatchManagementHub.connection = new HubConnectionBuilder()
        .withUrl(environment.matchHub, {
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true
        })
        .build();
    }
  }

  public establishConnection() {

    if (MatchManagementHub.connection.state !== 'Connected') {
      MatchManagementHub.connection.start().then(x => {
        console.log('Connection has started!')
      }).catch(e => {
        console.log('Connection failed!')
      })
    }
  }

  public onError(cb: StringAction): void {
    MatchManagementHub.connection.on('Error', cb)
  }

  public onShowErrorMessage(cb: StringAction): void {
    MatchManagementHub.connection.on('ShowErrorMessage', cb)
  }

  public onMatchEdited(cb: (args: string, matchId: number) => void): void {
    MatchManagementHub.connection.on('EditCustomMatch', cb)
  }

  public onShowModalWithTimer(cb: StringAction): void {
    MatchManagementHub.connection.on('ShowModalWithTimer', cb)
  }

  public onMatchResult(cb: (winner: Team) => void) {
    MatchManagementHub.connection.on('ShowMatchResult', cb)
  }

  public onMatchJoin(cb: (players: Player[]) => void) {
    MatchManagementHub.connection.on('onMatchJoin', cb)
  }

  public onNewPlayerJoin(cb: (player: Player) => void) {
    MatchManagementHub.connection.on('OnNewPlayerJoin', cb)
  }

  public createGame(matchId: number) {
    MatchManagementHub.connection.send('CreateGame', matchId)
  }

  public invitePlayers(matchId: number) { //?
    MatchManagementHub.connection.send('InvitePlayers', matchId)
  }

  public editLobbyConfiguration(matchId: number) {
    MatchManagementHub.connection.send('EditLobbyConfiguration', matchId)
  }

  public timeToPrepare(matchId: number, minutes: number) {
    MatchManagementHub.connection.send('Time2Prepare', matchId, minutes)
  }

  public startGame(matchId: number) {
    MatchManagementHub.connection.send('StartGame', matchId)
  }

  public joinGame(matchId: number, playerId: number) {
    MatchManagementHub.connection.send('Join', matchId, playerId)
  }
}
