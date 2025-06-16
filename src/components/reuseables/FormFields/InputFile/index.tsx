import React, { useRef } from 'react';

import { useUploadFile } from '@/hooks/api/uploads';
import Spinner from '@/components/reuseables/Spinner';
import { TrashIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

function InputFile({
  label,
  fileUrl,
  fileName = '',
  onSuccess,
}: {
  label?: string;
  fileName?: string;
  fileUrl?: string;
  onSuccess: (params: { url: string }) => void;
}) {
  const { loading, onUploadFile } = useUploadFile();

  const handleUpload = async ({ event }: { event: React.ChangeEvent<HTMLInputElement> }) => {
    const files = event.target.files;
    try {
      if (files && files?.length > 0) {
        const _selectedFile = files[0];
        const fileSizeInMB = _selectedFile.size / (1024 * 1024);
        if (fileSizeInMB > 1) {
          alert('File size should be 1mb or less.');
          return;
        }

        await onUploadFile({
          file: _selectedFile,
          successCallback: (response) => {
            onSuccess?.({ url: response?.url || '' });
          },
          shouldCompressImage: true,
        });
      }
    } catch (error) {
    } finally {
    }
  };

  const fileInput = useRef(null);

  const onClick = (e: any) => {
    e?.preventDefault();
    fileInput?.current?.click();
  };

  const containerClassName = cn(
    'rounded-[8px] w-full h-[48px] flex bg-[#F3F3F3] px-[12px] items-center justify-between border-[1px] border-dotted border-[#838383]  ',
    fileUrl ? 'underline decoration-[#838383]' : ''
  );

  const removeFile = () => {
    onSuccess?.({ url: '' });
  };
  return (
    <>
      <input
        disabled={loading}
        ref={fileInput}
        type="file"
        className=" hidden"
        accept="image/*"
        onChange={(e: any) => {
          handleUpload({ event: e });
          e.target.value = null;
        }}
      />

      {fileUrl ? (
        <div className={containerClassName}>
          <a href={fileUrl} target="_blank">
            <span className="text-[#838383] text-[16px]">{'Tap to view ' + fileName}</span>
          </a>
          {loading ? (
            <Spinner />
          ) : (
            <button onClick={removeFile}>
              <TrashIcon className="w-5 h-5 text-red-800 darkremove:text-red-600" />
            </button>
          )}
        </div>
      ) : (
        <button onClick={onClick} className={containerClassName}>
          <span className="text-[#838383] text-[16px]">{label}</span>
          {loading ? (
            <Spinner />
          ) : (
            <img src="/icons/upload.svg" alt="Arrow Down Icon" className="w-5 h-5 outline-none border-none ml-auto" />
          )}
        </button>
      )}
    </>
  );
}

export default InputFile;
