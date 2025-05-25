
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import BuyerLayout from "@/components/buyer/BuyerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string | string[]; // Can be string or array
  mood?: string;
}

interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  notes?: string;
}

interface Animal {
  id: string;
  name: string;
  species: string;
  breed: string;
}

const BuyerViewUserPage = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        setUserProfile(profile);

        // Fetch animals
        const { data: animalsData } = await supabase
          .from('animals')
          .select('*')
          .eq('user_id', userId);

        setAnimals(animalsData || []);

        // Fetch journal entries
        const { data: journalsData } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false });

        setJournalEntries(journalsData || []);

        // Fetch weight entries
        const { data: weightsData } = await supabase
          .from('weight_entries')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false });

        setWeightEntries(weightsData || []);

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <BuyerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </BuyerLayout>
    );
  }

  if (!userProfile) {
    return (
      <BuyerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">User not found</div>
        </div>
      </BuyerLayout>
    );
  }

  const getTagsArray = (tags: string | string[]): string[] => {
    if (Array.isArray(tags)) {
      return tags;
    }
    if (typeof tags === 'string') {
      try {
        // Try to parse as JSON array
        const parsed = JSON.parse(tags);
        return Array.isArray(parsed) ? parsed : [tags];
      } catch {
        // If not JSON, split by comma or return as single item
        return tags.includes(',') ? tags.split(',').map(t => t.trim()) : [tags];
      }
    }
    return [];
  };

  return (
    <BuyerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {userProfile.first_name} {userProfile.last_name}
            </h1>
            <p className="text-muted-foreground">{userProfile.email}</p>
          </div>
        </div>

        <Tabs defaultValue="animals" className="w-full">
          <TabsList>
            <TabsTrigger value="animals">Animals ({animals.length})</TabsTrigger>
            <TabsTrigger value="journal">Journal ({journalEntries.length})</TabsTrigger>
            <TabsTrigger value="weights">Weights ({weightEntries.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="animals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {animals.map((animal) => (
                <Card key={animal.id}>
                  <CardHeader>
                    <CardTitle>{animal.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Species:</strong> {animal.species}</p>
                    <p><strong>Breed:</strong> {animal.breed}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="journal" className="space-y-4">
            {journalEntries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {entry.title}
                    <span className="text-sm text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{entry.content}</p>
                  {entry.tags && (
                    <div className="flex flex-wrap gap-1">
                      {getTagsArray(entry.tags).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="weights" className="space-y-4">
            {weightEntries.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{entry.weight} lbs</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    {entry.notes && (
                      <p className="text-sm">{entry.notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </BuyerLayout>
  );
};

export default BuyerViewUserPage;
