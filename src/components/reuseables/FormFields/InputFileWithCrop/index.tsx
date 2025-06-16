'use client';
import React, { useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Slider } from '@/components/ui/slider';

import WButton from '@/components/reuseables/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useUploadFile } from '@/hooks/api/uploads';

import { getCroppedImg, readFile } from './components';
import Spinner from '../../Spinner';
import { cn } from '@/lib/utils';
import {
  ArrowBottomLeftIcon,
  ArrowLeftIcon,
  ArrowTopLeftIcon,
  RotateCounterClockwiseIcon,
  TrashIcon,
  ViewGridIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@radix-ui/react-icons';

const InputFileWithCrop = ({
  fileUrl,
  fileName,
  label,
  aspect = 305 / 198,
  onSuccess,
  cropShape = 'rect',
  showRotateControls = false,
}: {
  fileUrl?: string;
  fileName?: string;
  label?: string;
  aspect?: number;
  onSuccess: (params: { url: string }) => void;
  cropShape?: 'rect' | 'round';
  showRotateControls?: boolean;
}) => {
  const containerClassName = cn(
    'rounded-[8px] w-full h-[48px] flex bg-[#F3F3F3] px-[12px] items-center justify-between border-[1px] border-dotted border-[#838383]  ',
    fileUrl ? 'underline decoration-[#838383]' : ''
  );

  const [imageSrc, setImageSrc] = useState('');
  const { loading, onUploadFile } = useUploadFile();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const fileInput = useRef(null);
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  const [openDialog, setOpenDialog] = React.useState(false);

  const reset = () => {
    setCroppedImage(null);
    setImageSrc('');
  };
  const close = () => {
    setOpenDialog(false);
    reset();
  };
  useEffect(() => {
    if (openDialog === false) {
    }
  }, [openDialog]);

  const [gettingCropped, showgettingCropped] = React.useState(false);
  const [preview, showPreview] = React.useState(false);
  const showCroppedImage = async () => {
    if (preview) {
      showPreview(false);
    } else {
      try {
        showgettingCropped(true);
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
        setCroppedImage(croppedImage);
        showPreview(true);
      } catch (e) {
      } finally {
        showgettingCropped(false);
      }
    }
  };

  const onApply = async () => {
    try {
      showgettingCropped(true);

      const croppedImage: any = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      setCroppedImage(croppedImage);

      onUploadFile({
        use_blob_url: true,
        blob_props: {
          blob_url: croppedImage || '',
        },
        successCallback: ({ url }) => {
          onSuccess?.({ url: url || '' });
          close();
        },
      });
    } catch (e) {
    } finally {
      showgettingCropped(false);
    }
  };

  const removeFile = () => {
    onSuccess?.({ url: '' });
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent hideCloseIcon className="sm:max-w-[625px] py-[15px] px-[0px] ">
          <DialogHeader className=" flex flex-row items-start w-full justify-between">
            <div className="items-start px-[10px] justify-between w-full flex flex-row m-0 p-0">
              <div className="flex gap-[5px] items-center">
                <button type="button" onClick={close}>
                  <ArrowLeftIcon />
                </button>
                <DialogTitle>Edit media</DialogTitle>
              </div>

              <div className="items-start  flex flex-row mt-[-10px]">
                {imageSrc ? (
                  <>
                    <WButton
                      type="button"
                      title="Reset"
                      height="38px"
                      variant="outlined-light"
                      onClick={(e: any) => {
                        reset();
                      }}
                      disabled={loading || gettingCropped}
                    />

                    <WButton
                      loading={loading}
                      disabled={loading || gettingCropped}
                      onClick={(e: any) => {
                        onApply();
                      }}
                      title="Apply"
                      height="38px"
                      variant="dark"
                    />
                  </>
                ) : null}
              </div>
            </div>
          </DialogHeader>

          <input
            disabled={loading}
            ref={fileInput}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onFileChange}
          />
          {!imageSrc ? (
            <div className="py-[40px] ">
              <button
                onClick={(e) => {
                  e?.preventDefault();
                  fileInput?.current?.click();
                }}
                className="w-full max-w-[200px] flex items-center justify-center py-2 rounded-md px-3 mx-auto border-dashed border-[1px] border-gray-400"
              >
                <span className="text-[12px]">Choose file</span>
                <img
                  src="/icons/upload.svg"
                  alt="Arrow Down Icon"
                  className="w-3 h-3 outline-none border-none ml-auto"
                />
              </button>
            </div>
          ) : (
            <>
              <div className="w-full h-[400px] relative bg-gray-300 flex items-center justify-center">
                <button
                  type="button"
                  className="absolute bottom-[10px] text-white right-[10px] z-10"
                  onClick={showCroppedImage}
                >
                  <ViewGridIcon />
                </button>
                {preview ? (
                  <>
                    <img src={croppedImage || ''} alt="croppedImage" />
                  </>
                ) : (
                  <>
                    <Cropper
                      cropShape={cropShape}
                      image={imageSrc}
                      crop={crop}
                      rotation={rotation}
                      zoom={zoom}
                      aspect={aspect}
                      showGrid
                      onCropChange={setCrop}
                      onRotationChange={setRotation}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </>
                )}
              </div>
            </>
          )}

          <DialogFooter className="px-[10px]">
            {!imageSrc ? null : (
              <>
                <div className="flex w-full gap-[10px]">
                  <ZoomInIcon className="size-[20px]" />
                  <Slider
                    defaultValue={[2]}
                    min={1}
                    max={3}
                    step={0.05}
                    value={[zoom]}
                    onValueChange={(x) => {
                      setZoom(x[0]);
                    }}
                  />
                  <ZoomOutIcon className="size-[20px]" />
                </div>

                {showRotateControls ? (
                  <div className="flex w-full gap-[10px]">
                    <RotateCounterClockwiseIcon className="size-[20px]" />
                    <Slider
                      defaultValue={[0]}
                      min={0}
                      max={360}
                      step={0.05}
                      value={[rotation]}
                      onValueChange={(x) => {
                        setRotation(x[0]);
                      }}
                    />
                    <RotateCounterClockwiseIcon className="size-[20px] rotate-90" />
                  </div>
                ) : null}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {fileUrl ? (
        <div className={containerClassName}>
          <a href={fileUrl} target="_blank">
            <span className="text-[#838383] text-[16px]">{'Tap to view ' + fileName}</span>
          </a>
          {loading ? (
            <Spinner />
          ) : (
            <button type="button" onClick={removeFile} type="button">
              <TrashIcon className="w-5 h-5 text-red-800 darkremove:text-red-600" />
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClickCapture={() => setOpenDialog(true)} className={containerClassName}>
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
};

export default InputFileWithCrop;
