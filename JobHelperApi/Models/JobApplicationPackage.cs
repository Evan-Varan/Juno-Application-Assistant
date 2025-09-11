using Xceed.Words.NET;
namespace JobHelperApi.Models;

public sealed class JobApplicationPackage
{
    public JobParseResult ListingInfo { get; init; } = new();
    public string Resume { get; init; }
    public CoverLetterResult CoverLetter { get; init; } = new();
    
}