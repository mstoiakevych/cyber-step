using System.Net;

namespace Domain.Exceptions;

public class CSNotAcceptableException : CSDomainException
{
    public override HttpStatusCode StatusCode => HttpStatusCode.NotAcceptable;
    
    public CSNotAcceptableException(string message) : base(message)
    {
    }
}