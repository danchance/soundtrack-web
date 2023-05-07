import useAccessToken from '@/hooks/useAccessToken';
import styles from '@/styles/components/settings/upload_image.module.sass';
import { post } from '@/utils/fetch_wrapper';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

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
  const { accessToken } = useAccessToken();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
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
    } catch (error) {
      console.log(error);
    }
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
          <label htmlFor={imageType} className={styles['input-label']}>
            Upload Image
          </label>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;
