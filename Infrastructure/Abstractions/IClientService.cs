namespace Infrastructure.Abstractions;

public interface IClientService
{
    Task RemoveConnections(long matchId);
}