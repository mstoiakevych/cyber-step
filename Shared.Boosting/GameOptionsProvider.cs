using Microsoft.Extensions.Options;
using Shared.Boosting.Entities;

namespace Shared.Boosting;

public class GameOptionsProvider
{
    private readonly IServiceProvider _serviceProvider;
    
    public GameOptionsProvider(IServiceProvider provider)
    {
        _serviceProvider = provider;
    }
    
    public T? GetGameOptions<T>() where T : class, IGameOptions
    {
        var service = _serviceProvider.GetService(typeof(IOptions<T>)) as IOptions<T>;

        return service?.Value;
    }
}