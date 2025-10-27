using JobHelperApi.Models;
using Xceed.Words.NET;

namespace JobHelperApi.Services;

public class ResumeService
{
    private readonly ResumeBuilder _resumeBuilder;

    public ResumeService(ResumeBuilder resumeBuilder)
    {
        _resumeBuilder = resumeBuilder;
    }
    public async Task<string> BuildResume(JobParseResult job)
    {
        var skills = new SkillChooser();
        var outputtedSkills = skills.ChooseSkills(job.TechStack);

        CertificationChooser cc = new CertificationChooser();
        var certifications = cc.ChooseCertifications(job.TechStack);

        var resumeDocx = await _resumeBuilder.WriteResume(outputtedSkills, certifications, job.Company);
        return resumeDocx.Text;
    }
}