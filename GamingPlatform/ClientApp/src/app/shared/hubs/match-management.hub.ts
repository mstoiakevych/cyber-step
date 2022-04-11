import * as signalR from "@microsoft/signalr";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../../environments/environment";
import {Team} from "../interfaces/match";

type StringAction = (message: string) => void

export class MatchManagementHub {
  private static connection: HubConnection

  private constructor() {
    if (!MatchManagementHub.connection) {
      MatchManagementHub.connection = new HubConnectionBuilder()
        .withUrl(environment.matchHub, {
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true
        })
        .build();
    }
  }

  public onError(cb: StringAction): void {
    MatchManagementHub.connection.on('Error', cb)
  }

  public onShowErrorMessage(cb: StringAction): void {
    MatchManagementHub.connection.on('ShowErrorMessage', cb)
  }

  public onMatchEdited(cb: (args: string, matchId: bigint) => void): void {
    MatchManagementHub.connection.on('EditCustomMatch', cb)
  }

  public onShowModalWithTimer(cb: StringAction): void {
    MatchManagementHub.connection.on('ShowModalWithTimer', cb)
  }

  public onMatchResult(cb: (winner: Team) => void) {
    MatchManagementHub.connection.on('ShowMatchResult', cb)
  }
}
