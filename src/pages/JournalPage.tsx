
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchIcon, FilterIcon } from "lucide-react";
import JournalEntry from "@/components/JournalEntry";
import AddJournalEntryForm from "@/components/AddJournalEntryForm";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { Badge } from "@/components/ui/badge";

const JournalPage = () => {
  const { animals, journals, userSubscription } = useAppContext();
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract unique tags from all journals
  const allTags = Array.from(
    new Set(
      journals.flatMap(journal => journal.tags || [])
    )
  );
  
  // Filter journals based on search, animal, and tags
  const filteredJournals = journals.filter(journal => {
    const matchesSearch = searchTerm === "" || 
      journal.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAnimal = selectedAnimalId === "" || 
      journal.animalId === selectedAnimalId;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => journal.tags?.includes(tag));
    
    return matchesSearch && matchesAnimal && matchesTags;
  });
  
  // Sort journals by date (newest first)
  const sortedJournals = [...filteredJournals].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const showAdvancedJournaling = userSubscription.level === "pro" || userSubscription.level === "elite";
  
  const handleUpgrade = () => {
    // Redirect to subscription page
    window.location.href = '/subscription';
  };
  
  return (
    <MainLayout title="Journal Entries">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <select
            value={selectedAnimalId}
            onChange={(e) => setSelectedAnimalId(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Animals</option>
            {animals.map(animal => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
        </div>
        
        <Button onClick={() => setIsAddEntryOpen(true)}>
          New Journal Entry
        </Button>
      </div>
      
      {allTags.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2 gap-2">
            <FilterIcon className="h-4 w-4" />
            <h3 className="font-medium">Filter by tags:</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {!showAdvancedJournaling && (
        <PremiumFeatureBanner
          title="Advanced Journaling"
          description="Upgrade to Pro to access advanced journaling features including AI analysis, automatic tagging, and mood tracking insights."
          requiredLevel="pro"
          onUpgrade={handleUpgrade}
          className="mb-6"
        />
      )}
      
      <div className="space-y-6">
        {sortedJournals.length > 0 ? (
          sortedJournals.map(entry => {
            const animal = animals.find(a => a.id === entry.animalId);
            return (
              <JournalEntry 
                key={entry.id} 
                entry={entry}
                animalName={animal?.name || "Unknown"}
              />
            );
          })
        ) : (
          <div className="text-center py-12 border rounded-md border-dashed">
            {searchTerm || selectedAnimalId || selectedTags.length > 0 ? (
              <p className="text-muted-foreground mb-4">No journal entries match your filters.</p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">No journal entries found. Start recording your observations.</p>
                <Button onClick={() => setIsAddEntryOpen(true)}>Create Your First Entry</Button>
              </>
            )}
          </div>
        )}
      </div>
      
      <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>New Journal Entry</DialogTitle>
          </DialogHeader>
          <AddJournalEntryForm 
            onSuccess={() => setIsAddEntryOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default JournalPage;
