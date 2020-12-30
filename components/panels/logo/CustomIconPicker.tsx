import { ChangeEvent, FC, useRef, useState } from "react";
import { Button, Header } from "semantic-ui-react";

interface FileUploadButtonProps {
    onUpload?: (file: File) => void;
    accept?: string;
}

const FileUploadButton: FC<FileUploadButtonProps> = (props) => {
    const { accept, onUpload } = props;

    const file = useRef<File>(null);

    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length) {
            file.current = e.target.files[0];
            if (typeof onUpload === "function") {
                onUpload(file.current);
            }
        }
    };

    const handleClickUpload = () => {
        fileRef.current.click();
    };

    return (
        <>
            <Button onClick={handleClickUpload} color="teal" basic size="small">
                Upload
            </Button>
            <input ref={fileRef} type="file" onChange={handleFileChange} accept={accept} />

            <style jsx>{`
                input {
                    display: none;
                }
            `}</style>
        </>
    );
};

interface ImageUploadButtonProps {
    onUpload?: (e) => void;
}

const ImageUploadButton: FC<ImageUploadButtonProps> = (props) => {
    const { onUpload } = props;
    const handleFileChange = (f: File) => {
        (async () => {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (typeof onUpload === "function") {
                    onUpload({ image: e.target.result });
                }
            };

            reader.readAsDataURL(f);
        })();
    };

    return <FileUploadButton onUpload={handleFileChange} accept=".png,.jpg,.jpeg,.svg" />;
};

export interface CustomIconPickerProps {
    onChange?: (icondata: string) => void;
}

export const CustomIconPicker: FC<CustomIconPickerProps> = (props) => {
    const { onChange } = props;
    const [image, setImage] = useState<string>("");

    function handleUpload({ image }) {
        setImage(image);
        if (typeof onChange === "function") {
            onChange(image);
        }
    }

    return (
        <div>
            <ImageUploadButton onUpload={handleUpload} />
            <div>
                {image !== "" ? (
                    <>
                        <Header as="h4" style={{ marginTop: "1rem" }}>
                            Current Icon
                        </Header>
                        <div style={{ marginTop: "1rem" }}>
                            <img src={image} alt="Icon preview" />
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};
