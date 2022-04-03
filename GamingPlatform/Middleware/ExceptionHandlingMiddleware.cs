using Domain.Exceptions;
using Infrastructure.DTO.Error;

namespace GamingPlatform.Middleware;

public class ExceptionHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (CSDomainException e)
        {
            context.Response.StatusCode = (int) e.StatusCode;
            await context.Response.WriteAsJsonAsync(new CSDomainError {Message = e.Message});
        }
    }
}