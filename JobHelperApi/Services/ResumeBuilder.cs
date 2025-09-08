using Xceed.Words.NET;
using Xceed.Document.NET;
using JobHelperApi.Models;
using JobHelperApi.Services;
using Certification = JobHelperApi.Services.CertificationChooser.Certification;

namespace JobHelperApi.Services;
public class ResumeBuiler
{
    public void WriteResume(Dictionary<string, List<string>> skills, List<Certification> certifications, JobApplicationPackage jAPack)
    {
        var templateDoc = "C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumeDocs/ResumeJobHelperTemplate.docx";
        var resumeDocxDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumeDocs/Resume-{jAPack.ListingInfo.Company}.docx";
        var resumePDFDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumePDFs/Resume-{jAPack.ListingInfo.Company}.pdf";

        Directory.CreateDirectory(Path.GetDirectoryName("C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs")!);
        using var doc = DocX.Load(templateDoc);

        InsertSkills(skills, doc);
        InsertCerts(certifications, doc);
        // doc.ReplaceText("{{Date}}", package.CoverLetter.Date ?? "");

        // doc.ReplaceText("{{Company}}", package.ListingInfo.Company ?? "");

        // var body = (package.CoverLetter.CoverLetterText ?? string.Empty)
        //         .Replace("\r\n", Environment.NewLine)
        //         .Trim();

        // doc.ReplaceText("{{CoverLetterText}}", body);

        // doc.SaveAs(coverLetterDocxDirectory);
        // ConvertDocxToPdf(coverLetterDocxDirectory, coverLetterPDFDirectory);
        // doc.ReplaceText("{{CoverLetterText}}", body);
    }
    private void InsertSkills(Dictionary<string, List<string>> skills, DocX templateDoc)
    {
        foreach (var skillType in skills)
        {
            Console.WriteLine(CreateStringFromList(skillType.Value));
        }
    }
    private string CreateStringFromList(List<string> list)
    {
        string returnString = "";
        for (int i = 0; i < list.Count; i++)
        {
            if (i != list.Count - 1)
            {
                returnString += $"{list[i]}, ";
            }
            else
            {
                returnString += $"{list[i]}";
            }
        }
        return returnString;
    }
    private void InsertCerts(List<Certification> certifications, DocX templateDoc) { }
    private void ConvertDocxToPdf() { }
}