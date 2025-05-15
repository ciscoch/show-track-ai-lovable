
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, FileTextIcon, TagIcon, UploadIcon } from "lucide-react";

// Mock data structure matching the existing insights structure
import { getJudgeInsightsForSpecies } from "../JudgeInsightsCard";

// Species options
const speciesOptions = [
  "Beef Cattle",
  "Swine",
  "Sheep",
  "Goats",
  "Horses"
];

// Form validation schemas
const criteriaSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  importance: z.enum(["High", "Medium", "Low"])
});

const trendSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tags: z.string().optional()
});

const tipSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

const documentSchema = z.object({
  title: z.string().min(3, "Document title is required"),
  url: z.string().url("Must be a valid URL"),
  source: z.string().min(3, "Source is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional()
});

const reviewSchema = z.object({
  nextReviewDate: z.string().min(1, "Next review date is required"),
  reviewNotes: z.string().optional(),
  assignedTo: z.string().optional()
});

interface JudgeInsightsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const JudgeInsightsManager = ({ isOpen, onClose }: JudgeInsightsManagerProps) => {
  const [selectedSpecies, setSelectedSpecies] = useState("Beef Cattle");
  const [activeTab, setActiveTab] = useState("criteria");
  const [currentData, setCurrentData] = useState(() => getJudgeInsightsForSpecies(selectedSpecies));
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  
  // Forms
  const criteriaForm = useForm({
    resolver: zodResolver(criteriaSchema),
    defaultValues: {
      name: "",
      description: "",
      importance: "Medium" as "High" | "Medium" | "Low"
    }
  });
  
  const trendForm = useForm({
    resolver: zodResolver(trendSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: ""
    }
  });
  
  const tipForm = useForm({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });
  
  const documentForm = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      url: "",
      source: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    }
  });
  
  const reviewForm = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      reviewNotes: "",
      assignedTo: ""
    }
  });
  
  // Change species handler
  const handleSpeciesChange = (species: string) => {
    setSelectedSpecies(species);
    setCurrentData(getJudgeInsightsForSpecies(species));
    setIsEditMode(false);
    setEditIndex(-1);
    resetForms();
  };
  
  // Reset all forms
  const resetForms = () => {
    criteriaForm.reset();
    trendForm.reset();
    tipForm.reset();
    documentForm.reset();
    reviewForm.reset();
  };
  
  // Edit handlers
  const handleEditCriteria = (index: number) => {
    const criteria = currentData.criteria[index];
    criteriaForm.reset({
      name: criteria.name,
      description: criteria.description,
      importance: criteria.importance as "High" | "Medium" | "Low"
    });
    setIsEditMode(true);
    setEditIndex(index);
  };
  
  const handleEditTrend = (index: number) => {
    const trend = currentData.trends[index];
    trendForm.reset({
      title: trend.title,
      description: trend.description,
      tags: "" // Tags would be populated if stored in the actual data
    });
    setIsEditMode(true);
    setEditIndex(index);
  };
  
  const handleEditTip = (index: number) => {
    const tip = currentData.preparationTips[index];
    tipForm.reset({
      title: tip.title,
      description: tip.description
    });
    setIsEditMode(true);
    setEditIndex(index);
  };
  
  // Submit handlers
  const onSubmitCriteria = (data: z.infer<typeof criteriaSchema>) => {
    const newCriteria = [...currentData.criteria];
    if (isEditMode && editIndex >= 0) {
      newCriteria[editIndex] = data;
    } else {
      newCriteria.push(data);
    }
    setCurrentData({
      ...currentData,
      criteria: newCriteria
    });
    criteriaForm.reset();
    setIsEditMode(false);
    setEditIndex(-1);
  };
  
  const onSubmitTrend = (data: z.infer<typeof trendSchema>) => {
    const { tags, ...trendData } = data;
    const newTrends = [...currentData.trends];
    if (isEditMode && editIndex >= 0) {
      newTrends[editIndex] = trendData;
    } else {
      newTrends.push(trendData);
    }
    setCurrentData({
      ...currentData,
      trends: newTrends
    });
    trendForm.reset();
    setIsEditMode(false);
    setEditIndex(-1);
  };
  
  const onSubmitTip = (data: z.infer<typeof tipSchema>) => {
    const newTips = [...currentData.preparationTips];
    if (isEditMode && editIndex >= 0) {
      newTips[editIndex] = data;
    } else {
      newTips.push(data);
    }
    setCurrentData({
      ...currentData,
      preparationTips: newTips
    });
    tipForm.reset();
    setIsEditMode(false);
    setEditIndex(-1);
  };
  
  const onSubmitDocument = (data: z.infer<typeof documentSchema>) => {
    // In a real implementation, this would store documents related to the research
    console.log("Document submitted:", data);
    documentForm.reset();
  };
  
  const onSubmitReview = (data: z.infer<typeof reviewSchema>) => {
    // In a real implementation, this would schedule reviews or refreshes
    console.log("Review schedule submitted:", data);
    reviewForm.reset();
  };
  
  // Delete handlers
  const handleDeleteCriteria = (index: number) => {
    const newCriteria = [...currentData.criteria];
    newCriteria.splice(index, 1);
    setCurrentData({
      ...currentData,
      criteria: newCriteria
    });
  };
  
  const handleDeleteTrend = (index: number) => {
    const newTrends = [...currentData.trends];
    newTrends.splice(index, 1);
    setCurrentData({
      ...currentData,
      trends: newTrends
    });
  };
  
  const handleDeleteTip = (index: number) => {
    const newTips = [...currentData.preparationTips];
    newTips.splice(index, 1);
    setCurrentData({
      ...currentData,
      preparationTips: newTips
    });
  };
  
  // Save changes (would connect to backend in real implementation)
  const handleSaveChanges = () => {
    console.log("Saving changes for", selectedSpecies, currentData);
    // In a real implementation, this would send data to an API endpoint
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Judge Insights Research Manager</DialogTitle>
          <DialogDescription>
            Add, edit, or remove judge insights and research for premium content.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          {/* Species Selector */}
          <div className="flex flex-wrap gap-2">
            {speciesOptions.map((species) => (
              <Button
                key={species}
                variant={selectedSpecies === species ? "default" : "outline"}
                onClick={() => handleSpeciesChange(species)}
                className="text-sm"
              >
                {species}
              </Button>
            ))}
          </div>
          
          {/* Content Management Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="criteria">Judging Criteria</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="tips">Preparation Tips</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="schedule">Review Schedule</TabsTrigger>
            </TabsList>
            
            {/* Criteria Tab */}
            <TabsContent value="criteria" className="space-y-4">
              <Form {...criteriaForm}>
                <form onSubmit={criteriaForm.handleSubmit(onSubmitCriteria)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={criteriaForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Criterion Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Muscle Expression" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={criteriaForm.control}
                      name="importance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Importance</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={criteriaForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what judges look for in this criterion" 
                            {...field}
                            className="min-h-[100px]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        criteriaForm.reset();
                        setIsEditMode(false);
                        setEditIndex(-1);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {isEditMode ? "Update" : "Add"} Criterion
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Judging Criteria</CardTitle>
                  <CardDescription>
                    {currentData.criteria.length} criteria for {selectedSpecies}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Criterion</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Importance</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.criteria.map((criterion, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{criterion.name}</TableCell>
                          <TableCell>{criterion.description}</TableCell>
                          <TableCell>
                            <Badge className={
                              criterion.importance === 'High' ? 'bg-primary' : 
                              criterion.importance === 'Medium' ? 'bg-accent' : 
                              'bg-muted'
                            }>
                              {criterion.importance}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditCriteria(index)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => handleDeleteCriteria(index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Trends Tab */}
            <TabsContent value="trends" className="space-y-4">
              <Form {...trendForm}>
                <form onSubmit={trendForm.handleSubmit(onSubmitTrend)} className="space-y-4">
                  <FormField
                    control={trendForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trend Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Focus on Functionality" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={trendForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the judging trend in detail" 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={trendForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., structure, muscle, balance (comma separated)" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Add comma-separated tags to categorize this trend
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        trendForm.reset();
                        setIsEditMode(false);
                        setEditIndex(-1);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {isEditMode ? "Update" : "Add"} Trend
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Trends</CardTitle>
                  <CardDescription>
                    {currentData.trends.length} trends for {selectedSpecies}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentData.trends.map((trend, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{trend.title}</h4>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditTrend(index)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive"
                              onClick={() => handleDeleteTrend(index)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline" className="flex gap-1 items-center">
                            <TagIcon className="h-3 w-3" />
                            <span>Add tags</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preparation Tips Tab */}
            <TabsContent value="tips" className="space-y-4">
              <Form {...tipForm}>
                <form onSubmit={tipForm.handleSubmit(onSubmitTip)} className="space-y-4">
                  <FormField
                    control={tipForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tip Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Strategic Conditioning" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={tipForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide detailed preparation advice based on judge research" 
                            {...field} 
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        tipForm.reset();
                        setIsEditMode(false);
                        setEditIndex(-1);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {isEditMode ? "Update" : "Add"} Tip
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Preparation Tips</CardTitle>
                  <CardDescription>
                    {currentData.preparationTips.length} preparation tips for {selectedSpecies}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tip</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData.preparationTips.map((tip, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{tip.title}</TableCell>
                          <TableCell>{tip.description}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditTip(index)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive"
                                onClick={() => handleDeleteTip(index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-4">
              <Form {...documentForm}>
                <form onSubmit={documentForm.handleSubmit(onSubmitDocument)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={documentForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Interview with Judge Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={documentForm.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={documentForm.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL or File Path</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input 
                              placeholder="e.g., https://example.com/document.pdf" 
                              {...field}
                              className="flex-1" 
                            />
                            <Button type="button" variant="outline" className="flex items-center gap-1">
                              <UploadIcon className="h-4 w-4" />
                              Upload
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Enter a URL or upload a document file
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={documentForm.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., National Livestock Show Judge Panel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={documentForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Optional notes about this document" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-1">
                      <FileTextIcon className="h-4 w-4" />
                      Add Document
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Card>
                <CardHeader>
                  <CardTitle>Research Documents</CardTitle>
                  <CardDescription>
                    Upload and manage reference documents for research
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-medium">No documents yet</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Add documents using the form above
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Review Schedule Tab */}
            <TabsContent value="schedule" className="space-y-4">
              <Form {...reviewForm}>
                <form onSubmit={reviewForm.handleSubmit(onSubmitReview)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={reviewForm.control}
                      name="nextReviewDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Next Review Date</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                              <Input type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Schedule when this research should be reviewed again
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={reviewForm.control}
                      name="assignedTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assigned To</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., content@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email of the person responsible for the review
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={reviewForm.control}
                    name="reviewNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Add notes about what should be reviewed" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      Schedule Review
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Reviews</CardTitle>
                  <CardDescription>
                    Upcoming review cycles for {selectedSpecies} research
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md">
                    <div className="text-center">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-medium">No reviews scheduled</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Schedule regular content reviews using the form above
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="flex justify-between items-center mt-6">
          <div>
            <p className="text-sm text-muted-foreground">
              Currently managing content for <strong>{selectedSpecies}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSaveChanges}>Save All Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JudgeInsightsManager;
