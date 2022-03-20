namespace Domain.Abstractions;

public interface IUnitOfWork
{
    void Insert(IEntity entity);
    void InsertAsync(IEntity entity);
    void InsertRange(IEnumerable<IEntity> items);
    void InsertRangeAsync(IEnumerable<IEntity> items);
    void Update(IEntity entity);
    void Delete(IEntity entity, bool permanently = false);
    void DeleteRange(IEnumerable<IEntity> items, bool permanently = false);
    IEntity Attach(IEntity entity);
    int Save();
    Task<int> SaveAsync(CancellationToken cancellationToken);
}