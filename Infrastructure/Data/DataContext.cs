using Domain.Abstractions;
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
    public DbSet<HubClient> HubClients { get; set; }
    public IQueryable<T> GetQueryable<T>() where T : class, IEntity => Set<T>();


    public object Insert(object entity) => Add(entity).Entity;

    public async Task<object> InsertAsync(object entity) => (await AddAsync(entity)).Entity;


    public T Insert<T>(T entity) where T : class, IEntity => Add(entity).Entity;

    public async Task<T> InsertAsync<T>(T entity) where T : class, IEntity => (await AddAsync(entity)).Entity;


    public void InsertRange<T>(IEnumerable<T> entities) where T : class, IEntity => AddRange(entities);

    public async Task InsertRangeAsync<T>(IEnumerable<T> entities) where T : class, IEntity =>
        await AddRangeAsync(entities);


    public new object Update(object entity) => base.Update(entity).Entity;

    public new T Update<T>(T entity) where T : class, IEntity => base.Update(entity).Entity;

    public void Delete(object entity, bool permanently = false)
    {
        Remove(entity);
    }

    public void Delete<T>(T entity, bool permanently = false) where T : class, IEntity
    {
        Remove(entity);
    }

    public void DeleteRange<T>(IEnumerable<T> entities, bool permanently = false) where T : class, IEntity
    {
        RemoveRange(entities);
    }

    public new object Attach(object entity) => base.Attach(entity).Entity;

    public new T Attach<T>(T entity) where T : class, IEntity => base.Attach(entity).Entity;

    public async Task<int> SaveChangesAsync() => await SaveChangesAsync(CancellationToken.None);

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}