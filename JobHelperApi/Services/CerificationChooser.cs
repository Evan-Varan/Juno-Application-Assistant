using System.Text.Json;
using System.Text.Json.Serialization;
using JobHelperApi.Models;
using JobHelperApi.Services;
using ListingSkill = JobHelperApi.Services.SkillChooser.ListingSkill;

namespace JobHelperApi.Services;
public class CertificationChooser
{
    public record Certification(
        [property: JsonPropertyName("name")] string Name,
        [property: JsonPropertyName("dateissued")] string DateIssued,
        [property: JsonPropertyName("issuedby")] string IssuedBy,
        [property: JsonPropertyName("tags")] List<string> Tags
    );
    public record Certifications(
        [property: JsonPropertyName("certifications")] List<Certification> Certs
    );

    public List<Certification> ChooseCertifications(List<TechItem> techStack)
    {
        var skills = SortByWeights(techStack);
        var userCertificationsJson = File.ReadAllText("./Config/userCertifications.json");
        var userCertifications = JsonSerializer.Deserialize<Certifications>(userCertificationsJson)!;

        List<Certification> addedCertifications = new List<Certification>();

        CheckForCertifications(skills, addedCertifications, userCertifications);
        CheckNumberOfCertification(addedCertifications, userCertifications);

        return addedCertifications;
    }
    public List<ListingSkill> SortByWeights(List<TechItem> techStack)
    {
        var sf = new SkillChooser();
        var skills = sf.CreateWeightedList(techStack);
        return skills;
    }

    public void CheckForCertifications(List<ListingSkill> skills, List<Certification> addedCertifications, Certifications userCertifications)
    {
        foreach (var skill in skills)
        {
            foreach (var cert in userCertifications.Certs)
            {
                foreach (var tag in cert.Tags)
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
        Console.WriteLine("CheckNumberOfCertifications Hit");
        if (addedCerts.Count < 3)
        {
            AddCerts(addedCerts, userCertifications);
        }
        else if (addedCerts.Count > 3)
        {
            while (addedCerts.Count > 3)
            {
                SubtractCert(addedCerts);
            }
        }
    }
    public void AddCerts(List<Certification> addedCerts, Certifications userCertifications)
    {
        foreach (var cert in userCertifications.Certs)
        {
            if (!addedCerts.Contains(cert) && addedCerts.Count < 3)
            {
                addedCerts.Add(cert);
            }
        }

    }
    public void SubtractCert(List<Certification> addedCerts)
    {
        addedCerts.RemoveAt(addedCerts.Count - 1);
    }
}