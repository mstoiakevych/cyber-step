using System.ComponentModel;

namespace Domain.Tournaments;

public enum DotaServer
{
    [Description("US West")]
    UsWest,
    
    [Description("US East")]
    UsEast,
    
    [Description("Europe West")]
    EuropeWest,

    [Description("Singapore")]
    Singapore,
    
    [Description("Dubai")]
    Dubai,
    
    [Description("Stockholm")]
    Stockholm,
    
    [Description("Brazil")]
    Brazil,
    
    [Description("Austria")]
    Austria,
    
    [Description("Australia")]
    Australia,
    
    [Description("SouthAfrica")]
    SouthAfrica,
    
    [Description("Chile")]
    Chile,
    
    [Description("Peru")]
    Peru,
    
    [Description("India")]
    India
}