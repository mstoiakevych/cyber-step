namespace Domain.Abstractions;

public interface IDataContext : IDisposable
{
    IQueryable<T> GetQueryable<T>() where T : class, IEntity;

    object Insert(object entity);

    Task<object> InsertAsync(object entity);

    T Insert<T>(T item) where T : class, IEntity;

    Task<T> InsertAsync<T>(T entity) where T : class, IEntity;

    void InsertRange<T>(IEnumerable<T> items) where T : class, IEntity;

    Task InsertRangeAsync<T>(IEnumerable<T> items) where T : class, IEntity;

    object Update(object entity);

    T Update<T>(T item) where T : class, IEntity;

    void Delete(object entity, bool permanently = false);

    void Delete<T>(T item, bool permanently = false) where T : class, IEntity;

    void DeleteRange<T>(IEnumerable<T> items, bool permanently = false) where T : class, IEntity;

    object Attach(object entity);

    T Attach<T>(T entity) where T : class, IEntity;

    int SaveChanges();

    Task<int> SaveChangesAsync();

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}