namespace JobHelperApi.Helpers;

using JobHelperApi.Models;
using Xceed.Document.NET;
using Xceed.Words.NET;
using System.Diagnostics;



public class DocumentCreator
{
    public static void WriteCoverLetter(JobApplicationPackage package)
    {
        var templateDoc = "C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs/CoverLetterJobHelperTemplate.docx";
        var coverLetterDocxDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs/CoverLetter-{package.ListingInfo.Company}.docx";
        var coverLetterPDFDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterPDFs/CoverLetter-{package.ListingInfo.Company}.pdf";

        Directory.CreateDirectory(Path.GetDirectoryName("C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs")!);
        using var doc = DocX.Load(templateDoc);

        doc.ReplaceText(new StringReplaceTextOptions
        {
            SearchValue = "{{Date}}",
            NewValue = package.CoverLetter.Date ?? ""
        });

        doc.ReplaceText(new StringReplaceTextOptions
        {
            SearchValue = "{{Company}}",
            NewValue = package.ListingInfo.Company ?? ""
        });

        var body = (package.CoverLetter.CoverLetterText ?? string.Empty)
                .Replace("\r\n", Environment.NewLine)
                .Trim();

        doc.ReplaceText(new StringReplaceTextOptions
        {
            SearchValue = "{{CoverLetterText}}",
            NewValue = body
        });

        doc.SaveAs(coverLetterDocxDirectory);
        ConvertDocxToPdf(coverLetterDocxDirectory, coverLetterPDFDirectory);

    }
    public static void WriteResume(JobApplicationPackage package)
    {
        //TODO
    }
    public static void ConvertDocxToPdf(string inputPath, string outputPath)
    {
        var psi = new ProcessStartInfo
        {
            FileName = @"C:\Program Files\LibreOffice\program\soffice.exe",
            Arguments = $"--headless --convert-to pdf \"{inputPath}\" --outdir \"{Path.GetDirectoryName(outputPath)}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        using var process = Process.Start(psi);
        process.WaitForExit();
    }
}
