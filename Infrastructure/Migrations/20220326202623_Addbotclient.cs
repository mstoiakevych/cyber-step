using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class Addbotclient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_BotClient_BotId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayer_Matches_MatchId",
                table: "MatchPlayer");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayer_Players_PlayerId",
                table: "MatchPlayer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchPlayer",
                table: "MatchPlayer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BotClient",
                table: "BotClient");

            migrationBuilder.RenameTable(
                name: "MatchPlayer",
                newName: "MatchPlayers");

            migrationBuilder.RenameTable(
                name: "BotClient",
                newName: "BotClients");

            migrationBuilder.RenameIndex(
                name: "IX_MatchPlayer_PlayerId",
                table: "MatchPlayers",
                newName: "IX_MatchPlayers_PlayerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchPlayers",
                table: "MatchPlayers",
                columns: new[] { "MatchId", "PlayerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_BotClients",
                table: "BotClients",
                column: "ConnectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_BotClients_BotId",
                table: "Matches",
                column: "BotId",
                principalTable: "BotClients",
                principalColumn: "ConnectionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayers_Matches_MatchId",
                table: "MatchPlayers",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayers_Players_PlayerId",
                table: "MatchPlayers",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Matches_BotClients_BotId",
                table: "Matches");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayers_Matches_MatchId",
                table: "MatchPlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchPlayers_Players_PlayerId",
                table: "MatchPlayers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MatchPlayers",
                table: "MatchPlayers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_BotClients",
                table: "BotClients");

            migrationBuilder.RenameTable(
                name: "MatchPlayers",
                newName: "MatchPlayer");

            migrationBuilder.RenameTable(
                name: "BotClients",
                newName: "BotClient");

            migrationBuilder.RenameIndex(
                name: "IX_MatchPlayers_PlayerId",
                table: "MatchPlayer",
                newName: "IX_MatchPlayer_PlayerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MatchPlayer",
                table: "MatchPlayer",
                columns: new[] { "MatchId", "PlayerId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_BotClient",
                table: "BotClient",
                column: "ConnectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Matches_BotClient_BotId",
                table: "Matches",
                column: "BotId",
                principalTable: "BotClient",
                principalColumn: "ConnectionId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayer_Matches_MatchId",
                table: "MatchPlayer",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MatchPlayer_Players_PlayerId",
                table: "MatchPlayer",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
