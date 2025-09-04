using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using JobHelperApi.Models;
using Microsoft.Office.Interop.Word;

namespace JobHelperApi.Services;



public class SkillFormatter
{

    private JobParseResult jobParseResult;
    public record CatalogSkill(
        [property: JsonPropertyName("id")] string Id,
        [property: JsonPropertyName("name")] string Name
    );

    public record ListingSkill(
        string Name,
        float Weight
    );

    public record CatalogEntry(
        [property: JsonPropertyName("key")] string Key,
        [property: JsonPropertyName("priority")] int Priority,
        [property: JsonPropertyName("skills")] List<CatalogSkill> Skills
    );

    public record Catalog(
        [property: JsonPropertyName("sections")] List<CatalogEntry> Sections
    );

    
    public record InventoryExtraItem(
    [property: JsonPropertyName("sectionName")] string SectionName,
    [property: JsonPropertyName("skills")] List<string> Skills
);
    public record InventoryExtras(
        [property: JsonPropertyName("sections")] List<InventoryExtraItem> Sections
    );
    public record Inventory(
        [property: JsonPropertyName("claimed")] List<string> Claimed
    );
    private List<ListingSkill> listingTechnologies = new List<ListingSkill>();

    private Dictionary<string, List<ListingSkill>> groupedSections =
    new Dictionary<string, List<ListingSkill>>{
        {"frontend", new List<ListingSkill>()},
        {"backend", new List<ListingSkill>()},
        {"databases", new List<ListingSkill>()},
        {"tools-cloud", new List<ListingSkill>()}
    };

    //This will return all skills to the api ENTRY POINT
    public string FormatSkills(JobParseResult jpr)
    {
        jobParseResult = jpr;
        Console.WriteLine();
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
        Console.WriteLine($"Ranker Outputted:\n----------------");
        Ranker();
        Console.WriteLine($"InventoryAdder Outputted:\n----------------");
        InventoryAdder();
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
            var listingSkill = new ListingSkill(name, tech.Weight);
            listingTechnologies.Add(listingSkill);
        }

        listingTechnologies.Add(new ListingSkill("next", 4));
        listingTechnologies.Add(new ListingSkill("java se", 7));
        listingTechnologies.Add(new ListingSkill("tailwind", 10));
        listingTechnologies.Add(new ListingSkill("jenkins", 1));
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
                if (listingTechnologies[i].Name == alias.Key)
                {
                    listingTechnologies[i] = new ListingSkill(alias.Value, listingTechnologies[i].Weight);
                }
            }
        }
        printList(listingTechnologies);
    }
    private void HonestyGate()
    {
        var InventoryJson = File.ReadAllText("./Config/userInventory.json");
        var inventory = JsonSerializer.Deserialize<Inventory>(InventoryJson)!;
        //Need to iterate backwards as index could change if we remove something [A,B,C,D] removing B would set next index to D
        for (int i = listingTechnologies.Count - 1; i >= 0; i--)
        {
            if (!inventory.Claimed.Contains(listingTechnologies[i].Name))
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
                foreach (var catalogSkill in section.Skills)
                {
                    if (string.Equals(listingTechnologies[i].Name, catalogSkill.Id, StringComparison.OrdinalIgnoreCase))
                    {
                        listingTechnologies[i] = new ListingSkill(catalogSkill.Name, listingTechnologies[i].Weight);
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

    private void Grouper(string sectionName, ListingSkill technologyName)
    {
        groupedSections[sectionName].Add(technologyName);
    }
    private void Ranker()
    {
        foreach (var section in groupedSections)
        {
            BubbleSort(section.Value);
        }
        printDict(groupedSections);
    }

    private void InventoryAdder()
    {
        var userExtrasJson = File.ReadAllText("./Config/userExtras.json");
        var userExtras = JsonSerializer.Deserialize<InventoryExtras>(userExtrasJson)!;

        foreach (var section in userExtras.Sections)
        {
            var currentSection = section.SectionName;
            foreach (var skill in section.Skills)
            {
                if (groupedSections[currentSection].Count >= 8) break;
                if (!groupedSections.Values.Any(list => list.Any(s => string.Equals(s.Name, skill, StringComparison.OrdinalIgnoreCase))))
                {
                    groupedSections[currentSection].Add(new ListingSkill(skill, 0));
                }
            }
        }
        printDict(groupedSections);
    }
    private void Outputter() { }
    private void BubbleSort(List<ListingSkill> skills)
    {
        for (int i = 0; i < skills.Count - 1; i++)
        {
            for (int k = 0; k < skills.Count - i - 1; k++)
            {
                if (skills[k].Weight < skills[k+1].Weight)
                {
                    Swap(skills, k, k+1);
                }
            }
        }
    }
    private void Swap(List<ListingSkill> skills, int indexA, int indexB)
    {
        var temp = skills[indexA];
        skills[indexA] = skills[indexB];
        skills[indexB] = temp;
    }
    private void printList(List<ListingSkill> list)
    {
        foreach (var listingSkill in list)
        {
            Console.Write($"[{listingSkill.Name}, {listingSkill.Weight}], ");
        }
        Console.WriteLine();
    }
    private void printDict(Dictionary<string, List<ListingSkill>> dict) {
        foreach (var entry in dict)
        {
            Console.Write($"{entry.Key}: ");
            foreach (var item in entry.Value)
            {
                Console.Write($"[{item.Name}, {item.Weight}], ");
            }
            Console.WriteLine();
        }
    }
}