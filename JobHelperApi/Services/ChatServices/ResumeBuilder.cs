using Xceed.Words.NET;
using Xceed.Document.NET;
using Azure.Storage.Blobs;

using JobHelperApi.Models;
using JobHelperApi.Services;
using Certification = JobHelperApi.Services.CertificationChooser.Certification;
using System.Diagnostics;
using Azure.Storage.Sas;
using System.Reflection.Metadata;

namespace JobHelperApi.Services;
public class ResumeBuilder
{
    private readonly IWebHostEnvironment _env; //Built in interface for what enviroment we are in

    /*
    Built in interface for reading from configs, we are using it to fetch connection string, 
    this includes Azure settings and our appsettings.json file
    */
    private readonly IConfiguration _config;
    public ResumeBuilder(IWebHostEnvironment env, IConfiguration config)
    {
        _env = env;
        _config = config; 
    }
    public async Task<DocX> WriteResume(Dictionary<string, List<string>> skills, List<Certification> certifications, string companyName)
    {
        var templatePath = "";
        var ResumeDocxDirectory = "";
        var ResumePDFDirectory = "";

        if (_env.IsProduction())
        {
            var connectionString = _config["AZURE_STORAGE_CONNECTION_STRING"];
            var serviceClient = new BlobServiceClient(connectionString);
            var container = serviceClient.GetBlobContainerClient("templates");

            var templateBlobPath = "resumetemplates/ResumeJobHelperTemplate.docx";
            var templateBlob = container.GetBlobClient(templateBlobPath);

            // Use Azure-safe temp path
            var tempDir = Path.GetTempPath();
            Directory.CreateDirectory(tempDir);

            templatePath = Path.Combine(tempDir,"ResumeJobHelperTemplate.docx");
            await templateBlob.DownloadToAsync(templatePath);

            
            ResumeDocxDirectory = Path.Combine(tempDir,$"Resume-{companyName}.docx"); //Creates a temporary file on the Azure backend, it can hold small numbers of files
            ResumePDFDirectory = Path.Combine(tempDir,$"Resume-{companyName}.pdf"); //Creates a temporary file on the Azure backend, it can hold small numbers of files
        }
        else
        {
            templatePath = "C:/Users/Brick/Documents/GitHub/JobHelper-Application/TemplateDocs/ResumeJobHelperTemplate.docx";
            ResumeDocxDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumeDocs/Resume-{companyName}.docx";
            ResumePDFDirectory = $"C:/Users/Brick/Documents/GitHub/JobHelper-Application/ResumePDFs/Resume-{companyName}.pdf";
            Directory.CreateDirectory(Path.GetDirectoryName(ResumeDocxDirectory)!);
            Directory.CreateDirectory(Path.GetDirectoryName(ResumePDFDirectory)!);
        }

        var bytes = File.ReadAllBytes(templatePath);
        using var ms = new MemoryStream(bytes, writable: true);
        using var doc = DocX.Load(ms);

        InsertSkills(skills, doc);
        InsertCerts(certifications, doc);

        doc.SaveAs(ResumeDocxDirectory);
        ConvertDocxToPdf(ResumeDocxDirectory, ResumePDFDirectory);

        if (_env.IsProduction())
        {   
            //Connect to Azure file system
            var connectionString = _config["AZURE_STORAGE_CONNECTION_STRING"];
            var serviceClient = new BlobServiceClient(connectionString);
            var container = serviceClient.GetBlobContainerClient("userfiles");

            //Paths for file system uploading
            var blobUploadDocxPath = $"EvanVaran/Resumes/ResumeDocs/Resume-{companyName}.docx";
            var blobUploadPDFPath = $"EvanVaran/Resumes/ResumePDFs/Resume-{companyName}.pdf";
            var blobPDF = container.GetBlobClient(blobUploadPDFPath);
            var blobDocx = container.GetBlobClient(blobUploadDocxPath);

            //We upload our temporary file created on the backend to permanent storage on the Azure file system
            using var pdfStream = File.OpenRead(ResumePDFDirectory);
            await blobPDF.UploadAsync(pdfStream, overwrite: true);

            using var docxStream = File.OpenRead(ResumeDocxDirectory);
            await blobDocx.UploadAsync(pdfStream, overwrite: true);

            /*
                Shared Access Signature
                Normall Azure blobs are private but we want the user to be able to download the files we create for them. 
                This means we give them read privillages for 30 minutes after generation.
            */
            var sas = blobPDF.GenerateSasUri(BlobSasPermissions.Read, DateTimeOffset.UtcNow.AddMinutes(30));
        }
        
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

    private void ChooseProjects(){}
    private void ChooseExperience(){}
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