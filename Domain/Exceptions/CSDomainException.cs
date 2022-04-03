using System.Net;

namespace Domain.Exceptions;

public abstract class CSDomainException : Exception
{
    public abstract HttpStatusCode StatusCode { get; }

    public CSDomainException(string message) : base(message)
    {
    }
}