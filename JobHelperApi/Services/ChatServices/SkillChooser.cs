using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using JobHelperApi.Models;
using Microsoft.Office.Interop.Word;

namespace JobHelperApi.Services;



public class SkillChooser
{

    // private List<TechItem> techStack;
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

    //This will return all skills to the api ENTRY POINT
    public Dictionary<string, List<string>> ChooseSkills(List<TechItem> techStack)
    {
        List<ListingSkill> listingTechnologies = new List<ListingSkill>();

        Dictionary<string, List<ListingSkill>> groupedSections =
        new Dictionary<string, List<ListingSkill>>{
            {"frontend", new List<ListingSkill>()},
            {"backend", new List<ListingSkill>()},
            {"databases", new List<ListingSkill>()},
            {"tools-cloud", new List<ListingSkill>()}
        };

        Normalizer(techStack, listingTechnologies);
        CheckAliases(listingTechnologies);
        HonestyGate(listingTechnologies);
        CatalogReserver(listingTechnologies, groupedSections);
        Ranker(groupedSections);
        InventoryAdder(groupedSections);
        
        return Outputter(groupedSections);
    }
    public List<ListingSkill> CreateWeightedList(List<TechItem> techStack)
    {
        List<ListingSkill> listingTechnologies = new List<ListingSkill>();

        Normalizer(techStack, listingTechnologies);
        CheckAliases(listingTechnologies);
        HonestyGate(listingTechnologies);
        CatalogReserverList(listingTechnologies);
        RankerList(listingTechnologies);

        return listingTechnologies;
    }
    
    private void Normalizer(List<TechItem> techStack, List<ListingSkill> listingTechnologies)
    {
        foreach (var tech in techStack)
        {
            var name = tech.Name.ToLower().Trim();
            var listingSkill = new ListingSkill(name, tech.Weight);
            listingTechnologies.Add(listingSkill);
        }
    }
    private void CheckAliases(List<ListingSkill> listingTechnologies)
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
    }
    private void HonestyGate(List<ListingSkill> listingTechnologies)
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
    }
    private void CatalogReserver(List<ListingSkill> listingTechnologies, Dictionary<string, List<ListingSkill>> groupedSections)
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
                        Grouper(section.Key, listingTechnologies[i], groupedSections);
                    }
                }
            }
        }
    }

    private void CatalogReserverList(List<ListingSkill> listingTechnologies)
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

                    }
                }
            }
        }
    }
    private void Grouper(string sectionName, ListingSkill technologyName, Dictionary<string, List<ListingSkill>> groupedSections)
    {
        groupedSections[sectionName].Add(technologyName);
    }
    private void Ranker(Dictionary<string, List<ListingSkill>> groupedSections)
    {
        foreach (var section in groupedSections)
        {
            BubbleSort(section.Value);
        }
    }

    private void RankerList(List<ListingSkill> listingTechnologies)
    {
        BubbleSort(listingTechnologies);
    }

    private void InventoryAdder(Dictionary<string, List<ListingSkill>> groupedSections)
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
    }
    private Dictionary<string, List<string>> Outputter(Dictionary<string, List<ListingSkill>> groupedSections)
    {
        var dict = new Dictionary<string, List<string>>();

        foreach (var section in groupedSections)
        {
            dict.Add(section.Key, new List<string>());
            foreach (var value in section.Value)
            {
                dict[section.Key].Add(value.Name);
            }
        }
        return dict;
    }
    private void BubbleSort(List<ListingSkill> skills)
    {
        for (int i = 0; i < skills.Count - 1; i++)
        {
            for (int k = 0; k < skills.Count - i - 1; k++)
            {
                if (skills[k].Weight < skills[k + 1].Weight)
                {
                    Swap(skills, k, k + 1);
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
}