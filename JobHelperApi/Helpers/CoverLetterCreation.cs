namespace JobHelperApi.Helpers;

using JobHelperApi.Models;
using Xceed.Document.NET;
using Xceed.Words.NET;
using System.Drawing;
using XColor = Xceed.Drawing.Color; // Color.Black, etc.



public class CoverLetterCreation
{
    public static void Write(JobApplicationPackage package)
    {
        Directory.CreateDirectory(Path.GetDirectoryName("C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs")!);
        using var doc = DocX.Load("C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs/CoverLetterJobHelperTemplate.docx");

        doc.ReplaceText(new StringReplaceTextOptions {
            SearchValue = "{{Date}}",
            NewValue = package.CoverLetter.Date ?? ""
        });

        doc.ReplaceText(new StringReplaceTextOptions {
            SearchValue = "{{Company}}",
            NewValue = package.ListingInfo.Company ?? ""
        });

        var body = (package.CoverLetter.CoverLetterText ?? string.Empty)
                .Replace("\r\n", Environment.NewLine)
                .Trim();

        doc.ReplaceText(new StringReplaceTextOptions {
            SearchValue = "{{CoverLetterText}}",
            NewValue = body
        });

        doc.SaveAs($"C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs/CoverLetter-{package.ListingInfo.Company}.docx");
    }
}