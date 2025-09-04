using System.Text.Json;
using System.Text.Json.Serialization;
using JobHelperApi.Models;
using JobHelperApi.Services;
using ListingSkill = JobHelperApi.Services.SkillFormatter.ListingSkill;


public class CertificationChooser
{
    private List<TechItem> techStack;

    public record Certification(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("dateissued")] string DateIssued,
        [property: JsonPropertyName("issuedby")] string IssuedBy,
        [property: JsonPropertyName("tags")] List<string> Tags
    );
    public record Certifications(
        [property: JsonPropertyName("certifications")] List<Certification> Certs
    );

    public void SortByWeights(List<TechItem> techStack)
    {
        var sf = new SkillFormatter();
        var skills = sf.CreateWeightedList(techStack);

        var userCertificationsJson = File.ReadAllText("./Config/userCertifications.json");
        var userCertifications = JsonSerializer.Deserialize<Certifications>(userCertificationsJson)!;

        List<Certification> addedCertifications = new List<Certification>();

        CheckForCertifications(skills, addedCertifications, userCertifications);
        CheckNumberOfCertification(addedCertifications, userCertifications);
    }

    public void CheckForCertifications(List<ListingSkill> skills, List<Certification> addedCertifications, Certifications userCertifications)
    {

        
        foreach (var cert in userCertifications.Certs)
        {
            foreach (var tag in cert.Tags)
            {
                foreach (var skill in skills)
                {
                    if (skill.Name == tag)
                    {
                        addedCertifications.Add(cert with { });
                    }
                }
            }
        }
    }
    public void CheckNumberOfCertification(List<Certification> addedCerts, Certifications userCertifications)
    {
        if (addedCerts.Count < 3)
        {
            while (addedCerts.Count < 3)
            {
                AddCert(addedCerts, userCertifications);
            }
        }
        else if (addedCerts.Count > 3)
        {
            while (addedCerts.Count < 3)
            {
                SubtractCert(addedCerts);
            }
        }        
    }
    public void AddCert(List<Certification> addedCerts, Certifications userCertifications)
    {
        foreach (var cert in userCertifications.Certs)
        {
            if (!addedCerts.Contains(cert))
            {
                addedCerts.Add(cert);
            }
        }
    }
    public void SubtractCert(List<Certification> addedCerts)
    {
        addedCerts.RemoveAt(addedCerts.Count - 1);
    }
    public void CertFormatter() { }
}