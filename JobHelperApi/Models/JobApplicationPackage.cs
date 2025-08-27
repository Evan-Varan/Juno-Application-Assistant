namespace JobHelperApi.Models;

public sealed class JobApplicationPackage
{
    public JobParseResult ListingInfo { get; init; } = new();
    public CoverLetterResult CoverLetter { get; init; } = new();
}