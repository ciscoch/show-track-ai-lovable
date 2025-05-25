
import React, { useState } from "react";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import JournalEntry from "@/components/JournalEntry";
import TagsInput from "@/components/TagsInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { navigate } from "@/platform/navigation";

const JournalPage = () => {
  const { journalEntries, animals, user } = useSupabaseApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const transformedUser = user ? {
    ...user,
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : null;

  // Get all unique tags from journal entries
  const allTags = Array.from(
    new Set(
      journalEntries.flatMap(entry => 
        typeof entry.tags === 'string' 
          ? entry.tags.split(',').filter(tag => tag.trim())
          : (entry.tags || [])
      )
    )
  );

  // Filter journal entries based on search criteria
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = searchTerm === "" || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAnimal = selectedAnimalId === "" || entry.animal_id === selectedAnimalId;
    
    const entryTags = typeof entry.tags === 'string' 
      ? entry.tags.split(',').filter(tag => tag.trim())
      : (entry.tags || []);
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => entryTags.includes(tag));
    
    return matchesSearch && matchesAnimal && matchesTags;
  });

  // Sort by date (newest first)
  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAddEntry = () => {
    navigate('/add-journal-entry');
  };

  return (
    <MainLayout title="Journal" user={transformedUser}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Journal</h1>
            <p className="text-gray-600">Record your observations and thoughts</p>
          </div>
          <Button onClick={handleAddEntry} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Search and filter your journal entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="search"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="animal-filter">Animal</Label>
                <Select value={selectedAnimalId} onValueChange={setSelectedAnimalId}>
                  <SelectTrigger id="animal-filter">
                    <SelectValue placeholder="All animals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All animals</SelectItem>
                    {animals.map((animal) => (
                      <SelectItem key={animal.id} value={animal.id}>
                        {animal.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="tags">Filter by Tags</Label>
              <TagsInput
                value={selectedTags}
                onChange={setSelectedTags}
                suggestions={allTags}
                placeholder="Filter by tags..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Journal Entries */}
        <div className="space-y-4">
          {sortedEntries.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">No journal entries found matching your criteria.</p>
                <Button onClick={handleAddEntry} className="mt-4">
                  Add Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            sortedEntries.map((entry) => {
              const animal = animals.find(a => a.id === entry.animal_id);
              return (
                <JournalEntry
                  key={entry.id}
                  entry={{
                    ...entry,
                    animalId: entry.animal_id,
                    tags: typeof entry.tags === 'string' 
                      ? entry.tags.split(',').filter(tag => tag.trim())
                      : (entry.tags || []),
                    mood: (entry.mood as "positive" | "neutral" | "negative") || "neutral"
                  }}
                  animalName={animal?.name || "Unknown Animal"}
                />
              );
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default JournalPage;
