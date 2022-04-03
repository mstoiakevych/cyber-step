using Domain.Tournaments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data;

public class MatchEntityConfiguration : IEntityTypeConfiguration<Match>
{
    public void Configure(EntityTypeBuilder<Match> builder)
    {
        builder.Property(x => x.GameState).HasDefaultValue(GameState.Lobby);
        
        builder
            .HasMany(x => x.Players)
            .WithOne(x => x.Match)
            .HasForeignKey(x => x.MatchId);

        builder
            .HasOne(x => x.Bot)
            .WithOne()
            .HasForeignKey<Match>(x => x.BotId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}