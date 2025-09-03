namespace JobHelperApi.Models;

public sealed class JobParseResult
{
    public string Title { get; init; } = "";
    public string Company { get; init; } = "";
    public string Description { get; init; } = "";
    public List<TechItem> TechStack { get; init; } = new();
}

public sealed class TechItem
{
    public string Name { get; init; } = "";
    public float Weight { get; init; }
}