using System.Net;

namespace Domain.Exceptions;

public class CSNotAuthenticatedException : CSDomainException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.Forbidden;
    
    public CSNotAuthenticatedException(string message) : base(message)
    {
    }
}