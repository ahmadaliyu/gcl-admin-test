import Button from '@/components/reuseables/Button';
import { Dialog } from '@/components/reuseables/Dialog';

const DeleteAccountDialogContent = ({
  onClose,
  open = false,
}: {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  open?: boolean;
}) => {
  if (!open) return;

  return (
    <Dialog open={open}>
      <section className="w-full max-w-[435px] flex flex-col bottom-0 overflow-y-auto bg-white rounded-3xl">
        <div className="p-10">
          <div>
            <div className="flex justify-center">
              <img src="/icons/InfoCircleIcon.svg" alt="Info" />
            </div>
            <div className="mt-8 text-center">
              <h1 className="font-gorditta text-[#111111] text-2xl font-medium">Delete Account</h1>
              <div className="mt-2">
                <div className="text-[#4e4e4e] text-base font-normal  ">
                  Are you sure you want to permanently delete your account?
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8 gap-6 w-full">
              <div className="flex-1">
                <Button
                  id="cancelButton"
                  disabled={false}
                  type="button"
                  variant="outlined"
                  title="Cancel"
                  fullWidth
                  onClick={onClose}
                />
              </div>
              <div className="flex-1">
                <Button id="deleteButton" disabled={false} type="button" variant="dark" title="Delete" fullWidth />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Dialog>
  );
};
export default DeleteAccountDialogContent;
