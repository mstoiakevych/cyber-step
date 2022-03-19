using Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data;

public class HubClientEntityConfiguration : IEntityTypeConfiguration<HubClient>
{
    public void Configure(EntityTypeBuilder<HubClient> builder)
    {
        builder.HasKey(x => x.ConnectionId);
        
        builder
            .Property(x => x.ConnectionId)
            .ValueGeneratedNever();

        builder
            .HasOne(x => x.Player)
            .WithOne()
            .HasForeignKey<HubClient>(x => x.PlayerId);

        builder
            .HasOne(x => x.Match)
            .WithMany()
            .HasForeignKey(x => x.MatchId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}