using Xceed.Words.NET;
using Xceed.Document.NET;

using JobHelperApi.Models;
using JobHelperApi.Services;
using Certification = JobHelperApi.Services.CertificationChooser.Certification;
using System.Diagnostics;

namespace JobHelperApi.Services;
public class ResumeBuiler
{
    public DocX WriteResume(Dictionary<string, List<string>> skills, List<Certification> certifications, string companyName)
    {
        var templatePath = "C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumeDocs/ResumeJobHelperTemplate.docx";
        var ResumeDocxDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumeDocs/Resume-{companyName}.docx";
        var ResumePDFDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumePDFs/Resume-{companyName}.pdf";

        Directory.CreateDirectory(Path.GetDirectoryName(ResumeDocxDirectory)!);
        Directory.CreateDirectory(Path.GetDirectoryName(ResumePDFDirectory)!);

        var bytes = File.ReadAllBytes(templatePath);
        using var ms = new MemoryStream(bytes, writable: true);
        using var doc = DocX.Load(ms);

        InsertSkills(skills, doc);
        InsertCerts(certifications, doc);

        doc.SaveAs(ResumeDocxDirectory);

        ConvertDocxToPdf(ResumeDocxDirectory, ResumePDFDirectory);
        return doc;
    }
    private void InsertSkills(Dictionary<string, List<string>> skills, DocX templateDoc)
    {
        foreach (var skillType in skills)
        {
            string skillLine = string.Join(", ", skillType.Value);
            templateDoc.ReplaceText($"{{{{{skillType.Key}}}}}", skillLine);
        }
    }
    private void InsertCerts(List<Certification> certifications, DocX doc)
    {
        // find the placeholder
        Paragraph anchor = null;
        int anchorIndex = -1;
        for (int j = 0; j < doc.Paragraphs.Count; j++)
        {
            if (doc.Paragraphs[j].Text.Contains("{{certifications}}"))
            {
                anchor = doc.Paragraphs[j];
                anchorIndex = j;
                break;
            }
        }
        if (anchor == null) return;

        // build bullet list with empty bullets
        // create the list definition WITHOUT the starter bullet
        var list = doc.AddList("", 0, ListItemType.Bulleted, 1); // pass in a level > 0 to skip first item

        for (int i = 0; i < certifications.Count; i++)
            doc.AddListItem(list, ""); // blank bullet

        // insert bullets where anchor is
        anchor.InsertListAfterSelf(list);

        // format each bullet paragraph
        for (int i = 0; i < certifications.Count; i++)
        {
            var cert = certifications[i];
            var bullet = doc.Paragraphs[anchorIndex + 1 + i];

            bullet.Append(cert.Name).Bold().FontSize(10);
            bullet.Append($", {cert.DateIssued} - ").FontSize(10);
            bullet.Append($"Issued by {cert.IssuedBy}").Italic().FontSize(10);
            bullet.SpacingAfter(0); // extra space between bullets if you want
        }

        // remove the placeholder
        doc.RemoveParagraph(anchor);

        // remove the last stray bullet (the extra one)
        doc.RemoveParagraphAt(anchorIndex + certifications.Count);
    }

    public static void ConvertDocxToPdf(string inputPath, string outputPath)
    {
        var psi = new ProcessStartInfo
        {
            FileName = @"C:\Program Files\LibreOffice\program\soffice.exe",
            Arguments = $" --convert-to pdf \"{inputPath}\" --outdir \"{Path.GetDirectoryName(outputPath)}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };
        
        using var process = Process.Start(psi);
        process.WaitForExit();
    }
}