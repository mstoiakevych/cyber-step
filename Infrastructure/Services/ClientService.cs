using Domain.Common;
using Infrastructure.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class ClientService : IClientService
{
    private readonly IRepository<HubClient> _hubClientRepository;
    private readonly IRepository<BotClient> _botClientRepository;
    
    public ClientService(IRepository<HubClient> hubClientRepository, IRepository<BotClient> botClientRepository)
    {
        _hubClientRepository = hubClientRepository;
        _botClientRepository = botClientRepository;
    }

    public async Task RemoveConnections(long matchId)
    {
        var hubClients = _hubClientRepository.Query.Where(x => x.MatchId == matchId);
        var botClient = await _botClientRepository.Query.FirstOrDefaultAsync(x => x.MatchId == matchId);
        
        _hubClientRepository.DeleteRange(hubClients);
        
        if (botClient != null)
            _botClientRepository.Delete(botClient);
    }
}