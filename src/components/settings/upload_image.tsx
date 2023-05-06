import useAccessToken from '@/hooks/useAccessToken';
import styles from '@/styles/components/settings/upload_image.module.sass';
import { post } from '@/utils/fetch_wrapper';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type UploadImageProps = {
  text: string;
  previewImage: string;
  setPreviewImage: Dispatch<SetStateAction<string>>;
};

type ImageUploadResponse = {
  picture: { status: string; message: string };
  newProfilePicture: string;
};

/**
 * Component for uploading a profile picture.
 * @param text - Text to display above the upload button.
 * @param previewImage - Preview image to display initially.
 * @param setPreviewImage - Function to set the preview image.
 */
const UploadProfilePicture = ({
  text,
  previewImage,
  setPreviewImage
}: UploadImageProps) => {
  const { accessToken } = useAccessToken();
  console.log(previewImage);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    let formData = new FormData();
    formData.append('picture', files[0]);
    try {
      const res = await post<ImageUploadResponse>(
        `${process.env.NEXT_PUBLIC_SOUNDTRACK_API}/users/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log(res);
      setPreviewImage(res.newProfilePicture);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['image-container']}>
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
          id="file-input"
          accept="image/jpg, image/jpeg, image/png"
          onChange={uploadImage}
          className={styles['file-input']}
        />
        <div className={styles['instructions']}>
          <p>{text}</p>
          <p>Images must be .png or .jpg format</p>
          <label htmlFor="file-input" className={styles['input-label']}>
            Upload Image
          </label>
        </div>
      </form>
    </div>
  );
};

export default UploadProfilePicture;
