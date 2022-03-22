using System.Linq.Expressions;

namespace Infrastructure.Abstractions;

public interface IRepository<T> where T : class
{
    IEnumerable<T> All { get; }
    IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] predicates);
    T? GetByKey<TKey>(TKey key);
    Task<T?> GetByKeyAsync<TKey>(TKey key);
    T? First(Expression<Func<T, bool>> predicate);
    Task<T?> FirstAsync(Expression<Func<T, bool>> predicate);
    T? Single(Expression<Func<T, bool>> predicate);
    Task<T?> SingleAsync(Expression<Func<T, bool>> predicate);
    T Insert(T entity);
    Task<T> InsertAsync(T entity);
    void InsertRange(IEnumerable<T> items);
    Task InsertRangeAsync(IEnumerable<T> items);
    void Update(T entity);
    void UpdateRange(IEnumerable<T> items);
    void Delete(T entity);
    void DeleteRange(IEnumerable<T> items);
    T Attach(T entity);
    void AttachRange(IEnumerable<T> items);
    int Save();
    Task<int> SaveAsync();
}