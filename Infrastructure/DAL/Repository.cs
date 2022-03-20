using System.Linq.Expressions;
using Infrastructure.Abstractions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DAL;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly DbSet<T> Entities;
    
    public Repository(DataContext context)
    {
        Entities = context.Set<T>();
    }

    public IEnumerable<T> All => Entities.AsEnumerable();
    public IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
    {
        var query = Entities.AsQueryable();

        includeProperties.ToList().ForEach(include => query.Include(include));

        return query.AsEnumerable();
    }

    public T? GetByKey<TKey>(TKey key) =>  Entities.Find(key);
    public async Task<T?> GetByKeyAsync<TKey>(TKey key) =>  await Entities.FindAsync(key);

    public T? First(Expression<Func<T, bool>> predicate) => Entities.FirstOrDefault(predicate);
    public async Task<T?> FirstAsync(Expression<Func<T, bool>> predicate) => await Entities.FirstOrDefaultAsync(predicate);

    public T? Single(Expression<Func<T, bool>> predicate) => Entities.SingleOrDefault(predicate);
    public async Task<T?> SingleAsync(Expression<Func<T, bool>> predicate) => await Entities.SingleOrDefaultAsync(predicate);
}