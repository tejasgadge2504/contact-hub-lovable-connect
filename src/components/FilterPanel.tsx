
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TAG_OPTIONS } from '@/types/contact';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  sortBy: 'name' | 'created_at';
  onSortChange: (sort: 'name' | 'created_at') => void;
}

export const FilterPanel = ({ selectedTags, onTagsChange, sortBy, onSortChange }: FilterPanelProps) => {
  const handleTagChange = (tag: string, checked: boolean) => {
    if (checked) {
      onTagsChange([...selectedTags, tag]);
    } else {
      onTagsChange(selectedTags.filter(t => t !== tag));
    }
  };

  const clearFilters = () => {
    onTagsChange([]);
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Sort */}
      <Select value={sortBy} onValueChange={(value: 'name' | 'created_at') => onSortChange(value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="created_at">Date Added</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter by Tags */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            Filter
            {selectedTags.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {selectedTags.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filter by Tags</h4>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-1 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              {TAG_OPTIONS.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${tag}`}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                  />
                  <Label 
                    htmlFor={`filter-${tag}`} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
