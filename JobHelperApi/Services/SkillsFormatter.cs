using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using JobHelperApi.Models;

namespace JobHelperApi.Services;



public class SkillFormatter
{

    private JobParseResult jobParseResult;
    public record Skill(
        [property: JsonPropertyName("id")] string Id,
        [property: JsonPropertyName("name")] string Name
    );

    public record CatalogEntry(
        [property: JsonPropertyName("key")] string Key,
        [property: JsonPropertyName("priority")] int Priority,
        [property: JsonPropertyName("skills")] List<Skill> Skills
    );

    public record Catalog(
        [property: JsonPropertyName("sections")] List<CatalogEntry> Sections
    );

    public record Inventory(
        [property: JsonPropertyName("claimed")] List<string> Claimed
    );
    private List<string> listingTechnologies = new List<string>();

    private Dictionary<string, List<string>> groupedSections =
    new Dictionary<string, List<string>>{
        {"frontend", new List<string>()},
        {"backend", new List<string>()},
        {"databases", new List<string>()},
        {"tools-cloud", new List<string>()}
    };

    //This will return all skills to the api ENTRY POINT
    public string FormatSkills(JobParseResult jpr)
    {
        jobParseResult = jpr;
        Console.WriteLine($"Extractor Outputted:\n----------------");
        Extractor();
        Console.WriteLine();
        Console.WriteLine($"Normalizer Outputted:\n----------------");
        Normalizer();
        Console.WriteLine();
        Console.WriteLine($"Check Alias Outputted:\n----------------");
        CheckAliases();
        Console.WriteLine();
        Console.WriteLine($"Honesty Gate Outputted:\n----------------");
        HonestyGate();
        Console.WriteLine();
        Console.WriteLine($"Catalog Reserver Outputted:\n----------------");
        CatalogReserver();
        return "";
    }
    private void Extractor()
    {
        //Testing data -> should just send the api data straight in

        foreach (var tech in jobParseResult.TechStack)
        {
            Console.WriteLine($"Name: {tech.Name}, Weight: {tech.Weight}");
        }
    }
    private void Normalizer()
    {
        foreach (var tech in jobParseResult.TechStack)
        {
            var name = tech.Name.ToLower().Trim();
            listingTechnologies.Add(name);
        }

        listingTechnologies.Add("next");
        listingTechnologies.Add("java se");
        listingTechnologies.Add("jenkins");
        printList(listingTechnologies);
    }
    private void CheckAliases()
    {
        var aliasesJson = File.ReadAllText("./Config/aliases.json");
        var aliases = JsonSerializer.Deserialize<Dictionary<string, string>>(aliasesJson)!;
        for (int i = 0; i < listingTechnologies.Count; i++)
        {
            foreach (var alias in aliases)
            {
                if (listingTechnologies[i] == alias.Key)
                {
                    listingTechnologies[i] = alias.Value;
                }
            }
        }
        printList(listingTechnologies);
    }
    private void HonestyGate()
    {
        var InventoryJson = File.ReadAllText("./Config/Inventory.json");
        var inventory = JsonSerializer.Deserialize<Inventory>(InventoryJson)!;
        //Need to iterate backwards as index could change if we remove something [A,B,C,D] removing B would set next index to D
        for (int i = listingTechnologies.Count - 1; i >= 0; i--)
        {
            if (!inventory.Claimed.Contains(listingTechnologies[i]))
            {
                listingTechnologies.RemoveAt(i);
            }
        }
        printList(listingTechnologies);
    }
    private void CatalogReserver()
    {
        var catalogJson = File.ReadAllText("./Config/catalog.json");
        var catalog = JsonSerializer.Deserialize<Catalog>(catalogJson)!;

        foreach (var section in catalog.Sections)
        {
            for (int i = 0; i < listingTechnologies.Count; i++)
            {
                foreach (var skill in section.Skills)
                {
                    if (string.Equals(listingTechnologies[i], skill.Id, StringComparison.OrdinalIgnoreCase))
                    {
                        listingTechnologies[i] = skill.Name;
                        Grouper(section.Key, listingTechnologies[i]);
                    }
                }
            }
        }
        printList(listingTechnologies);
        Console.WriteLine();
        Console.WriteLine($"Grouper Outputted:\n----------------");
        printDict(groupedSections);
    }

    private void Grouper(string sectionName, string technologyName)
    {
        Console.WriteLine($"Adding {technologyName} to {sectionName}");
        groupedSections[sectionName].Add(technologyName);
    }
    private void Ranker() { }
    private void Capper() { }
    private void Inserter() { }

    private void printList(List<string> list)
    {
        foreach (var tech in list)
        {
            Console.Write($"{tech},");
        }
        Console.WriteLine();
    }
    private void printDict(Dictionary<string, List<string>> dict) {
        foreach (var entry in dict)
        {
            Console.Write($"{entry.Key}: ");
            foreach (var item in entry.Value)
            {
                Console.Write($"{item},");
            }
            Console.WriteLine();
        }
    }
}