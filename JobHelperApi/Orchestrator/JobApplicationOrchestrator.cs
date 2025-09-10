using JobHelperApi.Models;
using JobHelperApi.Services;

namespace JobHelperApi.Orchestror;

public class JobApplicationOrchestrator
{
    private readonly JobParserService jobParserService;
    private readonly ResumeService resumeService;
    private readonly CoverLetterService CoverLetterService;

    public JobApplicationOrchestrator(JobParserService jps, ResumeService rs, CoverLetterService cls)
    {
        jobParserService = jps;
        resumeService = rs;
        CoverLetterService = cls;
    }

    public async Task<JobApplicationPackage> BuildApplicationAsync(JobTextInput jobText)
    {
        var parsedResults = await jobParserService.ParseJobAsync(jobText);
        var resumeResult = resumeService.BuildResume(parsedResults);
        
        var coverLetterResult = await CoverLetterService.CoverLetterTextAsync(parsedResults, resumeResult);
        var package = new JobApplicationPackage
        {
            ListingInfo = parsedResults!,
            CoverLetter = coverLetterResult!
        };
        CoverLetterCreator.WriteCoverLetter(package);

        return package;
    }
}