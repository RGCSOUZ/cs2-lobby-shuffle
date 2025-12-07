import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGame } from '@/context/GameContext';
import { Plus, Lock, FileText, Tag } from 'lucide-react';

interface CreateLobbyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateLobbyDialog = ({ open, onOpenChange }: CreateLobbyDialogProps) => {
  const { createLobby } = useGame();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});

  const validate = () => {
    const newErrors: { name?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Lobby name is required';
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    } else if (name.length > 30) {
      newErrors.name = 'Name must be less than 30 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      createLobby(name.trim(), description.trim() || undefined, password || undefined);
      setName('');
      setDescription('');
      setPassword('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setPassword('');
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Create Lobby</DialogTitle>
          <DialogDescription>
            Set up a new lobby for your squad. You'll be the host.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="lobby-name" className="font-display text-sm">
              LOBBY NAME *
            </Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="lobby-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter lobby name"
                className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
                maxLength={30}
              />
            </div>
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-display text-sm">
              DESCRIPTION <span className="text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your lobby..."
                className="pl-10 min-h-[80px] bg-secondary/50 border-border/50 focus:border-primary resize-none"
                maxLength={200}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-display text-sm">
              PASSWORD <span className="text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty for public lobby"
                className="pl-10 bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gaming" className="flex-1">
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
