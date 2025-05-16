
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DEFAULT_TAGS = ["Feed", "Behavior", "Health", "Exercise"];

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const [customTag, setCustomTag] = useState("");
  
  // Handle predefined tag checkboxes
  const handleCheckboxChange = (tag: string, checked: boolean) => {
    if (checked) {
      onChange([...value, tag]);
    } else {
      onChange(value.filter(t => t !== tag));
    }
  };

  // Add custom tag
  const handleAddCustomTag = () => {
    if (customTag.trim() && !value.includes(customTag.trim())) {
      const newTags = [...value, customTag.trim()];
      onChange(newTags);
      setCustomTag("");
    }
  };

  // Remove tag (can remove both default and custom)
  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  // Handle Enter key in custom tag input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomTag();
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {DEFAULT_TAGS.map((tag) => (
          <div key={tag} className="flex items-center space-x-2">
            <Checkbox 
              id={`tag-${tag}`} 
              checked={value.includes(tag)}
              onCheckedChange={(checked) => handleCheckboxChange(tag, checked === true)}
            />
            <Label htmlFor={`tag-${tag}`}>{tag}</Label>
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input
            placeholder="Add a custom tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent"
            onClick={handleAddCustomTag}
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsInput;
