using JobHelperApi.Models;
using Xceed.Words.NET;

namespace JobHelperApi.Services;

public class ResumeService
{
    public DocX BuildResume(JobParseResult job)
    {
        var skills = new SkillChooser();
        var ouputtedSkills = skills.ChooseSkills(job.TechStack);

        CertificationChooser cc = new CertificationChooser();
        var certifications = cc.ChooseCertifications(job.TechStack);

        ResumeBuiler rb = new ResumeBuiler();
        var resumeDocx = rb.WriteResume(ouputtedSkills, certifications, job.Company);
        return resumeDocx;
    }
}