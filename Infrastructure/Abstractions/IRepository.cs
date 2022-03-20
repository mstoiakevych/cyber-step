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
}