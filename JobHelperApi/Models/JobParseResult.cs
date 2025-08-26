namespace JobHelperApi.Models;

public sealed class JobParseResult
{
    public string Title { get; init; } = "";
    public string Company { get; init; } = "";
    public string Description { get; init; } = "";
    public List<string> TechStack { get; init; } = new();
}