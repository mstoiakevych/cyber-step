using Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data;

public class BotClientEntityConfiguration: IEntityTypeConfiguration<BotClient>
{
    public void Configure(EntityTypeBuilder<BotClient> builder)
    {
        builder.HasKey(x => x.ConnectionId);
        
        builder
            .Property(x => x.ConnectionId)
            .ValueGeneratedNever();
    }
}