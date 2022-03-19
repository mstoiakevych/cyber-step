using Domain.Tournaments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data;

public class PlayerEntityConfiguration : IEntityTypeConfiguration<Player>
{
    public void Configure(EntityTypeBuilder<Player> builder)
    {
        builder
            .HasOne(x => x.User)
            .WithOne()
            .HasForeignKey<Player>(x => x.UserId);
    }
}