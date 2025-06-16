import React from 'react';
import Button from '@/components/reuseables/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const Dialog = ({ open, children }: { open: boolean; children: React.ReactNode }) => {
  if (!open) return null;

  return (
    <div
      className={`${
        open ? 'bg-[rgba(0,0,0,0.4)] fixed inset-0 overflow-auto z-[700] flex items-center justify-center' : ''
      }`}
    >
      {children}
    </div>
  );
};

export const ConfirmDialog = ({
  open,
  onContinue = () => null,
  onCancel = () => null,
  loading,
  title = 'Are you absolutely sure?',
  description = 'his action cannot be undone. This will permanently delete your account and remove your data from our servers.',
}: {
  open?: boolean;
  onContinue?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onCancel} disabled={loading} title="Cancel" variant="outlined" />
          <Button onClick={onContinue} disabled={loading} loading={loading} title="Confirm" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
