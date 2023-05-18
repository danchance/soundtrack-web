import useAccessToken from '@/hooks/useAccessToken';
import styles from '@/styles/components/settings/upload_image.module.sass';
import { post } from '@/utils/fetch_wrapper';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import LoadingSpinner from '../loading_spinner';

type UploadImageProps = {
  imageType: 'profile' | 'banner';
  previewImage: string;
  setPreviewImage: Dispatch<SetStateAction<string>>;
};

type ImageUploadResponse = {
  picture: { status: string; message: string };
  newImage: string;
};

/**
 * Component for uploading a profile picture.
 * @param imageType - Type of image to upload, profile or banner
 * @param previewImage - Preview image to display initially.
 * @param setPreviewImage - Function to set the preview image.
 */
const UploadImage = ({
  imageType,
  previewImage,
  setPreviewImage
}: UploadImageProps) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { accessToken } = useAccessToken();

  /**
   * Uploads the image to the server.
   * When an image is uploading the uploading status is set to true to
   * display a loading spinner.
   * @param e - Event from the file input.
   */
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    setUploading(true);
    let formData = new FormData();
    formData.append('picture', files[0]);
    try {
      const endpoint = `users/${imageType}-picture`;
      const res = await post<ImageUploadResponse>(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/${endpoint}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setPreviewImage(res.newImage);
      setError(false);
    } catch (error) {
      setError(true);
    }
    setUploading(false);
  };

  return (
    <div className={styles['container']}>
      <div className={[styles['image-container'], styles[imageType]].join(' ')}>
        {previewImage !== '' && (
          <Image
            src={previewImage}
            alt="profile picture"
            fill
            className={styles['preview-image']}
          ></Image>
        )}
      </div>
      <form className={styles['upload-container']}>
        <input
          type="file"
          name="file-input"
          id={imageType}
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => uploadImage(e)}
          className={styles['file-input']}
        />
        <div className={styles['instructions']}>
          <p>{`Choose an image to use as your ${
            imageType === 'profile' ? 'profile picture' : 'profile banner'
          }`}</p>
          <p>Images must be .png or .jpg format</p>
          <div className={styles['btn-wrapper']}>
            {uploading ? (
              <button
                className={[styles['btn'], styles['uploading']].join(' ')}
              >
                <LoadingSpinner size={1.25} weight={3} />
              </button>
            ) : (
              <label
                htmlFor={imageType}
                className={[styles['input-label'], styles['btn']].join(' ')}
              >
                Upload Image
              </label>
            )}
          </div>
          {error && (
            <p className={styles['error-message']}>
              Something went wrong trying to upload your image.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadImage;
