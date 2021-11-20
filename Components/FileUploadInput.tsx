import React, { useState } from "react";
import AWS from "aws-sdk";
import { REGION, S3_BUCKET, S3_BUCKET_BASE_URL } from "../common/constant";
import { Button, Input, InputGroup } from "reactstrap";

interface IProps {
  onClickUpload: (uploadedBookImageUrl: string) => void;
}

export default function FileUploadInput(props: IProps) {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  AWS.config.update({
    accessKeyId: "AKIAW3ZZO4Z4DYG7CMVO",
    secretAccessKey: "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",
  });
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file: any) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    } as any;
    props.onClickUpload(`${S3_BUCKET_BASE_URL}${file.name}`);

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div style={{marginBottom:"8px"}}>
      <InputGroup>
        <Input type="file" onChange={handleFileInput} />
        {progress !== 100 && (
          <Button
            onClick={() => uploadFile(selectedFile)}
            disabled={!selectedFile}
          >
            {" "}
            이미지 업로드 하기
          </Button>
        )}
      </InputGroup>
      {selectedFile && (
        <div style={{ textAlign: "left" }}>파일업로드 진행도: {progress}%</div>
      )}
    </div>
  );
}
