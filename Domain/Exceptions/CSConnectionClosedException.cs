using System.Net;

namespace Domain.Exceptions;

public class CSConnectionClosedException : CSDomainException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;
    
    public CSConnectionClosedException(string message) : base(message)
    {
    }
}