using Domain.Abstractions;
using Domain.Common;
using Domain.Tournaments;
using Infrastructure.Abstractions;
using Infrastructure.DAL;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<IRepository<Match>, Repository<Match>>();
        serviceCollection.AddTransient<IRepository<Player>, Repository<Player>>();
        serviceCollection.AddTransient<IRepository<HubClient>, Repository<HubClient>>();
        serviceCollection.AddTransient<IRepository<BotClient>, Repository<BotClient>>();
        
        serviceCollection.AddTransient<IPlayerService, PlayerService>();
        serviceCollection.AddTransient<IMatchService, MatchService>();
        serviceCollection.AddTransient<IClientService, ClientService>();
    }
}