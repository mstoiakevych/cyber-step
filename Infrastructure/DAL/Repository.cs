using System.Linq.Expressions;
using Infrastructure.Abstractions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DAL;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly DbSet<T> Entities;
    protected readonly DataContext DataContext;
    
    public Repository(DataContext context)
    {
        DataContext = context;
        Entities = context.Set<T>();
    }

    public IQueryable<T> Query => Entities.AsQueryable();
    public IEnumerable<T> All => Entities.AsEnumerable();
    public IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
    {
        var query = Query;

        includeProperties.ToList().ForEach(include => query.Include(include));

        return query.AsEnumerable();
    }

    public T? GetByKey<TKey>(TKey key) =>  Entities.Find(key);
    public async Task<T?> GetByKeyAsync<TKey>(TKey key) =>  await Entities.FindAsync(key);

    public T? First(Expression<Func<T, bool>> predicate) => Entities.FirstOrDefault(predicate);
    public async Task<T?> FirstAsync(Expression<Func<T, bool>> predicate) => await Entities.FirstOrDefaultAsync(predicate);

    public T? Single(Expression<Func<T, bool>> predicate) => Entities.SingleOrDefault(predicate);
    public async Task<T?> SingleAsync(Expression<Func<T, bool>> predicate) => await Entities.SingleOrDefaultAsync(predicate);
    public T Insert(T entity) => Entities.Add(entity).Entity;
    public async Task<T> InsertAsync(T entity) => (await Entities.AddAsync(entity)).Entity;

    public void InsertRange(IEnumerable<T> items) => Entities.AddRange(items);

    public async Task InsertRangeAsync(IEnumerable<T> items) => await Entities.AddRangeAsync(items);

    public void Update(T entity) => Entities.Update(entity);

    public void UpdateRange(IEnumerable<T> items) => Entities.UpdateRange(items);

    public void Delete(T entity) => Entities.Remove(entity);

    public void DeleteRange(IEnumerable<T> items) => Entities.RemoveRange(items);

    public T Attach(T entity) => Entities.Attach(entity).Entity;

    public void AttachRange(IEnumerable<T> items) => Entities.AttachRange(items);

    public int Save() => DataContext.SaveChanges();

    public Task<int> SaveAsync() => DataContext.SaveChangesAsync();
}