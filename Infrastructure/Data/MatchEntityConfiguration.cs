using Domain.Tournaments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data;

public class MatchEntityConfiguration : IEntityTypeConfiguration<Match>
{
    public void Configure(EntityTypeBuilder<Match> builder)
    {
        builder
            .HasMany(x => x.Players)
            .WithMany(x => x.Matches)
            .UsingEntity<MatchPlayer>(
                x => x
                    .HasOne(mp => mp.Player)
                    .WithMany()
                    .HasForeignKey(mp => mp.PlayerId),
                x => x
                    .HasOne(mp => mp.Match)
                    .WithMany()
                    .HasForeignKey(mp => mp.MatchId),
                x => { x.HasKey(mp => new {mp.MatchId, mp.PlayerId}); }
            );

        builder
            .HasOne(x => x.Bot)
            .WithOne()
            .HasForeignKey<Match>(x => x.BotId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}