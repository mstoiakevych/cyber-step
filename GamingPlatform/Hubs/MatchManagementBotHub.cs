using System.Text.Json;
using Domain.Common;
using Domain.Tournaments;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace GamingPlatform.Hubs;

public partial class MatchManagementHub
{
    public async Task BotReady(long matchId)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot).Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error($"Can not find match by this id: {matchId}");
            return;
        }
        
        if (match.Bot.Status != BotState.Online)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not online");
            return;
        }
        
        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        await Clients.Clients(players).ShowBotReady();
    }
    
    public async Task BotError(string message)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot).Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        match.Bot.Status = BotState.Error;
        _matchRepository.Update(match);

        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        await Clients.Clients(players).ShowErrorMessage(message);
    }

    public async Task SetBotStatus(BotState botStatus)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        match.Bot.Status = botStatus;
        _matchRepository.Update(match);
    }

    public async Task EditLobbyConfiguration(long matchId)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot).Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error($"Can not find match by this id: {matchId}");
            return;
        }

        if (match.Bot.Status != BotState.InLobby)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not in lobby");
            return;
        }

        var args = JsonSerializer.Serialize(new
        {
            name = $"{_botOptions.Prefix} {match.LobbyName}",
            mode = match.MatchMode,
            password = match.LobbyPassword,
            location = match.Server,
            visibility = "lv_public"
        });

        await Clients.Client(match.BotId).EditCustomMatch(args, matchId);
        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        // await Clients.Clients(players).ShowModalWithMessage("Waiting when the bot will configure the game");
    }

    public async Task Time2Prepare(long matchId, int minutes)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot).Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.Id == matchId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error($"Can not find match by this id: {matchId}");
            return;
        }

        if (match.Bot.Status != BotState.ReadyToStart)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not ready");
            return;
        }

        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        await Clients.Clients(players)
            .ShowModalWithTimer($"You have time to prepare. The game will start automatically in {minutes}m.", minutes);
    }

    public async Task StartGame(long matchId)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot).Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.Id == matchId);
        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error($"Can not find match by this id: {matchId}");
            return;
        }

        if (match.Bot.Status != BotState.ReadyToStart)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not ready");
            return;
        }
        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        await Clients.Clients(players).ShowModalWithMessage("Bot bot launches the game");
        await Clients.Client(match.BotId).StartGame(null);
    }

    public async Task SetMatchResult(Team winner)
    {
        var match = await _matchRepository.Query.Include(x => x.Bot).Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        if (match.Bot.Status != BotState.InGame)
        {
            await Clients.Client(Context.ConnectionId).Error("Your bot is not ready");
            return;
        }

        match.TeamWinner = winner;
        await _matchRepository.SaveAsync();

        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        await Clients.Clients(players).ShowMatchResult(winner);
    }

    public async Task ShowModalWithMessage(string message)
    {
        var match = await _matchRepository.Query.Include(x => x.Players)
            .FirstOrDefaultAsync(x => x.BotId == Context.ConnectionId);

        if (match == null)
        {
            await Clients.Client(Context.ConnectionId).Error("This bot does not belong to any match");
            return;
        }

        var players = match.Players.Select(x =>
            _playerService.GetHubClientFromPlayerId(x.Id).Result?.ConnectionId);
        await Clients.Clients(players).ShowModalWithMessage(message);
    }
}