using Domain.Abstractions;

namespace Infrastructure.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly DataContext _dataContext;

    public UnitOfWork(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public void Insert(IEntity entity) => _dataContext.Insert(entity);

    public async void InsertAsync(IEntity entity) => await _dataContext.InsertAsync(entity);

    public void InsertRange(IEnumerable<IEntity> items) => _dataContext.InsertRange(items);

    public async void InsertRangeAsync(IEnumerable<IEntity> items) => await _dataContext.InsertRangeAsync(items);

    public void Update(IEntity entity) => _dataContext.Update(entity);

    public void Delete(IEntity entity, bool permanently = false) => _dataContext.Delete(entity, permanently);

    public void DeleteRange(IEnumerable<IEntity> items, bool permanently = false) =>
        _dataContext.DeleteRange(items, permanently);

    public IEntity Attach(IEntity entity) => _dataContext.Attach(entity);
    
    public int Save() => _dataContext.SaveChanges();

    public async Task<int> SaveAsync(CancellationToken cancellationToken) =>
        await _dataContext.SaveChangesAsync(cancellationToken);
}