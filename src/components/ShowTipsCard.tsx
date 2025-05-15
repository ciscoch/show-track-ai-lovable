
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Animal } from "@/types/models";

type ShowTip = {
  id: string;
  title: string;
  content: string;
  category: string;
};

type ShowTipsCardProps = {
  animal: Animal;
};

// Mock data for show tips
const mockShowTips: Record<string, ShowTip[]> = {
  'goat': [
    {
      id: 'gt1',
      title: 'Proper Bracing Technique',
      content: 'When bracing your goat, ensure their front legs are squarely under them with the back legs set slightly back. Apply gentle pressure to the chest to encourage them to push against you, showcasing muscle tone.',
      category: 'showmanship'
    },
    {
      id: 'gt2',
      title: 'Pre-Show Grooming Tips',
      content: 'Trim hooves 1-2 weeks before show. Wash with livestock shampoo 2-3 days prior. Use a medium bristle brush to remove loose hair. For market goats, shear the body 1/2 inch or less within a week of the show.',
      category: 'preparation'
    },
    {
      id: 'gt3',
      title: 'Showmanship Attire',
      content: 'Dress professionally in a button-up shirt, jeans, and boots. Avoid flashy accessories that could distract from your animal. Remember, the judge is evaluating both you and your goat as a team.',
      category: 'presentation'
    },
    {
      id: 'gt4',
      title: 'Ring Etiquette',
      content: 'Always keep your eyes on the judge while maintaining control of your animal. Stay 4-5 feet away from other exhibitors. If the judge approaches, stop and set up your animal. Answer questions confidently and concisely.',
      category: 'handling'
    }
  ],
  'cattle': [
    {
      id: 'ct1',
      title: 'Halter Training',
      content: 'Start halter training early. Begin with short sessions in a small pen, gradually increasing time and space. Reward good behavior with treats and positive reinforcement.',
      category: 'preparation'
    },
    {
      id: 'ct2',
      title: 'Setting Up Your Steer',
      content: 'Place the front feet squarely under the shoulders. Position the rear legs with one slightly behind the other to create the appearance of a level topline and maximize muscle definition.',
      category: 'showmanship'
    }
  ],
  'pig': [
    {
      id: 'pt1',
      title: 'Using the Show Stick',
      content: 'Keep your show stick in your right hand when moving. Use gentle taps to guide your pig around the ring. Never use excessive force - judges will notice rough handling.',
      category: 'handling'
    },
    {
      id: 'pt2',
      title: 'Ring Positioning',
      content: 'Position your pig so the judge can see it at all times. Stay on the opposite side from the judge to provide clear visibility, but never directly between the judge and your animal.',
      category: 'presentation'
    }
  ],
  'sheep': [
    {
      id: 'st1',
      title: 'Bracing Techniques',
      content: "When bracing, position yourself in front of the lamb. Firmly press on the lamb's chest while keeping its head up, which showcases muscle tone. Ensure all four legs are squarely beneath the animal.",
      category: 'showmanship'
    },
    {
      id: 'st2',
      title: 'Wool Preparation',
      content: 'For market lambs, shear 2-3 weeks before the show to allow proper regrowth. Use a fine blade for a clean, smooth appearance. Pay extra attention to the legs and belly for a balanced look.',
      category: 'preparation'
    }
  ]
};

const ShowTipsCard = ({ animal }: ShowTipsCardProps) => {
  // Get tips for this animal's species, or fallback to goat if not found
  const tips = mockShowTips[animal.species] || mockShowTips['goat'];
  
  // Group tips by category
  const categories = Array.from(new Set(tips.map(tip => tip.category)));
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Showmanship Tips</CardTitle>
        <CardDescription>
          Expert advice to help you in the show ring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={categories[0]}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              {tips
                .filter(tip => tip.category === category)
                .map(tip => (
                  <div key={tip.id} className="border rounded-md p-4 hover:border-primary transition-colors">
                    <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                    <p>{tip.content}</p>
                  </div>
                ))
              }
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShowTipsCard;
