/**
 *  useFileUpload
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { useEffect, useState } from "react";
import filesize from "filesize";

import config from "../constants/config";
import mimeTypes from "../constants/mimeTypes";
import * as storage from "../constants/storage";
import { FileType } from "../types/Upload";
import { firebase } from "../firebase";
import { userModel } from "../firebase/models";

interface UploadMetadata {
  contentType: FileType;
  name: string;
  size: number;
}

export default (file: any, user: any, setShowModal: any) => {
  const [filePending, setPending] = useState(false);
  const [fileProgress, setProgress] = useState(0);
  const [fileError, setFileError] = useState(null) as any;
  const [fileValid, setValid] = useState(false);

  useEffect(() => {
    if (file !== null) {
      handleFileUpload();
    }
  }, [file]);

  const validateFile = (file: any) => {
    if (file.size > config.upload.maxFileUploadSize) {
      setFileError(
        `File exceeds max size limit of ${filesize(
          config.upload.maxFileUploadSize
        )}`
      );
    } else if (!config.upload.validTypes.includes(file.type)) {
      setFileError("File is not a valid file type");
    } else {
      setValid(true);
    }
  };

  const getFileName = () => {
    const fileType: FileType = file.type;
    return `${user.data.id}.${mimeTypes[fileType]}`;
  };

  const getFilePath = () => {
    return `${storage.USER_IMAGES_PATH}/${getFileName()}`;
  };

  const updatePhotoURL = async (url: string) => {
    try {
      await userModel.doUpdateUserPhotoURL(url);
      setProgress(0);
      user.setUser(userModel.getUserProps(firebase.auth.currentUser));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = (metadata: UploadMetadata) => {
    const uploadTask = firebase.storage.child(getFilePath()).put(file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        // Get progress
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      error => {
        // Handle unsuccessful uploads
        setProgress(0);
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          updatePhotoURL(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleFileUpload = () => {
    setPending(true);
    console.log(file);
    validateFile(file);
    setTimeout(() => {
      setPending(false);
      if (fileValid === true) {
        console.log("file is valid");
        const metadata: UploadMetadata = {
          contentType: file.type,
          size: file.size,
          name: getFileName()
        };
        uploadFile(metadata);
      }
    }, 1000);
  };

  /* 
    Return data for component consumption
  */
  return [filePending, fileProgress, fileError, handleFileUpload];
};
