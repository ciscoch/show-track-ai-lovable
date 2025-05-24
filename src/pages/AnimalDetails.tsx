
return (
  <div className="container max-w-7xl mx-auto py-8 px-4 space-y-6">
    {/* Animal Profile Header */}
    <AnimalHeader animal={animal} />

    {/* Tabs moved up right below the header */}
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 lg:w-auto lg:inline-flex mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="weights">Weights</TabsTrigger>
        <TabsTrigger value="journal">Journal</TabsTrigger>
        <TabsTrigger value="expenses">Expenses</TabsTrigger>
        <TabsTrigger value="composition">Body Analysis</TabsTrigger>
        <TabsTrigger value="showmanship">Showmanship</TabsTrigger>
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="overview">
        <OverviewTab 
          animal={animal} 
          weights={weights} 
          animalJournals={animalJournals}
          targetWeight={targetWeight}
        />
      </TabsContent>

      <TabsContent value="weights">
        <WeightHistoryTab 
          weights={weights} 
          animalId={animal.id}
          targetWeight={targetWeight} 
        />
      </TabsContent>

      <TabsContent value="journal">
        <JournalEntriesTab animalJournals={animalJournals} animalId={animal.id} />
      </TabsContent>

      <TabsContent value="expenses">
        <ExpensesTab expenses={expenses} animalId={animal.id} />
      </TabsContent>

      <TabsContent value="composition">
        <BodyCompositionTab animal={animal} />
      </TabsContent>

      <TabsContent value="showmanship">
        <ShowmanshipTab animal={animal} />
      </TabsContent>
    </Tabs>

    {/* Moved calendar below content to reduce vertical whitespace */}
    <div className="flex justify-end pt-4">
      <AnimalCalendar />
    </div>
  </div>
);

