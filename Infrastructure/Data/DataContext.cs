using Domain.Common;
using Domain.Identity;
using Domain.Tournaments;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class DataContext : IdentityDbContext<SteamUser>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MatchEntityConfiguration).Assembly);
    }

    public DbSet<Match> Matches { get; set; }
    public DbSet<Player> Players { get; set; }
    public DbSet<MatchPlayer> MatchPlayers { get; set; }
    public DbSet<HubClient> HubClients { get; set; }
    public DbSet<BotClient> BotClients { get; set; }
}