import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Lock } from 'lucide-react';

interface JoinPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lobbyName: string;
  onSubmit: (password: string) => void;
}

export const JoinPasswordDialog = ({ 
  open, 
  onOpenChange, 
  lobbyName, 
  onSubmit 
}: JoinPasswordDialogProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
  };

  const handleClose = () => {
    setPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Protected Lobby
          </DialogTitle>
          <DialogDescription>
            Enter the password to join "{lobbyName}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="join-password" className="font-display text-sm">
              PASSWORD
            </Label>
            <Input
              id="join-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter lobby password"
              className="bg-secondary/50 border-border/50 focus:border-primary"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="default" className="flex-1">
              Join Lobby
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
